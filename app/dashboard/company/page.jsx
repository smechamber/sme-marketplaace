"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth-guard";
import CompanyForm from "@/components/company-form";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Building2, CheckCircle2, Package, ReceiptText } from "lucide-react";

export default function DashboardCompanyPage() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) {
      if (currentUser.userRole !== "seller") {
        router.push("/dashboard");
      }
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || (currentUser && currentUser.userRole !== "seller")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <AuthGuard redirectIfNotAuthenticated="/login">
      <div className="space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#062333] to-[#087f8c] p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-200">Seller onboarding</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Build your business profile</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">Complete and accurate information helps buyers trust your company and send relevant enquiries.</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[CheckCircle2,"Account"],[Building2,"Business details"],[Package,"Products"],[ReceiptText,"GST & verification"]].map(([Icon,label], index) => <div key={label} className={`flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold ${index === 1 ? "bg-white text-[#087f8c]" : "bg-white/10 text-white"}`}><Icon className="h-4 w-4"/>{label}</div>)}</div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-6"><CompanyForm /></div>
      </div>
    </AuthGuard>
  );
}
