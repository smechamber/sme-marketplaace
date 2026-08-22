import DashboardShell from "@/components/dashboard-shell"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser()
  if (user?.userRole === "seller") redirect(process.env.NEXT_PUBLIC_SELLER_URL || "http://localhost:3001")
  return <DashboardShell>{children}</DashboardShell>
}
