// app/api/contact/route.js
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// In-memory storage for rate limiting (use Redis in production)
const requestCounts = new Map()
const blockedIPs = new Set()

// Configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const BLOCK_DURATION = 60 * 60 * 1000 // 1 hour

// Get client IP address
async function getClientIP(request) {
  const headersList = await headers()
  return headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         headersList.get('x-real-ip') ||
         headersList.get('cf-connecting-ip') ||
         'unknown'
}

// Rate limiting middleware
function rateLimit(ip) {
  const now = Date.now()
  
  // Check if IP is blocked
  if (blockedIPs.has(ip)) {
    return { allowed: false, reason: 'IP_BLOCKED' }
  }
  
  // Get or create request count for this IP
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 0, windowStart: now })
  }
  
  const requestData = requestCounts.get(ip)
  
  // Reset window if expired
  if (now - requestData.windowStart > RATE_LIMIT_WINDOW) {
    requestData.count = 0
    requestData.windowStart = now
  }
  
  // Check if limit exceeded
  if (requestData.count >= MAX_REQUESTS_PER_WINDOW) {
    // Block IP
    blockedIPs.add(ip)
    setTimeout(() => {
      blockedIPs.delete(ip)
    }, BLOCK_DURATION)
    
    return { allowed: false, reason: 'RATE_LIMIT_EXCEEDED' }
  }
  
  // Increment count
  requestData.count++
  
  return { allowed: true }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW) {
      requestCounts.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation
function validatePhone(phone) {
  if (!phone) return true // Phone is optional
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// Input sanitization
function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

export async function POST(request) {

  try {
    const clientIP = await getClientIP(request)
    console.log(`Contact form submission from IP: ${clientIP}`)

    // Apply rate limiting
    const rateLimitResult = rateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      const message = rateLimitResult.reason === 'IP_BLOCKED' 
        ? 'Your IP has been temporarily blocked due to excessive requests'
        : 'Too many requests. Please try again later.'
      
      return NextResponse.json({ 
        message,
        retryAfter: rateLimitResult.reason === 'IP_BLOCKED' ? BLOCK_DURATION : RATE_LIMIT_WINDOW
      }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'Please fill in all required fields' }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    }

    // Validate email
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 })
    }

    // Validate phone if provided
    if (sanitizedData.phone && !validatePhone(sanitizedData.phone)) {
      return NextResponse.json({ message: 'Please enter a valid phone number' }, { status: 400 })
    }

    // Additional validation
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return NextResponse.json({ message: 'Name must be between 2 and 100 characters' }, { status: 400 })
    }

    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      return NextResponse.json({ message: 'Subject must be between 5 and 200 characters' }, { status: 400 })
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return NextResponse.json({ message: 'Message must be between 10 and 2000 characters' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 587,
      secure: false, // TLS upgrade via STARTTLS
      auth: {
        user: process.env.SMTP_USER, // your full email (user@domain.com)
        pass: process.env.SMTP_PASS, // app password or account password
      },
      tls: {
        ciphers: "SSLv3", // helps avoid "unrecognized authentication type"
        rejectUnauthorized: false, // only if you get certificate errors
      },
    });

    // Email content for admin - use SMTP_USER as sender
    const adminMailOptions = {
      from: process.env.SMTP_USER, // Use the authenticated SMTP user
      to: process.env.SMTP_USER, // Send to same address or different admin email
      subject: `New Contact Form Submission: ${sanitizedData.subject}`,
      replyTo: sanitizedData.email, // Set reply-to as the form submitter
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #29688A; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">SME Market Place</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #29688A; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 120px; vertical-align: top;">Name:</td>
                <td style="padding: 8px;">${sanitizedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Email:</td>
                <td style="padding: 8px;"><a href="mailto:${sanitizedData.email}" style="color: #29688A;">${sanitizedData.email}</a></td>
              </tr>
              ${sanitizedData.phone ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Phone:</td>
                <td style="padding: 8px;"><a href="tel:${sanitizedData.phone}" style="color: #29688A;">${sanitizedData.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Subject:</td>
                <td style="padding: 8px;">${sanitizedData.subject}</td>
              </tr>
              
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Submitted:</td>
                <td style="padding: 8px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #29688A; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px;">Message</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.5;">${sanitizedData.message}</div>
          </div>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; border-left: 4px solid #29688A;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              • Reply to: <a href="mailto:${sanitizedData.email}" style="color: #29688A;">${sanitizedData.email}</a><br>
              ${sanitizedData.phone ? `• Call: <a href="tel:${sanitizedData.phone}" style="color: #29688A;">${sanitizedData.phone}</a><br>` : ''}
              • This message was sent via the SME Market Place contact form
            </p>
          </div>
        </div>
      `
    }

    // Confirmation email for user - use SMTP_USER as sender
    const userMailOptions = {
      from: process.env.SMTP_USER, // Use the authenticated SMTP user
      to: sanitizedData.email,
      subject: 'Thank you for contacting SME Market Place',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #29688A; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">SME Market Place</p>
          </div>
          
          <p>Dear ${sanitizedData.name},</p>
          
          <p>Thank you for reaching out to SME Market Place. We have successfully received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #29688A;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
            <p><strong>Message:</strong> ${sanitizedData.message}</p>
            <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>In the meantime, you can reach us directly at:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;">📧 <a href="mailto:secretariat@smechamber.com" style="color: #29688A;">secretariat@smechamber.com</a></li>
            <li style="margin-bottom: 10px;">📧 <a href="mailto:director@smechamber.com" style="color: #29688A;">director@smechamber.com</a></li>
            <li style="margin-bottom: 10px;">📞 <a href="tel:+912269511111" style="color: #29688A;">+ 91 – 22 – 6951 1111</a></li>
          </ul>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; border-left: 4px solid #29688A; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>SME Chamber of India</strong><br>
              Samruddhi Venture Park, Office No. 1, 3rd Floor,<br>
              Krantiveer Lakhuji Salve Marg, adjoining Hotel Tunga Paradise,<br>
              next to Akruti Centre, Andheri East, Mumbai, Maharashtra 400093
            </p>
          </div>
          
          <p style="margin-top: 20px;">Best regards,<br><strong>SME Market Place Team</strong></p>
        </div>
      `
    }

    // Send emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ])

    console.log(`Contact form email sent successfully for ${sanitizedData.email}`)

    return NextResponse.json({ 
      message: 'Message sent successfully! We will get back to you soon.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Don't expose internal errors to client
    return NextResponse.json({ 
      message: 'Sorry, there was an error sending your message. Please try again later.' 
    }, { status: 500 })
  }
}
