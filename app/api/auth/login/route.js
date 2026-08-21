import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { publicUser, setAuthCookie } from "@/lib/auth"

export async function POST(request) {
  const { email, password } = await request.json()
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
  if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  await setAuthCookie(user.id)
  return NextResponse.json({ user: publicUser(user) })
}
