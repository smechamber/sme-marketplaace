//api/phone-otp/send/route.js

import { NextResponse } from "next/server"

const g = globalThis
if (!g.otpStorage) g.otpStorage = new Map()
if (!g.rateLimitStorage) g.rateLimitStorage = new Map()
if (!g.ipRateLimitStorage) g.ipRateLimitStorage = new Map()

const otpStorage = g.otpStorage
const rateLimitStorage = g.rateLimitStorage
const ipRateLimitStorage = g.ipRateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 15
const IP_MAX_ATTEMPTS = 15 // per-IP cap regardless of phone

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded?.split(",")[0] || "").trim() || "unknown"
}

function normalizePhoneNumber(phone) {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "")
  
  // If it starts with 91 and has 12 digits total, it's an Indian number with country code
  if (digits.startsWith("91") && digits.length === 12) {
    return digits.substring(2) // Remove 91 prefix
  }
  
  // If it's already 10 digits and starts with 6-9, it's a valid Indian mobile
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return digits
  }
  
  // Otherwise return as-is and let validation handle it
  return digits
}

async function sendSMSOTP(phone, otp) {
  try {
    // Normalize the phone number
    const formattedPhone = normalizePhoneNumber(phone)

    // Validate that we have a proper 10-digit Indian mobile number
    if (!/^[6-9]\d{9}$/.test(formattedPhone)) {
      console.error(`[SMS] Invalid phone format. Input: ${phone}, Normalized: ${formattedPhone}`)
      throw new Error(`Invalid Indian mobile number format`)
    }

    const message = `${otp} is the OTP for the registration process - SMECHM`

  
    const apiKey = process.env.SMS_API_KEY
    const entityId = process.env.SMS_ENTITY_ID
    const smsUrl = process.env.SMS_GATEWAY_URL
    const senderId = process.env.SMS_SENDER_ID || "SMECHM"
    if (!apiKey || !entityId || !smsUrl) throw new Error("SMS gateway is not configured")

    const params = new URLSearchParams({
      apikey: apiKey,
      type: "TEXT",
      sender: senderId,
      entityId: entityId,
      mobile: formattedPhone,
      message: message,
    })

    const fullSmsUrl = `${smsUrl}?${params.toString()}`

    console.log(`[SMS] Sending OTP to: ${formattedPhone}`)

    const response = await fetch(fullSmsUrl, {
      method: "GET",
      headers: {
        "User-Agent": "NextJS-SMS-Client/1.0",
      },
    })

    if (!response.ok) {
      console.error(`[SMS] Gateway error: Status ${response.status}`)
      throw new Error(`SMS Gateway responded with status: ${response.status}`)
    }

    const responseText = await response.text()
    console.log("[SMS] Gateway Response:", responseText)

    if (responseText.includes("ERR_MOBILE")) {
      throw new Error(`SMS Gateway rejected mobile number: ${formattedPhone}`)
    }

    return { success: true, response: responseText }
  } catch (error) {
    console.error("[SMS] Error details:", error.message)
    throw error
  }
}

export async function POST(request) {
  try {
    const { phone, userId } = await request.json()

    if (!phone || !userId) {
      return NextResponse.json({ error: "Phone number and user ID are required" }, { status: 400 })
    }

    const clientIP = getClientIP(request)
    const now = Date.now()

    // IP rate limiting
    const ipData = ipRateLimitStorage.get(clientIP)
    if (ipData) {
      const { attempts, firstAttempt, bannedUntil } = ipData
      if (bannedUntil && now < bannedUntil) {
        const mins = Math.ceil((bannedUntil - now) / 60000)
        return NextResponse.json({ error: `IP temporarily banned. Try again in ${mins} minutes.` }, { status: 429 })
      }
      if (now - firstAttempt > RATE_LIMIT_WINDOW) {
        ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
      } else {
        const nextAttempts = attempts + 1
        if (nextAttempts >= IP_MAX_ATTEMPTS) {
          const bannedUntilNext = now + RATE_LIMIT_WINDOW
          ipRateLimitStorage.set(clientIP, { attempts: nextAttempts, firstAttempt, bannedUntil: bannedUntilNext })
          return NextResponse.json({ error: "Too many requests from this IP. Banned for 15 minutes." }, { status: 429 })
        }
        ipRateLimitStorage.set(clientIP, { attempts: nextAttempts, firstAttempt, bannedUntil: null })
      }
    } else {
      ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
    }

    // Phone-specific rate limiting
    const normalizedPhone = normalizePhoneNumber(phone)
    const rlKey = `${clientIP}-${normalizedPhone}`
    const rlData = rateLimitStorage.get(rlKey)
    if (rlData) {
      const { attempts, firstAttempt } = rlData
      if (now - firstAttempt < RATE_LIMIT_WINDOW) {
        if (attempts >= MAX_ATTEMPTS) {
          return NextResponse.json(
            { error: "Too many OTP requests for this phone. Please try again after 15 minutes." },
            { status: 429 },
          )
        }
        rateLimitStorage.set(rlKey, { attempts: attempts + 1, firstAttempt })
      } else {
        rateLimitStorage.set(rlKey, { attempts: 1, firstAttempt: now })
      }
    } else {
      rateLimitStorage.set(rlKey, { attempts: 1, firstAttempt: now })
    }

    const otp = generateOTP()
    console.log(`[OTP] Generated OTP ${otp} for phone: ${phone} (normalized: ${normalizedPhone})`)

    try {
      await sendSMSOTP(phone, otp)

      // Store OTP with the normalized phone number
      otpStorage.set(normalizedPhone, {
        otp,
        phone: normalizedPhone,
        userId,
        clientIP,
        createdAt: now,
        expiresAt: now + 3 * 60 * 1000, // 3 minutes
      })

      return NextResponse.json({
        message: "OTP sent successfully to phone",
        expiresIn: 180,
      })
    } catch (smsError) {
      console.error("[SMS Send Failed]:", smsError.message)
      
      // More specific error messages
      if (smsError.message?.includes("Invalid Indian mobile number")) {
        return NextResponse.json(
          { error: "Invalid phone number format. Please enter a valid 10-digit Indian mobile number." },
          { status: 400 }
        )
      }
      
      if (smsError.message?.includes("SMS Gateway")) {
        return NextResponse.json(
          { error: "SMS service temporarily unavailable. Please try again in a few moments." },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: "Failed to send verification code. Please check your phone number and try again." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[phone-otp/send] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
