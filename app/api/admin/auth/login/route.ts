import { NextResponse } from "next/server";
import { compareAdminPassword, setAdminSessionCookie, signSession } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  const expectedEmail = (process.env.ADMIN_EMAIL || "zayn@example.com").toLowerCase();
  const validPassword = await compareAdminPassword(password);
  const isValid = email === expectedEmail && validPassword;

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signSession(email);
  const response = NextResponse.json({ ok: true, user: { email } });

  return setAdminSessionCookie(response, token);
}
