import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { setSessionCookie, signJwt } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { serializeUser } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid email and password." }, { status: 400 });
    }

    const { email, password, rememberMe } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const user = await db.collection("users").findOne({ email: normalizedEmail });

    if (!user || typeof user.passwordHash !== "string" || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date(), updatedAt: new Date() } }
    );

    const token = await signJwt(
      { sub: String(user._id), email: user.email },
      rememberMe ? "30d" : "7d"
    );

    const response = NextResponse.json({ ok: true, user: serializeUser(user) });
    return setSessionCookie(response, token, rememberMe ?? false);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
