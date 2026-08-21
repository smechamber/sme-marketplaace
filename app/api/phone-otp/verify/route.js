//api/phone-otp/verify/route.js

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getServerPb } from "@/lib/pocketbase"

const g = globalThis
if (!g.otpStorage) g.otpStorage = new Map()
const otpStorage = g.otpStorage

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded?.split(",")[0] || "").trim() || "unknown"
}

// Add the same normalization function from your send endpoint
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

export async function POST(request) {
  try {
    const { phone, otp, userId } = await request.json()

    if (!phone || !otp || !userId) {
      return NextResponse.json({ error: "Phone number, OTP, and user ID are required" }, { status: 400 })
    }

    const clientIP = getClientIP(request)

    // Normalize the phone number to match what was stored
    const normalizedPhone = normalizePhoneNumber(phone)
    
    const storedOtpData = otpStorage.get(normalizedPhone) // Use normalized phone
    if (!storedOtpData) {
      console.log(`[phone-otp/verify] OTP not found for normalized phone: ${normalizedPhone}, original: ${phone}`)
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 400 })
    }

    const { otp: storedOtp, expiresAt, clientIP: storedIP, userId: storedUserId } = storedOtpData

    const now = Date.now()

    if (storedIP !== clientIP) {
      console.log("[phone-otp/verify] IP mismatch (continuing)")
    }

    if (now > expiresAt) {
      otpStorage.delete(normalizedPhone)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (userId !== storedUserId) {
      return NextResponse.json({ error: "User validation failed" }, { status: 400 })
    }

    if (otp !== storedOtp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    otpStorage.delete(normalizedPhone) // Delete using normalized phone

    try {
      const requestCookies = cookies()
      const pb = getServerPb(requestCookies)

      // Use the normalized phone number for PocketBase update
      await pb.collection("users").update(userId, {
        // phone: normalizedPhone,
        phone_verifed: true,
      })

      return NextResponse.json({
        success: true,
        message: "Phone number verified successfully",
      })
    } catch (pbError) {
      console.error("PocketBase update error:", pbError)
      return NextResponse.json({ error: "Failed to update user verification status" }, { status: 500 })
    }
  } catch (error) {
    console.error("[phone-otp/verify] Error:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}