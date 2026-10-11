"use client";

import { useSyncExternalStore } from "react";

const googleAuthErrors: Record<string, string> = {
  google_not_configured: "Google sign-in is not configured yet. Please use email and password.",
  google_account_conflict: "This Google account is already linked to another account.",
  google_auth_failed: "Google sign-in could not be completed. Please try again.",
};

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getGoogleAuthError() {
  const errorCode = new URLSearchParams(window.location.search).get("error");
  return errorCode ? googleAuthErrors[errorCode] ?? "" : "";
}

export function GoogleAuthButton() {
  const error = useSyncExternalStore(subscribeToLocation, getGoogleAuthError, () => "");

  return (
    <div className="space-y-4">
      {error ? (
        <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <a
        href="/api/auth/google"
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-[#F5F5F0] transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.1Z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z" />
          <path fill="#EA4335" d="M12 5.36c1.62 0 3.07.56 4.21 1.64l3.15-3.15A10.54 10.54 0 0 0 12 1a11 11 0 0 0-9.85 6.05l3.69 2.84C6.71 7.29 9.14 5.36 12 5.36Z" />
        </svg>
        Continue with Google
      </a>

      <div className="flex items-center gap-3 text-xs text-[#F5F5F0]/40">
        <span className="h-px flex-1 bg-white/10" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}
