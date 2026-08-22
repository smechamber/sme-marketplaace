import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { publicUser } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const email = String(body.email || "").trim().toLowerCase()
    const password = String(body.password || "")

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 })
    }
    if (password !== body.passwordConfirm) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash(password, 12),
        userRole: body.userRole === "seller" ? "seller" : "buyer",
        firstName: String(body.firstName || "").trim() || null,
        lastName: String(body.lastName || "").trim() || null,
        prefix: String(body.prefix || "").trim() || null,
        phone: String(body.phone || "").trim() || null,
        organizationName: String(body.organizationName || "").trim() || null,
        designation: String(body.designation || "").trim() || null,
        country: String(body.country || "").trim() || null,
        sectorsOfInterest: String(body.sectorsOfInterest || "").trim() || null,
        functionalAreas: String(body.functionalAreas || "").trim() || null,
        verified: false,
        profileStatus: body.profileStatus || "pending",
      },
    })

    return NextResponse.json({ user: publicUser(user) }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 })
    }
    console.error("Registration API failed:", error)
    return NextResponse.json({ error: "Unable to create your account right now. Please try again." }, { status: 500 })
  }
}
