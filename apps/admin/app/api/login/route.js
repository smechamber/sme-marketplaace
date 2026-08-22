import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@mysme/core/db";
import { ADMIN_COOKIE_NAME, createToken } from "@mysme/core/auth";
export async function POST(request) {
  const { email, password } = await request.json(),
    normalized = String(email).toLowerCase().trim(),
    user = await prisma.user.findUnique({ where: { email: normalized } }),
    allowed =
      user?.userRole === "admin" ||
      normalized === String(process.env.ADMIN_EMAIL || "").toLowerCase();
  if (
    !allowed ||
    !user?.passwordHash ||
    !(await bcrypt.compare(password, user.passwordHash))
  )
    return NextResponse.json(
      { error: "Invalid admin credentials" },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, await createToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 28800,
  });
  return response;
}
