"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { ArrowRight, BadgeCheck, BarChart3, Building2, CheckCircle2, Clock3, FileText, Heart, IndianRupee, MessageSquare, Package, Plus, Search, Sparkles, TrendingUp, UserRoundCheck } from "lucide-react"

const statusClass = { approved: "bg-emerald-50 text-emerald-700", pending: "bg-amber-50 text-amber-700", rejected: "bg-red-50 text-red-700", open: "bg-blue-50 text-blue-700", replied: "bg-cyan-50 text-cyan-700" }
const date = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Recently"

export default function DashboardPage() {
  const { currentUser, pb } = useAuth()
  const [data, setData] = useState({ company: null, products: [], requirements: [], sent: [], received: [], favorites: [] })
  const [loading, setLoading] = useState(true)
  const seller = currentUser?.userRole === "seller"

  const load = useCallback(async () => {
    if (!currentUser?.id) return
    setLoading(true)
    const safe = (promise, fallback) => promise.catch(() => fallback)
    const [company, products, requirements, sent, received, favorites] = await Promise.all([
      seller ? safe(pb.collection("companies").getFirstListItem(`user="${currentUser.id}"`), null) : null,
      seller ? safe(pb.collection("products").getFullList({ filter: `seller="${currentUser.id}"`, sort: "-created" }), []) : [],
      safe(pb.collection("requirements").getFullList({ filter: `user="${currentUser.id}"`, sort: "-created" }), []),
      safe(pb.collection("inquiries").getFullList({ filter: `buyer="${currentUser.id}"`, sort: "-created", expand: "seller,product,requirement" }), []),
      seller ? safe(pb.collection("inquiries").getFullList({ filter: `seller="${currentUser.id}"`, sort: "-created", expand: "buyer,product,requirement" }), []) : [],
      !seller ? safe(pb.collection("favorites").getFullList({ filter: `user="${currentUser.id}"`, sort: "-created", expand: "product" }), []) : [],
    ])
    setData({ company, products, requirements, sent, received, favorites }); setLoading(false)
  }, [currentUser?.id, pb, seller])
  useEffect(() => { load() }, [load])

  const profileScore = useMemo(() => {
    const checks = seller ? [currentUser?.verified, currentUser?.phone_verifed, currentUser?.firstName, data.company, data.company?.description, data.products.length] : [currentUser?.verified, currentUser?.phone_verifed, currentUser?.firstName, currentUser?.country, data.requirements.length]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [currentUser, data, seller])
  const approved = data.products.filter(x => x.approvalStatus === "approved").length
  const cards = seller ? [["Products", data.products.length, Package, "text-cyan-700 bg-cyan-50"], ["Active listings", approved, CheckCircle2, "text-emerald-700 bg-emerald-50"], ["New leads", data.received.length, MessageSquare, "text-violet-700 bg-violet-50"], ["Profile strength", `${profileScore}%`, TrendingUp, "text-amber-700 bg-amber-50"]] : [["Requirements", data.requirements.length, FileText, "text-cyan-700 bg-cyan-50"], ["Supplier responses", data.sent.length, MessageSquare, "text-violet-700 bg-violet-50"], ["Saved products", data.favorites.length, Heart, "text-rose-700 bg-rose-50"], ["Profile strength", `${profileScore}%`, UserRoundCheck, "text-amber-700 bg-amber-50"]]

  if (loading) return <div className="grid min-h-[60vh] place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-100 border-t-[#087f8c]"/></div>
  return <div className="space-y-6">
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#087f8c]"><Sparkles className="h-4 w-4"/>{seller ? "SELLER COMMAND CENTRE" : "BUYER WORKSPACE"}</div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Good {new Date().getHours() < 12 ? "morning" : "evening"}, {currentUser?.firstName || "there"}</h1><p className="mt-2 text-slate-500">{seller ? "Manage your catalogue, respond to buyers and grow your business." : "Track requirements, compare suppliers and manage your sourcing."}</p></div><Link href={seller ? "/dashboard/products/add" : "/dashboard/requirements/add"} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#087f8c] px-5 font-bold text-white shadow-lg shadow-cyan-900/10 hover:bg-[#066b75]"><Plus className="h-5 w-5"/>{seller ? "Add product" : "Post requirement"}</Link></section>

    {seller && !data.company && <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#062333] to-[#087f8c] p-6 text-white shadow-xl shadow-cyan-950/10"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-900">ACCOUNT CREATED</span><h2 className="mt-4 text-2xl font-black">Now build your business profile</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">Add company details, location and catalogue information. Buyers trust complete profiles and complete sellers receive more relevant enquiries.</p></div><Link href="/dashboard/company" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#087f8c]">Start business setup <ArrowRight className="h-4 w-4"/></Link></div></section>}

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div><span className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}><Icon className="h-6 w-6"/></span></div></div>)}</section>

    <section className="grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="text-lg font-black">{seller ? "Latest buyer enquiries" : "Recent sourcing activity"}</h2><p className="text-sm text-slate-500">Live activity from your account</p></div><Link href="/dashboard/inquiries" className="text-sm font-bold text-[#087f8c]">View all</Link></div><div className="divide-y divide-slate-100">{(seller ? data.received : [...data.requirements, ...data.sent]).slice(0, 5).map((item) => { const target = item.expand?.product || item.expand?.requirement; return <Link href={item.message ? `/dashboard/inquiries/${item.id}` : "/dashboard/requirements"} key={item.id} className="flex items-center gap-4 p-5 transition hover:bg-slate-50"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-50 text-[#087f8c]">{item.message ? <MessageSquare className="h-5 w-5"/> : <FileText className="h-5 w-5"/>}</span><div className="min-w-0 flex-1"><p className="truncate font-bold">{target?.title || item.quoteFor || item.requirementDetails || "Business enquiry"}</p><p className="mt-1 truncate text-sm text-slate-500">{item.message || item.category || "Waiting for supplier responses"}</p></div><div className="text-right"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass[item.status || item.approvalStatus] || "bg-slate-100 text-slate-600"}`}>{item.status || item.approvalStatus || "open"}</span><p className="mt-2 text-xs text-slate-400">{date(item.created)}</p></div></Link>})}{(seller ? data.received : [...data.requirements, ...data.sent]).length === 0 && <div className="p-10 text-center"><MessageSquare className="mx-auto h-10 w-10 text-slate-300"/><p className="mt-3 font-bold">No activity yet</p><p className="mt-1 text-sm text-slate-500">Your latest business activity will appear here.</p></div>}</div></div>
      <div className="space-y-6"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">Profile readiness</h2><span className="text-lg font-black text-[#087f8c]">{profileScore}%</span></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"><div style={{ width: `${profileScore}%` }} className="h-full rounded-full bg-gradient-to-r from-[#087f8c] to-cyan-400"/></div><div className="mt-5 space-y-3">{[["Email verified", currentUser?.verified], ["Mobile verified", currentUser?.phone_verifed], [seller ? "Company profile" : "Personal profile", seller ? data.company : currentUser?.firstName], [seller ? "First product listed" : "First requirement posted", seller ? data.products.length : data.requirements.length]].map(([label, done]) => <div key={label} className="flex items-center gap-3 text-sm"><BadgeCheck className={`h-5 w-5 ${done ? "text-emerald-500" : "text-slate-300"}`}/><span className={done ? "font-semibold" : "text-slate-500"}>{label}</span></div>)}</div><Link href={seller && !data.company ? "/dashboard/company" : "/dashboard/profile"} className="mt-5 flex h-11 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-[#087f8c] hover:bg-cyan-50">Complete profile</Link></div>
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100"><div className="flex gap-3"><IndianRupee className="h-6 w-6 text-amber-600"/><div><h3 className="font-black">{seller ? "Grow with verified leads" : "Get better supplier quotes"}</h3><p className="mt-1 text-sm leading-6 text-amber-800/70">{seller ? "Complete your catalogue and respond quickly to improve visibility." : "Detailed requirements receive faster and more accurate quotations."}</p></div></div></div></div>
    </section>
  </div>
}
