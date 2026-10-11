"use client";

import { useEffect, useState } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { OTPInput } from "@/components/auth/OTPInput";

export function VerificationModal({
  open,
  email,
  onClose,
  onVerify,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
  onVerify: (token: string, email: string) => Promise<void>;
}) {
  const [otp, setOtp] = useState<string[]>(Array.from({ length: 8 }, () => ""));
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!open) return;

    const timer = window.setInterval(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [open]);

  if (!open) return null;

  const code = otp.join("");

  const handleVerify = async () => {
    if (code.length !== 8) {
      setError("Please enter the full 8-character code.");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      await onVerify(code, email);
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setCountdown(60);
    try {
      await fetch("/api/auth/register/resend", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setError("Unable to resend the code right now.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0B1220]/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#F5F5F0]">Check your inbox</h2>
            <p className="mt-2 text-sm text-[#F5F5F0]/70">We sent an 8-character code to {email}</p>
          </div>
          <button onClick={onClose} className="text-sm text-[#F5F5F0]/60 hover:text-[#F5F5F0]">
            Close
          </button>
        </div>

        <div className="space-y-5">
          <OTPInput value={otp} onChange={setOtp} />

          {error ? <div className="text-sm text-red-300">{error}</div> : null}

          <AuthButton onClick={handleVerify} disabled={code.length !== 8 || isVerifying}>
            {isVerifying ? "Verifying..." : "Verify →"}
          </AuthButton>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0}
              className="text-[#F5C518] disabled:cursor-not-allowed disabled:text-[#F5F5F0]/30"
            >
              {countdown > 0 ? `Resend code (${countdown}s)` : "Resend code"}
            </button>
            <button type="button" onClick={onClose} className="text-[#F5F5F0]/70 hover:text-[#F5F5F0]">
              Change email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
