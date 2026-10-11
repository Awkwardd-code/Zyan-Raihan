"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export function AdminTopbar() {
  const router = useRouter();
  const { user } = useAdminAuth();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#0A0F1C]/80 px-5 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[#F5F5F0]/60">Admin panel</p>
        <h2 className="text-xl font-semibold text-[#F5F5F0]">Zayn Raihan</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-[#F5C518]/30 bg-[#F5C518]/10 px-3 py-1 text-sm text-[#F5F5F0] md:block">
          {user?.email ?? "admin@locale"}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-[#F5C518]/50 bg-[#F5C518] px-3 py-2 text-sm font-medium text-[#0A0F1C] transition hover:brightness-110"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
