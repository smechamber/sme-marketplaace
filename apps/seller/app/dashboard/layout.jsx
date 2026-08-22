import DashboardShell from "@/components/dashboard-shell"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser()
  if (!user || user.userRole !== "seller") redirect("/login")
  return <DashboardShell>{children}</DashboardShell>
}
