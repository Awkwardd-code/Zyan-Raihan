"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("zayn@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Login failed.");
      }

      router.push("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1220]/85 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C518] text-sm font-bold text-[#0A0F1C]">Z</div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Portfolio</p>
            <h1 className="text-2xl font-semibold text-[#F5F5F0]">Admin login</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-[#F5F5F0]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-2.5 text-[#F5F5F0]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[#F5F5F0]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-2.5 text-[#F5F5F0]"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#F5C518] px-4 py-3 font-semibold text-[#0A0F1C] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
