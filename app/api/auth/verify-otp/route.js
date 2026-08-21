import { NextResponse } from "next/server"
import crypto from "node:crypto"
import { prisma } from "@/lib/prisma"
import { publicUser, setAuthCookie } from "@/lib/auth"
export async function POST(request) { const { otpId, otp } = await request.json(); const row = await prisma.otpCode.findUnique({ where: { id: otpId } }); if (!row || row.used || row.expiresAt < new Date() || row.codeHash !== crypto.createHash("sha256").update(String(otp)).digest("hex")) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 }); const user = await prisma.user.update({ where: { email: row.email }, data: { verified: true } }).catch(() => null); if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 }); await prisma.otpCode.update({ where: { id: otpId }, data: { used: true } }); await setAuthCookie(user.id); return NextResponse.json({ user: publicUser(user) }) }
