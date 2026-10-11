import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth/password";
import { generateVerificationToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/send";
import { verificationEmailTemplate } from "@/lib/email/templates/verification";

const registerInitSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = registerInitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid name, email, and password." }, { status: 400 });
    }

    const { name, email, password, confirmPassword } = parsed.data;

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    const ip = (request as Request & { headers?: Headers }).headers.get("x-forwarded-for") || "unknown";
    const rateKey = `register:init:${ip}`;
    const rateLimit = await db.collection("rateLimits").findOne({ key: rateKey, expiresAt: { $gt: new Date() } });

    if (rateLimit && rateLimit.count >= 3) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please wait a bit and try again." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }

    const token = generateVerificationToken();
    const passwordHash = await hashPassword(password);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.collection("pendingUsers").findOneAndUpdate(
      { email: normalizedEmail },
      {
        $set: {
          name,
          email: normalizedEmail,
          passwordHash,
          token,
          attempts: 0,
          expiresAt,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    await db.collection("rateLimits").updateOne(
      { key: rateKey },
      { $inc: { count: 1 }, $set: { expiresAt: new Date(Date.now() + 1000 * 60 * 15) } },
      { upsert: true }
    );

    await sendEmail({
      to: normalizedEmail,
      subject: "Verify your Zayn Raihan account",
      html: verificationEmailTemplate({
        name,
        token,
      }),
      text: `Your verification code is ${token}. Use it to verify your account.`,
    });

    return NextResponse.json({ ok: true, email: normalizedEmail });
  } catch (error) {
    console.error("Register init error:", error);
    return NextResponse.json({ error: "Unable to create your account right now." }, { status: 500 });
  }
}
