import { SignJWT, jwtVerify } from "jose"
export const COOKIE_NAME = "sme_auth"
export const ADMIN_COOKIE_NAME = "sme_admin_auth"
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me")
export const createToken = (userId) => new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret())
export async function readToken(token) { try { return (await jwtVerify(token, secret())).payload } catch { return null } }
