"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";

export function ResetPasswordForm({ code }: { code: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function validateCode() {
      if (!code) {
        setStatus("invalid");
        return;
      }

      const response = await fetch(`/api/auth/reset-password?code=${encodeURIComponent(code)}`);
      const payload = await response.json();
      setStatus(response.ok && payload.valid ? "valid" : "invalid");
    }

    validateCode();
  }, [code]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, password: form.password, confirmPassword: form.confirmPassword }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to reset your password.");
      }

      router.push("/login");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to reset your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="text-sm text-[#F5F5F0]/70">Checking your reset link...</div>;
  }

  if (status === "invalid") {
    return (
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-semibold text-[#F5F5F0]">This link is invalid</h1>
        <p className="text-sm text-[#F5F5F0]/70">The reset link may have expired or already been used.</p>
        <Link href="/forgot-password" className="inline-block text-[#F5C518]">
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#F5F5F0]">Set a new password</h1>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">Choose a strong password to protect your account.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="New password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          placeholder="Create a new password"
        />

        <AuthInput
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          placeholder="Repeat your new password"
        />

        <PasswordStrength password={form.password} />

        {error ? <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating password..." : "Reset password →"}
        </AuthButton>
      </form>
    </div>
  );
}
