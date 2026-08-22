import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const email = String(process.env.ADMIN_EMAIL || "").toLowerCase().trim()
if (!email) throw new Error("ADMIN_EMAIL is missing in .env")
const user = await prisma.user.findUnique({ where: { email } })
if (!user) throw new Error(`Register ${email} in the user portal first, then run this command again.`)
await prisma.user.update({ where: { id: user.id }, data: { userRole: "admin", profileStatus: "approved", verified: true } })
console.log(`Admin access enabled for ${email}`)
await prisma.$disconnect()
