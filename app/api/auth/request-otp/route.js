import { NextResponse } from "next/server"
import crypto from "node:crypto"
import { prisma } from "@/lib/prisma"
export async function POST(request) { const { email } = await request.json(); const code = String(crypto.randomInt(100000, 999999)); const row = await prisma.otpCode.create({ data: { email: email.toLowerCase().trim(), codeHash: crypto.createHash("sha256").update(code).digest("hex"), expiresAt: new Date(Date.now() + 10 * 60 * 1000) } }); console.log(`[auth] OTP generated for ${email}: ${process.env.NODE_ENV === "production" ? "[redacted]" : code}`); return NextResponse.json({ otpId: row.id }) }
