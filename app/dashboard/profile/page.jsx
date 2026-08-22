"use client";

import AuthGuard from "@/components/auth-guard";
import ProfileForm from "@/components/profile-form";

export default function DashboardProfilePage() {
  return (
    <AuthGuard redirectIfNotAuthenticated="/login">
      <div className="rounded-3xl bg-white px-4 py-6 shadow-sm sm:px-8 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <ProfileForm />
        </div>
      </div>
    </AuthGuard>
  );
}
