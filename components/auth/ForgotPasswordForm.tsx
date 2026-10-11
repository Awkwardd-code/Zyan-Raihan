"use client";

import { useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();

      if (!response.ok && payload?.error) {
        throw new Error(payload.error);
      }

      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#F5F5F0]">Reset your password</h1>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">Enter your email and we will send a reset link.</p>
      </div>

      {success ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
          Check your inbox. If an account exists for this email, we sent a reset link.
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="hello@example.com"
            autoComplete="email"
          />

          {error ? <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link →"}
          </AuthButton>
        </form>
      )}
    </div>
  );
}
