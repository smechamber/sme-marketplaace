// app/api/verify-recaptcha/route.js

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { token } = body

    // Validate token presence
    if (!token) {
      console.error('No reCAPTCHA token provided')
      return NextResponse.json(
        { success: false, error: 'No reCAPTCHA token provided' },
        { status: 400 }
      )
    }

    // Validate secret key
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verify the reCAPTCHA token with Google
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    })

    const verifyResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!verifyResponse.ok) {
      console.error('Google reCAPTCHA API error:', verifyResponse.status)
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA service unavailable' },
        { status: 503 }
      )
    }

    const verifyData = await verifyResponse.json()
    
    // Log for debugging (remove in production or use proper logging)
    console.log('reCAPTCHA verification response:', {
      success: verifyData.success,
      hostname: verifyData.hostname,
      errorCodes: verifyData['error-codes'],
    })

    if (!verifyData.success) {
      console.error('reCAPTCHA verification failed:', verifyData['error-codes'])
      
      // Provide more specific error messages
      let errorMessage = 'reCAPTCHA verification failed'
      const errorCodes = verifyData['error-codes'] || []
      
      if (errorCodes.includes('timeout-or-duplicate')) {
        errorMessage = 'reCAPTCHA token expired or already used'
      } else if (errorCodes.includes('invalid-input-response')) {
        errorMessage = 'Invalid reCAPTCHA token'
      } else if (errorCodes.includes('invalid-input-secret')) {
        errorMessage = 'Server configuration error'
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage,
          errorCodes: verifyData['error-codes'] 
        },
        { status: 400 }
      )
    }

    // Optional: Check hostname in production to prevent token reuse from other domains
    if (process.env.NODE_ENV === 'production' && verifyData.hostname) {
      const allowedHostnames = [
        'smemarketplace.in',
        'www.smemarketplace.in',
        // Add any other allowed hostnames
      ]
      
      if (!allowedHostnames.includes(verifyData.hostname)) {
        console.error(`Hostname mismatch: got ${verifyData.hostname}`)
        return NextResponse.json(
          { success: false, error: 'Invalid request origin' },
          { status: 400 }
        )
      }
    }

    // Optional: Check challenge timestamp (tokens are valid for 2 minutes)
    if (verifyData.challenge_ts) {
      const challengeTime = new Date(verifyData.challenge_ts).getTime()
      const now = Date.now()
      const twoMinutes = 2 * 60 * 1000
      
      if (now - challengeTime > twoMinutes) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA token expired' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}