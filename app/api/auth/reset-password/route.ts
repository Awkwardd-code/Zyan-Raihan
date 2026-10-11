import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth/password";

const resetPasswordSchema = z
  .object({
    code: z.string().trim().min(1),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code")?.trim() ?? "";

    if (!code) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ valid: false }, { status: 503 });
    }

    const resetRecord = await db.collection("passwordResets").findOne({
      code,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    return NextResponse.json({ valid: !!resetRecord }, { status: 200 });
  } catch (error) {
    console.error("Password reset validation error:", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid reset code and password." }, { status: 400 });
    }

    const { code, password } = parsed.data;
    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const resetRecord = await db.collection("passwordResets").findOne({
      code,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    await db.collection("users").updateOne(
      { _id: resetRecord.userId },
      { $set: { passwordHash, updatedAt: new Date() } }
    );

    await db.collection("passwordResets").updateOne(
      { _id: resetRecord._id },
      { $set: { used: true, usedAt: new Date() } }
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Unable to reset your password at the moment." }, { status: 500 });
  }
}
