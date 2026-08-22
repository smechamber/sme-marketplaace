import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { getCurrentUser, publicUser } from "@/lib/auth"

const delegates = { users: "user", companies: "company", products: "product", requirements: "requirement", inquiries: "inquiry", favorites: "favorite", membership_orders: "membershipOrder" }
const fields = () => ({ created: "createdAt", updated: "updatedAt" })

function serialize(collection, value) {
  if (!value) return value
  const out = { ...value, created: value.createdAt, updated: value.updatedAt }
  delete out.createdAt; delete out.updatedAt; delete out.passwordHash
  if (out.user) out.expand = { ...(out.expand || {}), user: publicUser(out.user) }
  if (out.buyer) out.expand = { ...(out.expand || {}), buyer: publicUser(out.buyer) }
  if (out.seller) out.expand = { ...(out.expand || {}), seller: publicUser(out.seller) }
  if (out.product) out.expand = { ...(out.expand || {}), product: serialize("products", out.product) }
  if (out.company) out.expand = { ...(out.expand || {}), company: serialize("companies", out.company) }
  return out
}

async function parseBody(request, collection) {
  const contentType = request.headers.get("content-type") || ""
  const raw = contentType.includes("multipart/form-data") ? Object.fromEntries((await request.formData()).entries()) : await request.json()
  const map = fields(collection)
  const data = {}
  for (const [key, value] of Object.entries(raw || {})) {
    if (key === "id" || ["passwordConfirm", "confirmPassword", "recaptchaToken"].includes(key)) continue
    const target = map[key] || key
    if (value && typeof value === "object" && "name" in value) data[target] = value.name || null
    else if (["images", "chat"].includes(target)) { try { data[target] = JSON.parse(value) } catch { data[target] = value ? [value] : [] } }
    else data[target] = value === "true" ? true : value === "false" ? false : value
  }
  if (collection === "users" && data.password) { data.passwordHash = await bcrypt.hash(data.password, 12); delete data.password }
  for (const key of ["user", "seller", "buyer", "product", "company", "requirement"]) if (data[key]) { data[`${key}Id`] = data[key]; delete data[key] }
  return data
}

function whereFromFilter(filter = "") {
  const where = {}
  for (const match of filter.matchAll(/([\w]+)\s*(=|!=|~)\s*"?([^"\s]+)"?/g)) {
    const [, key, op, value] = match
    const field = { user: "userId", seller: "sellerId", buyer: "buyerId", product: "productId", company: "companyId" }[key] || key
    where[field] = op === "~" ? { contains: value, mode: "insensitive" } : op === "!=" ? { not: value } : value
  }
  return where
}

function includeFor(collection) {
  return { users: {}, companies: { user: true }, products: { seller: true, company: true }, requirements: { user: true }, inquiries: { buyer: true, seller: true, product: true }, favorites: { product: { include: { seller: true, company: true } } }, membership_orders: { user: true } }[collection]
}

export async function GET(request, { params }) {
  const { collection } = await params
  const delegateName = delegates[collection]; if (!delegateName) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const delegate = prisma[delegateName]; const url = new URL(request.url)
  const page = Number(url.searchParams.get("page") || 1); const perPage = Number(url.searchParams.get("perPage") || 50)
  const where = whereFromFilter(url.searchParams.get("filter") || "")
  const requestedSort = url.searchParams.get("sort") || "-created"
  const orderBy = { created: "createdAt", updated: "updatedAt" }[requestedSort.replace("-", "")] || requestedSort.replace("-", "")
  const items = await delegate.findMany({ where, skip: (page - 1) * perPage, take: perPage, orderBy: { [orderBy]: url.searchParams.get("sort")?.startsWith("-") ? "desc" : "asc" }, include: includeFor(collection) })
  const totalItems = await delegate.count({ where })
  return NextResponse.json({ page, perPage, totalItems, totalPages: Math.ceil(totalItems / perPage), items: items.map((item) => serialize(collection, item)) })
}

export async function POST(request, { params }) {
  const { collection } = await params; const delegateName = delegates[collection]; if (!delegateName) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const user = await getCurrentUser(); let data = await parseBody(request, collection)
  if (collection !== "users" && user) { if (["products", "requirements", "favorites"].includes(collection)) data.userId = data.userId || user.id; if (collection === "products") data.sellerId = user.id; if (collection === "requirements") data.userId = user.id; if (collection === "favorites") data.userId = user.id }
  if (collection === "users") data.email = String(data.email || "").toLowerCase().trim()
  const item = await prisma[delegateName].create({ data, include: includeFor(collection) })
  return NextResponse.json(serialize(collection, item), { status: 201 })
}
