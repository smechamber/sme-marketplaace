"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Nav"
import Footer from "@/components/Footer"

export default function SiteChrome({ children }) {
  const dashboard = usePathname().startsWith("/dashboard")
  return <>{!dashboard && <Navbar />}{children}{!dashboard && <Footer />}</>
}
