import { NextResponse } from "next/server"
import crypto from "node:crypto"
import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

export async function POST(request) {
  let otpRecord
  try {
    const { email: rawEmail } = await request.json()
    const email = String(rawEmail || "").trim().toLowerCase()
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email }, select: { firstName: true, verified: true } })
    if (!user) return NextResponse.json({ error: "No account found with this email." }, { status: 404 })
    if (user.verified) return NextResponse.json({ error: "This email is already verified." }, { status: 400 })

    const code = String(crypto.randomInt(100000, 1000000))
    otpRecord = await prisma.otpCode.create({ data: { email, codeHash: crypto.createHash("sha256").update(code).digest("hex"), expiresAt: new Date(Date.now() + 10 * 60 * 1000) } })
    const port = Number(process.env.SMTP_PORT || 587)
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || "smtp.office365.com", port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })

    await transporter.sendMail({
      from: `MySME Marketplace <${process.env.SMTP_USER}>`, to: email,
      subject: `${code} is your MySME verification code`,
      text: `Your MySME Marketplace verification code is ${code}. It expires in 10 minutes. Do not share this code with anyone.`,
      html: `<div style="background:#f4f7f9;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:520px;margin:auto;background:#fff;border-radius:20px;padding:36px;box-shadow:0 12px 35px rgba(15,23,42,.08)"><div style="font-size:13px;font-weight:700;letter-spacing:.14em;color:#087f8c;text-transform:uppercase">MySME Marketplace</div><h1 style="font-size:26px;margin:16px 0 8px">Verify your email</h1><p style="color:#64748b;line-height:1.6">Hi ${user.firstName || "there"}, use this code to finish creating your account.</p><div style="margin:28px 0;padding:20px;text-align:center;background:#ecfeff;border:1px solid #a5f3fc;border-radius:14px;font-size:34px;font-weight:800;letter-spacing:10px;color:#087f8c">${code}</div><p style="font-size:13px;color:#94a3b8;line-height:1.6">This code expires in 10 minutes. If you did not create this account, you can safely ignore this email.</p></div></div>`,
    })
    return NextResponse.json({ otpId: otpRecord.id })
  } catch (error) {
    if (otpRecord) await prisma.otpCode.delete({ where: { id: otpRecord.id } }).catch(() => {})
    console.error("OTP email failed:", error)
    return NextResponse.json({ error: "We could not send the OTP email. Please check the mail settings and try again." }, { status: 500 })
  }
}
