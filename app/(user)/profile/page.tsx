import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  return (
    <div className="min-h-screen bg-[#07111f] px-4 py-12 text-[#F5F5F0]">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#F5F5F0]/60">Your profile</p>
            <h1 className="mt-3 text-3xl font-semibold">{user.name}</h1>
          </div>
          <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            Back home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#F5C518] text-3xl font-bold text-[#0A0F1C]">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="mt-6 space-y-2 text-center">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-[#F5F5F0]/60">{user.email}</p>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Account</h3>
                <div className="flex gap-3">
                  <Link href="/profile/edit" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5">
                    Edit profile
                  </Link>
                  <Link href="/profile/security" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5">
                    Change password
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/55">Member since</p>
                  <p className="mt-2 text-lg font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/55">Last login</p>
                  <p className="mt-2 text-lg font-medium">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "—"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold">Danger zone</h3>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-red-500/25 bg-red-500/5 p-4">
                <div>
                  <p className="font-medium text-red-200">Log out</p>
                  <p className="text-sm text-red-200/70">Sign out of your account and clear your session.</p>
                </div>
                <form action="/api/auth/logout" method="POST">
                  <button className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-500/30">
                    Log out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
