"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { AuthInput } from "@/components/auth/AuthInput";

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe: form.rememberMe,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to log in.");
      }

      router.push("/profile");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#F5F5F0]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">Log in to access your account and saved favorites.</p>
      </div>

      <GoogleAuthButton />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="hello@example.com"
          autoComplete="email"
        />

        <AuthInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          placeholder="Your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-3 text-sm text-[#F5F5F0]/70">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(event) => setForm((current) => ({ ...current, rememberMe: event.target.checked }))}
              className="h-4 w-4 rounded border-white/10 bg-[#0B1220] text-[#F5C518]"
            />
            <span>Remember me</span>
          </label>

          <Link href="/forgot-password" className="font-medium text-[#F5C518] hover:text-[#F5D24B]">
            Forgot password?
          </Link>
        </div>

        {error ? <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in →"}
        </AuthButton>
      </form>

      <p className="text-center text-sm text-[#F5F5F0]/70">
        New here?{" "}
        <Link href="/register" className="font-medium text-[#F5C518] hover:text-[#F5D24B]">
          Create an account
        </Link>
      </p>
    </div>
  );
}
