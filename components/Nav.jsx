"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FilePlus2, LayoutDashboard, LogOut, MapPin, Menu, Search, Store, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import AuthModal from "@/components/AuthModal"

const links = [{ label: "Products", href: "/products" }, { label: "Companies", href: "/companies" }, { label: "Buy Leads", href: "/browse-requirements" }, { label: "Categories", href: "/category" }, { label: "About", href: "/about" }]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const { currentUser, logout } = useAuth()
  const submit = (e) => { e.preventDefault(); if (query.trim()) window.location.href = `/products?search=${encodeURIComponent(query.trim())}` }
  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); setOpen(false) }

  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex h-[88px] max-w-[1440px] items-center gap-7 px-5 sm:px-8 lg:px-10">
      <Link href="/" className="shrink-0 py-2"><Image src="/logo.png" width={230} height={72} className="h-14 w-auto object-contain xl:h-[62px]" alt="MySME Marketplace" priority /></Link>
      <form onSubmit={submit} className="ml-auto hidden h-14 max-w-2xl flex-1 items-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition focus-within:border-[#087f8c] focus-within:shadow-md md:flex"><div className="flex h-full items-center border-r border-slate-200 px-4 text-sm font-medium text-slate-600"><MapPin className="mr-2 h-4 w-4 text-[#087f8c]" /> India</div><Search className="ml-4 h-5 w-5 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, services or suppliers" className="h-full w-full bg-transparent px-3 text-[15px] outline-none" /><button className="mr-1.5 h-11 rounded-xl bg-[#087f8c] px-5 font-semibold text-white transition hover:bg-[#066b75]">Search</button></form>
      <div className="hidden items-center gap-3 sm:flex">{currentUser ? <><Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LayoutDashboard className="h-5 w-5 text-[#087f8c]" /> Dashboard</Link><button onClick={logout} className="rounded-xl border border-slate-200 p-3 text-slate-600"><LogOut className="h-5 w-5" /></button></> : <><button onClick={() => openAuth("login")} className="px-3 py-3 text-sm font-semibold text-slate-700">Sign in</button><button onClick={() => openAuth("register")} className="inline-flex items-center gap-2 rounded-xl bg-[#087f8c] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-cyan-900/10 transition hover:-translate-y-0.5 hover:bg-[#066b75]"><Store className="h-4 w-4" /> Join as supplier</button></>}</div>
      <button onClick={() => setOpen(!open)} className="ml-auto rounded-lg p-2 text-slate-700 lg:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    <div className="hidden border-t border-slate-100 bg-[#071d2b] lg:block"><div className="mx-auto flex h-[50px] max-w-[1440px] items-center justify-between px-10"><nav className="flex h-full items-center">{links.map(link => <Link key={link.href} href={link.href} className="flex h-full items-center border-b-2 border-transparent px-5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:bg-white/[.06] hover:text-white">{link.label}</Link>)}</nav><Link href="/dashboard/requirements/add" className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300"><FilePlus2 className="h-4 w-4" /> Post a requirement</Link></div></div>
    {open && <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden"><form onSubmit={submit} className="mb-4 flex items-center rounded-xl border bg-slate-50 px-3"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products & companies" className="h-11 w-full bg-transparent px-2 text-sm outline-none" /></form><nav className="grid gap-1">{links.map(link => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">{link.label}</Link>)}<Link href="/dashboard/requirements/add" className="mt-2 rounded-xl bg-amber-400 px-4 py-3 text-center font-semibold text-slate-950">Post a requirement</Link>{!currentUser && <button onClick={() => openAuth("login")} className="py-3 text-center font-semibold text-[#087f8c]">Sign in</button>}</nav></div>}
    <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultMode={authMode} />
  </header>
}
