import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";

export async function GET() {
  const admin = await getCurrentAdmin();

  if (!admin || !admin.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: { email: admin.email } });
}
