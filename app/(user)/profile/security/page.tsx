import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function SecurityPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile/security");
  }

  return (
    <div className="min-h-screen bg-[#07111f] px-4 py-12 text-[#F5F5F0]">
      <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#F5F5F0]/60">Security</p>
        <h1 className="mt-3 text-3xl font-semibold">Change password</h1>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">Protect your account with a fresh password.</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4 text-sm text-[#F5F5F0]/70">
          To update your password, use the password change endpoint from the account settings flow. This page is protected and accessible only to signed-in users.
        </div>
      </div>
    </div>
  );
}
