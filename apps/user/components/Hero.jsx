"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, MapPin, Search, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react"

const popular = ["Packaging Machines", "Solar Panels", "Office Furniture", "Industrial Pumps"]

export default function Hero() {
  const [query, setQuery] = useState("")
  const search = (event) => {
    event.preventDefault()
    if (query.trim()) window.location.href = `/products?search=${encodeURIComponent(query.trim())}`
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#071d2b] text-white">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(8,127,140,.24),transparent_32%),radial-gradient(circle_at_88%_25%,rgba(251,191,36,.12),transparent_28%)]" />
      <div className="absolute -right-28 top-20 h-[520px] w-[520px] rounded-full border border-white/[.05]" />
      <div className="absolute -right-10 top-40 h-[360px] w-[360px] rounded-full border border-white/[.06]" />
      <motion.div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[100px]" animate={{ x: [0, 45, 0], y: [0, 30, 0] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px]" animate={{ x: [0, -35, 0], y: [0, 55, 0] }} transition={{ duration: 11, repeat: Infinity }} />

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:px-10 lg:pb-20 lg:pt-20 xl:gap-24">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-amber-300" /> India’s trusted network for growing businesses
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-.04em] sm:text-6xl lg:text-7xl">
            Source smarter. <span className="text-gradient">Grow faster.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Discover verified Indian manufacturers, compare business quotes and build reliable supply partnerships—all in one modern B2B marketplace.
          </motion.p>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }} onSubmit={search} className="mt-9 flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2.5 shadow-2xl shadow-black/30 sm:flex-row">
            <div className="flex flex-1 items-center"><Search className="ml-3 h-5 w-5 text-[#087f8c]" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-12 w-full bg-transparent px-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400" placeholder="What product or service do you need?" aria-label="Search products and services" /></div>
            <div className="hidden items-center border-l border-slate-200 px-3 text-sm text-slate-500 md:flex"><MapPin className="mr-2 h-4 w-4" /> All India</div>
            <button className="h-12 rounded-xl bg-[#087f8c] px-7 font-semibold text-white transition hover:bg-[#066975] hover:shadow-lg">Search</button>
          </motion.form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm"><span>Popular:</span>{popular.map((item) => <Link key={item} href={`/products?search=${encodeURIComponent(item)}`} className="rounded-full border border-white/12 px-3 py-1.5 text-slate-300 transition hover:border-cyan-300/50 hover:text-white">{item}</Link>)}</div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/dashboard/requirements/add" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">Post a requirement <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-white/14">Start selling</Link>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }} className="mt-9 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">{["agriculture-farming.jpg", "apparel-garments.jpg", "automobile-parts-spares.jpg", "bags-belts-wallets.jpg"].map((image) => <img key={image} src={`/images/categories/${image}`} alt="" className="h-9 w-9 rounded-full border-2 border-[#071d2b] object-cover" />)}</div>
            <div><div className="flex items-center gap-1 text-sm font-semibold"><Users className="h-4 w-4 text-cyan-300" /> Trusted by 10,000+ businesses</div><p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> New suppliers verified every day</p></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2, duration: .65 }} className="relative hidden lg:flex lg:items-center lg:justify-center">
          <motion.div animate={{ y: [0, 8, 0], rotate: [-2, -1, -2] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-8 top-12 h-32 w-28 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl"><img src="/images/categories/building-construction.png" alt="" className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-[#071d2b]/85 p-2 text-[10px] font-semibold">Construction</div></motion.div>
          <motion.div animate={{ y: [0, -10, 0], rotate: [3, 2, 3] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-3 bottom-12 h-28 w-24 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl"><img src="/images/categories/agriculture-farming.jpg" alt="" className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-[#071d2b]/85 p-2 text-[10px] font-semibold">Agriculture</div></motion.div>
          <div className="glass-card relative z-10 w-full max-w-md rounded-[2rem] p-6">
            <div className="flex items-start justify-between"><div><p className="text-sm text-slate-300">Live buyer requirement</p><h2 className="mt-1 text-xl font-semibold">Corrugated packaging boxes</h2></div><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">New</span></div>
            <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/7 p-4"><p className="text-xs text-slate-400">Quantity</p><p className="mt-1 font-semibold">25,000 units</p></div><div className="rounded-2xl bg-white/7 p-4"><p className="text-xs text-slate-400">Location</p><p className="mt-1 font-semibold">Pune, MH</p></div></div>
            <div className="my-6 h-px bg-white/10" /><p className="mb-3 text-sm text-slate-300">Matched suppliers</p>
            {["Shree Pack Industries", "Apex Cartons Pvt. Ltd.", "EcoBox Manufacturing"].map((name, index) => <motion.div key={name} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5 + index * .12 }} className="mb-2.5 flex items-center gap-3 rounded-xl bg-white p-3 text-slate-900 shadow-lg"><div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-50"><Building2 className="h-5 w-5 text-[#087f8c]" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{name}</p><p className="flex items-center gap-1 text-xs text-slate-500"><BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> Verified supplier</p></div><span className="text-xs font-semibold text-[#087f8c]">View</span></motion.div>)}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-amber-400 px-4 py-3 text-slate-950"><span className="text-sm font-semibold">3 quotes received</span><TrendingUp className="h-5 w-5" /></div>
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-3 -top-7 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-xl"><ShieldCheck className="h-5 w-5 text-emerald-500" /> Buyer protected</motion.div>
          <motion.div animate={{ x: [0, 7, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-4 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#102d39] px-4 py-3 shadow-2xl"><div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15"><CheckCircle2 className="h-5 w-5 text-emerald-300" /></div><div><p className="text-xs text-slate-400">Latest connection</p><p className="text-sm font-semibold">Buyer matched in 8 mins</p></div></motion.div>
        </motion.div>
      </div>
      <div className="relative border-t border-white/10 bg-white/[.055]"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-6 px-5 py-7 sm:grid-cols-4 sm:px-8 lg:px-10">{[["10,000+", "Verified SMEs"], ["450+", "Product categories"], ["28", "States covered"], ["24 hrs", "Avg. quote time"]].map(([value, label]) => <div key={label} className="border-white/10 px-4 first:pl-0 sm:border-r"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p></div>)}</div></div>
    </section>
  )
}
