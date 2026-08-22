"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Building2, Check, Eye, EyeOff, Loader2, LockKeyhole, Mail, RefreshCw, ShieldCheck, ShoppingBag, Sparkles, User } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"

const fieldClass = "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#087f8c] focus:bg-white focus:ring-4 focus:ring-cyan-500/10"

export default function AuthModal({ open, onOpenChange, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode)
  const [role, setRole] = useState("buyer")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [step, setStep] = useState("form")
  const [otp, setOtp] = useState("")
  const [otpId, setOtpId] = useState("")
  const [message, setMessage] = useState("")
  const { login, register, requestOTP, authWithOTP, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => { if (open) { setMode(defaultMode); setStep("form"); setOtp(""); setOtpId(""); setError(""); setMessage("") } }, [open, defaultMode])
  const change = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError("") }
  const switchMode = (next) => { setMode(next); setStep("form"); setError(""); setMessage("") }

  const submit = async (e) => {
    e.preventDefault(); setError("")
    if (!form.email || !form.password) return setError("Please enter your email and password.")
    try {
      if (mode === "login") {
        await login(form.email, form.password)
        onOpenChange(false)
        router.push("/dashboard")
      } else {
        if (!form.firstName.trim() || !form.lastName.trim()) return setError("Please enter your full name.")
        if (form.password.length < 8) return setError("Password must be at least 8 characters.")
        await register({ email: form.email, password: form.password, passwordConfirm: form.password, userRole: role, firstName: form.firstName.trim(), lastName: form.lastName.trim(), prefix: "", phone: "", organizationName: "", designation: "", country: "India", sectorsOfInterest: "", functionalAreas: "" })
        setStep("otp")
        const nextOtpId = await requestOTP(form.email)
        setOtpId(nextOtpId)
        setMessage("We sent a 6-digit code to your email.")
      }
    } catch (err) {
      const message = err?.data?.error || err?.data?.message || err?.message || "Something went wrong. Please try again."
      setError(message.toLowerCase().includes("failed to authenticate") ? "Incorrect email or password." : message)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault(); setError(""); setMessage("")
    if (!/^\d{6}$/.test(otp)) return setError("Please enter the 6-digit verification code.")
    try {
      await authWithOTP(otpId, otp)
      onOpenChange(false)
      router.push("/dashboard")
    } catch (err) { setError(err?.data?.error || err?.message || "Invalid or expired OTP.") }
  }

  const resendOtp = async () => {
    setError(""); setMessage("")
    try {
      setOtpId(await requestOTP(form.email)); setOtp("")
      setMessage("A fresh OTP has been sent. Please check your inbox and spam folder.")
    } catch (err) { setError(err?.data?.error || err?.message || "Unable to resend OTP.") }
  }

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="inset-0 h-dvh max-h-none w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-white p-0 shadow-[0_30px_100px_rgba(2,20,28,.35)] md:inset-auto md:left-1/2 md:top-1/2 md:h-auto md:max-h-[94vh] md:w-[calc(100%-3rem)] md:max-w-[1050px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[28px]"
      overlayClassName="bg-slate-950/75 backdrop-blur-[2px]"
      showCloseButton
    >
      <DialogTitle className="sr-only">{mode === "login" ? "Sign in" : "Create account"}</DialogTitle>
      <DialogDescription className="sr-only">Access your MySME Marketplace account</DialogDescription>
      <div className="grid min-h-full md:min-h-[650px] md:grid-cols-[.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-[#071d2b] p-9 text-white md:flex md:flex-col">
          <div className="hero-grid absolute inset-0 opacity-25" /><div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-[80px]" /><div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-300/15 blur-[80px]" />
          <div className="relative"><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-cyan-100"><Sparkles className="h-3.5 w-3.5 text-amber-300" /> Built for Indian businesses</div><h2 className="mt-7 text-4xl font-semibold leading-tight tracking-[-.04em]">Trade better.<br/><span className="text-gradient">Grow together.</span></h2><p className="mt-4 leading-7 text-slate-300">One trusted account for sourcing, selling and building valuable business connections.</p></div>
          <div className="relative mt-auto space-y-3">{["Connect with verified SMEs", "Post and manage requirements", "Receive relevant business enquiries"].map(item => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] p-3 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/15"><Check className="h-4 w-4 text-emerald-300" /></span>{item}</div>)}</div>
          <div className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5"><div className="flex -space-x-2">{["agriculture-farming.jpg", "apparel-garments.jpg", "automobile-parts-spares.jpg"].map(x => <img key={x} src={`/images/categories/${x}`} alt="" className="h-9 w-9 rounded-full border-2 border-[#071d2b] object-cover" />)}</div><div><p className="text-sm font-semibold">10,000+ business members</p><p className="text-xs text-slate-400">Growing across India</p></div></div>
        </div>

        <div className="relative flex min-h-[650px] flex-col overflow-hidden p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait" initial={false}>
            {step === "form" ? <motion.div key="auth-form" initial={{ opacity: 0, rotateY: -10, x: -30 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: 10, x: 35 }} transition={{ duration: .35, ease: "easeOut" }}>
              <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#087f8c]">{mode === "login" ? "Welcome back" : "Join the marketplace"}</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{mode === "login" ? "Sign in to your account" : "Create your business account"}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{mode === "login" ? "Manage enquiries, products and business connections." : "Start discovering opportunities in just a few steps."}</p></div>
              <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button onClick={() => switchMode("login")} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${mode === "login" ? "bg-white text-[#087f8c] shadow-sm" : "text-slate-500"}`}>Sign in</button><button onClick={() => switchMode("register")} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${mode === "register" ? "bg-white text-[#087f8c] shadow-sm" : "text-slate-500"}`}>Create account</button></div>
              <form onSubmit={submit} className="space-y-4">
                {mode === "register" && <><div className="grid grid-cols-2 gap-3">{[["buyer", ShoppingBag, "I want to buy"], ["seller", Building2, "I want to sell"]].map(([value, Icon, label]) => <button type="button" key={value} onClick={() => setRole(value)} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-semibold transition ${role === value ? "border-[#087f8c] bg-cyan-50 text-[#076b76] ring-2 ring-cyan-500/10" : "border-slate-200 text-slate-600"}`}><Icon className="h-5 w-5" />{label}</button>)}</div><div className="grid grid-cols-2 gap-3"><div className="relative"><User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input name="firstName" value={form.firstName} onChange={change} placeholder="First name" className={fieldClass} /></div><div className="relative"><User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input name="lastName" value={form.lastName} onChange={change} placeholder="Last name" className={fieldClass} /></div></div></>}
                <div className="relative"><Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input name="email" type="email" value={form.email} onChange={change} placeholder="Business email address" className={fieldClass} /></div>
                <div className="relative"><LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={change} placeholder={mode === "register" ? "Create password (8+ characters)" : "Enter your password"} className={`${fieldClass} pr-12`} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
                {mode === "login" && <div className="flex justify-end"><button type="button" onClick={() => { onOpenChange(false); router.push("/reset-password") }} className="text-sm font-semibold text-[#087f8c]">Forgot password?</button></div>}
                {error && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</motion.div>}
                <button disabled={isLoading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087f8c] font-bold text-white shadow-lg shadow-cyan-900/10 transition hover:-translate-y-0.5 hover:bg-[#066b75] disabled:opacity-60">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "login" ? "Sign in securely" : "Create my account"}</button>
              </form>
              <p className="mt-5 text-center text-xs leading-5 text-slate-400">By continuing, you agree to our <Link href="/terms-and-conditions" className="font-semibold text-slate-600">Terms</Link> and <Link href="/privacy-policy" className="font-semibold text-slate-600">Privacy Policy</Link>.</p>
            </motion.div> : <motion.div key="otp-form" className="m-auto w-full max-w-md" initial={{ opacity: 0, rotateY: -12, x: -35 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: .4, ease: "easeOut" }}>
              <button type="button" onClick={() => { setStep("form"); setError(""); setMessage("") }} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#087f8c]"><ArrowLeft className="h-4 w-4" /> Back</button>
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-cyan-50 text-[#087f8c] ring-8 ring-cyan-50/50"><ShieldCheck className="h-8 w-8" /></div>
              <p className="text-sm font-bold uppercase tracking-[.14em] text-[#087f8c]">One last step</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Verify your email</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">Enter the 6-digit code sent to <strong className="text-slate-700">{form.email}</strong>. The code is valid for 10 minutes.</p>
              <form onSubmit={verifyOtp} className="mt-8 space-y-4">
                <input autoFocus inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError("") }} aria-label="6-digit verification code" placeholder="••••••" className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 text-center text-2xl font-bold tracking-[.55em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-[#087f8c] focus:bg-white focus:ring-4 focus:ring-cyan-500/10" />
                {message && <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
                {error && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</motion.div>}
                <button disabled={isLoading || otp.length !== 6} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087f8c] font-bold text-white shadow-lg shadow-cyan-900/10 transition hover:bg-[#066b75] disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ShieldCheck className="h-5 w-5" /> Verify & continue</>}</button>
                <button type="button" disabled={isLoading} onClick={resendOtp} className="flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold text-[#087f8c] disabled:opacity-50"><RefreshCw className="h-4 w-4" /> Resend code</button>
              </form>
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">Didn&apos;t receive it? Check your spam folder or resend the code.</p>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}
