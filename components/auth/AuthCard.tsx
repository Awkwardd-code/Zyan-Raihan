import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111f] px-4 py-10 text-[#F5F5F0]"> 
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C518] text-lg font-bold text-[#0A0F1C]">
            Z
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#F5F5F0]/60">Zayn Raihan</p>
            <p className="text-xl font-semibold text-[#F5F5F0]">Member access</p>
          </div>
        </div>

        <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          {children}
        </div>

        <div className="text-center text-xs text-[#F5F5F0]/50">
          <span>© 2026 Zayn Raihan</span>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="hover:text-[#F5C518]">Privacy</Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="hover:text-[#F5C518]">Terms</Link>
        </div>
      </div>
    </div>
  );
}
