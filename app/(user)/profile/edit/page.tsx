import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile/edit");
  }

  return (
    <div className="min-h-screen bg-[#07111f] px-4 py-12 text-[#F5F5F0]">
      <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#F5F5F0]/60">Profile</p>
        <h1 className="mt-3 text-3xl font-semibold">Edit profile</h1>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">This is a protected user area. Update your details here.</p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4">
            <p className="text-sm text-[#F5F5F0]/60">Name</p>
            <p className="mt-2 text-xl font-medium">{user.name}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4">
            <p className="text-sm text-[#F5F5F0]/60">Email</p>
            <p className="mt-2 text-xl font-medium">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
