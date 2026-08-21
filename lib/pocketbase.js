// Compatibility surface for old imports. The implementation is now Prisma/API.
export { getClientApi as getClientPb } from "@/lib/api-client"

import { prisma } from "@/lib/prisma"
const map = { users: "user", companies: "company", products: "product", requirements: "requirement", inquiries: "inquiry", favorites: "favorite", membership_orders: "membershipOrder" }
const normalize = (name, data) => { const next = { ...data }; for (const key of ["user", "seller", "buyer", "product", "company", "requirement"]) if (next[key]) { next[`${key}Id`] = next[key]; delete next[key] } if (next.completedAt) next.completedAt = new Date(next.completedAt); if (next.membershipExpiry) next.membershipExpiry = new Date(next.membershipExpiry); return next }
const serverCollection = (name) => ({
  async create(data) { return prisma[map[name]].create({ data: normalize(name, data) }) },
  async update(id, data) { return prisma[map[name]].update({ where: { id }, data: normalize(name, data) }) },
  async getOne(id) { return prisma[map[name]].findUnique({ where: { id } }) },
})
export function getServerPb() {
  return { authStore: { isValid: false, token: null, model: null }, collection: serverCollection, files: { getUrl: (_record, file) => file } }
}
