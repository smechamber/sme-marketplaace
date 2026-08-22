"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, FileText, Headphones, ShieldCheck, Truck, Users } from "lucide-react"
import { productCategories } from "@/lib/constants"

const steps = [
  { icon: FileText, n: "01", title: "Tell us what you need", text: "Post product, quantity and delivery details in under two minutes." },
  { icon: Users, n: "02", title: "Meet matched suppliers", text: "Get discovered by relevant, verified businesses from across India." },
  { icon: BadgeCheck, n: "03", title: "Compare & connect", text: "Review profiles and quotes, then choose the right trade partner." },
]

const categoryHref = (name) => `/category/${encodeURIComponent(name)}`

export default function MarketplaceSections() {
  return <>
    <section className="bg-[#f4f7f7] py-16 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Browse top categories</p>
            <h2 className="section-title">What are you looking for?</h2>
            <p className="section-copy">Explore products and trusted suppliers across India’s most active business industries.</p>
          </div>
          <Link href="/category" className="inline-flex items-center gap-2 font-semibold text-[#087f8c] transition-all hover:gap-3">View complete directory <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {productCategories.map((category, index) => <motion.div key={category.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .035 }}>
            <Link href={categoryHref(category.name)} className="group flex h-full min-h-36 flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
              <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 ring-4 ring-slate-50"><img src={category.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /></div>
              <p className="mt-3 text-xs font-bold leading-5 text-slate-800 group-hover:text-[#087f8c]">{category.name}</p>
            </Link>
          </motion.div>)}
        </div>

        <div className="mt-16 flex items-end justify-between gap-4"><div><p className="section-kicker">Explore by industry</p><h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Popular products and services</h2></div><p className="hidden text-sm text-slate-500 sm:block">Direct access to {productCategories.reduce((sum, item) => sum + item.subcategories.length, 0)}+ product groups</p></div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {productCategories.map((category, index) => <motion.article key={category.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: (index % 2) * .08 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-slate-300 hover:shadow-xl">
            <div className="grid min-h-[290px] sm:grid-cols-[190px_1fr]">
              <Link href={categoryHref(category.name)} className="relative min-h-44 overflow-hidden bg-slate-200 sm:min-h-full">
                <img src={category.img} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d2b]/90 via-[#071d2b]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5"><span className="inline-flex items-center gap-1 text-xs font-semibold text-white">Explore industry <ArrowRight className="h-3.5 w-3.5" /></span></div>
              </Link>
              <div className="p-5 sm:p-6">
                <Link href={categoryHref(category.name)} className="text-xl font-bold leading-tight text-slate-900 transition hover:text-[#087f8c]">{category.name}</Link>
                <div className="mt-5 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                  {category.subcategories.slice(0, 6).map((sub) => <Link key={sub.name} href={`${categoryHref(category.name)}?subcategory=${encodeURIComponent(sub.name)}`} className="group/item flex min-h-10 items-center justify-between border-b border-slate-100 py-2 text-[13px] font-medium leading-5 text-slate-600 transition hover:text-[#087f8c]"><span>{sub.name}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover/item:opacity-100" /></Link>)}
                </div>
                <Link href={categoryHref(category.name)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087f8c]">View all {category.subcategories.length} categories <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </motion.article>)}
        </div>
        <div className="mt-10 text-center"><Link href="/category" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#087f8c] bg-white px-6 py-3.5 font-bold text-[#087f8c] transition hover:bg-[#087f8c] hover:text-white">Browse all product categories <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center"><p className="section-kicker">Simple sourcing</p><h2 className="section-title">From requirement to right supplier</h2><p className="section-copy mx-auto">A faster, clearer way to procure for your business.</p></div>
        <div className="relative mt-12 grid gap-5 lg:grid-cols-3"><div className="absolute left-[17%] right-[17%] top-12 hidden border-t border-dashed border-slate-300 lg:block" />{steps.map(({ icon: Icon, n, title, text }, index) => <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-7 flex items-center justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50 text-[#087f8c]"><Icon className="h-6 w-6" /></div><span className="text-sm font-semibold text-slate-300">{n}</span></div><h3 className="text-xl font-semibold text-slate-900">{title}</h3><p className="mt-3 leading-7 text-slate-500">{text}</p></motion.div>)}</div>
      </div>
    </section>

    <section className="bg-[#f5f8f8] pb-20 sm:pb-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="overflow-hidden rounded-[2rem] bg-[#087f8c] px-6 py-10 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-12"><div><p className="text-sm font-semibold uppercase tracking-[.16em] text-cyan-100">Built for confident trade</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Ready to find your next reliable supplier?</h2><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cyan-50"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified businesses</span><span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Pan-India sourcing</span><span className="flex items-center gap-2"><Headphones className="h-4 w-4" /> Dedicated support</span></div></div><Link href="/dashboard/requirements/add" className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#076b76] shadow-lg transition hover:-translate-y-1 lg:mt-0">Post requirement — it’s free <ArrowRight className="h-4 w-4" /></Link></div></div></section>
  </>
}
