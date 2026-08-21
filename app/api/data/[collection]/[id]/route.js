import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { parseBody } from "@/lib/data-utils"

const delegates = { users: "user", companies: "company", products: "product", requirements: "requirement", inquiries: "inquiry", favorites: "favorite", membership_orders: "membershipOrder" }
const includeFor = { users: {}, companies: { user: true }, products: { seller: true, company: true }, requirements: { user: true }, inquiries: { buyer: true, seller: true, product: true }, favorites: { product: { include: { seller: true, company: true } } }, membership_orders: { user: true } }
const output = (item) => item ? ({ ...item, created: item.createdAt, updated: item.updatedAt }) : item

export async function GET(_request, { params }) { const { collection, id } = await params; const item = await prisma[delegates[collection]].findUnique({ where: { id }, include: includeFor[collection] }); return item ? NextResponse.json(output(item)) : NextResponse.json({ error: "Record not found" }, { status: 404 }) }
export async function PATCH(request, { params }) { const { collection, id } = await params; const item = await prisma[delegates[collection]].update({ where: { id }, data: await parseBody(request, collection), include: includeFor[collection] }); return NextResponse.json(output(item)) }
export async function DELETE(_request, { params }) { const { collection, id } = await params; await prisma[delegates[collection]].delete({ where: { id } }); return NextResponse.json({ ok: true }) }
