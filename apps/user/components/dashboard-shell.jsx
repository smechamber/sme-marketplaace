"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import AuthGuard from "@/components/auth-guard"
import PhoneVerificationDialog from "@/components/phone-verification-dialog"
import { BarChart3, Building2, ChevronDown, FileText, Heart, Home, LogOut, Menu, MessageSquare, Package, Search, Settings, Store, User, X } from "lucide-react"

export default function DashboardShell({ children }) {
  const { currentUser, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [phoneRequired, setPhoneRequired] = useState(false)
  const seller = currentUser?.userRole === "seller"
  useEffect(() => { setPhoneRequired(Boolean(currentUser && !currentUser.phone_verifed)) }, [currentUser])
  const links = [
    ["Overview", "/dashboard", Home],
    ...(seller ? [["Company profile", "/dashboard/company", Building2], ["Products", "/dashboard/products", Package], ["Lead manager", "/dashboard/inquiries", MessageSquare]] : [["My requirements", "/dashboard/requirements", FileText], ["Supplier responses", "/dashboard/inquiries", MessageSquare], ["Saved products", "/dashboard/favorites", Heart]]),
    ["My profile", "/dashboard/profile", User],
  ]

  const signOut = async () => { await logout(); router.push("/") }
  return <AuthGuard redirectIfNotAuthenticated="/login">
    <div className="min-h-dvh bg-[#f4f7f9] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur lg:left-72">
        <div className="flex h-full items-center gap-4 px-4 lg:px-6">
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
          <Link href="/" className="flex items-center gap-2 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#087f8c] text-white"><Store className="h-5 w-5" /></span><span className="hidden sm:block">MySME <span className="text-[#087f8c]">Marketplace</span></span></Link>
          <div className="mx-auto hidden max-w-xl flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex"><Search className="h-4 w-4 text-slate-400"/><input className="h-10 flex-1 bg-transparent px-3 text-sm outline-none" placeholder={seller ? "Search leads, products or buyers" : "Search products or suppliers"}/></div>
          <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-bold">{currentUser?.firstName || "Member"} {currentUser?.lastName || ""}</p><p className="text-xs capitalize text-slate-500">{seller ? "Seller account" : "Buyer account"}</p></div><div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-100 font-bold text-[#087f8c]">{(currentUser?.firstName || currentUser?.email || "M")[0].toUpperCase()}</div><ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block"/></div>
        </div>
      </header>
      {mobileOpen && <button aria-label="Close menu" className="fixed inset-0 z-20 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)}/>} 
      <aside className={`fixed bottom-0 left-0 top-0 z-50 flex w-[min(18rem,86vw)] flex-col border-r border-slate-200 bg-white p-4 shadow-2xl transition-transform duration-300 lg:top-0 lg:w-72 lg:translate-x-0 lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-5 rounded-2xl bg-gradient-to-br from-[#062333] to-[#087f8c] p-4 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">{seller ? "Seller workspace" : "Buyer workspace"}</p><p className="mt-1 font-bold">{seller ? "Grow your business" : "Source with confidence"}</p><div className="mt-3 h-1.5 rounded-full bg-white/20"><div className="h-full w-2/3 rounded-full bg-amber-300"/></div><p className="mt-2 text-xs text-cyan-100">Complete your profile to unlock all tools</p></div>
        <nav className="space-y-1">{links.map(([label, href, Icon]) => { const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-cyan-50 text-[#087f8c]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}><Icon className="h-5 w-5"/>{label}</Link>})}</nav>
        <div className="mt-auto space-y-1 border-t border-slate-100 pt-3"><Link href="/dashboard/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Settings className="h-5 w-5"/>Settings</Link><button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut className="h-5 w-5"/>Sign out</button></div>
      </aside>
      <main className="min-h-dvh pt-16 lg:pl-72"><div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</div></main>
      <PhoneVerificationDialog required open={phoneRequired} onOpenChange={setPhoneRequired} onVerificationComplete={() => setPhoneRequired(false)} />
    </div>
  </AuthGuard>
}
