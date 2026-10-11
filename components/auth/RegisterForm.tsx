"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { VerificationModal } from "@/components/auth/VerificationModal";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register/init", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to create your account right now.");
      }

      setPendingEmail(form.email);
      setShowVerification(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerified = async (token: string, email: string) => {
    const response = await fetch("/api/auth/register/verify", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Verification failed.");
    }

    router.push("/profile");
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#F5F5F0]">Create your account</h1>
          <p className="mt-2 text-sm text-[#F5F5F0]/70">
            Join to access resources, save favorites, and get updates.
          </p>
        </div>

        <GoogleAuthButton />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthInput
            label="Name"
            name="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="hello@example.com"
            autoComplete="email"
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
          />

          <AuthInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            placeholder="Repeat your password"
            autoComplete="new-password"
          />

          <PasswordStrength password={form.password} />

          <label className="flex items-start gap-3 text-sm text-[#F5F5F0]/70">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(event) => updateField("agree", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0B1220] text-[#F5C518]"
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          {error ? <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account →"}
          </AuthButton>
        </form>

        <p className="text-center text-sm text-[#F5F5F0]/70">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#F5C518] hover:text-[#F5D24B]">
            Log in
          </Link>
        </p>
      </div>

      <VerificationModal
        open={showVerification}
        email={pendingEmail}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerified}
      />
    </>
  );
}
