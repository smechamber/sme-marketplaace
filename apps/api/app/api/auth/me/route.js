import { NextResponse } from "next/server"
import { getCurrentUser, publicUser } from "@/lib/auth"
export async function GET() { return NextResponse.json({ user: publicUser(await getCurrentUser()) }) }
