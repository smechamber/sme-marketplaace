import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const COOKIE_NAME = "sme_auth"
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me")

export async function createAuthToken(userId) {
  return new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret())
}

export async function setAuthCookie(userId) {
  const store = await cookies()
  store.set(COOKIE_NAME, await createAuthToken(userId), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 })
}

export async function clearAuthCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    return prisma.user.findUnique({ where: { id: String(payload.userId) } })
  } catch {
    return null
  }
}

export function publicUser(user) {
  if (!user) return null
  const { passwordHash, ...safe } = user
  return { ...safe, created: safe.createdAt, updated: safe.updatedAt }
}

export { COOKIE_NAME }
