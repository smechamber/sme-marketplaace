"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter(),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      r = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"),
          password: f.get("password"),
        }),
      }),
      d = await r.json();
    if (!r.ok) return setError(d.error);
    router.push("/");
    router.refresh();
  }
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-white p-8"
      >
        <p className="text-xs font-black uppercase tracking-widest text-[#087f8c]">
          MySME Operations
        </p>
        <h1 className="mt-2 text-3xl font-black">Admin sign in</h1>
        <input
          name="email"
          type="email"
          required
          placeholder="Admin email"
          className="mt-7 h-12 w-full rounded-xl border px-4"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="mt-3 h-12 w-full rounded-xl border px-4"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="mt-5 h-12 w-full rounded-xl bg-slate-950 font-bold text-white">
          Open admin portal
        </button>
      </form>
    </main>
  );
}
