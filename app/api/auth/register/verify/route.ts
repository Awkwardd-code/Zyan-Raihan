import { NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { setSessionCookie, signJwt } from "@/lib/auth/jwt";

const verifySchema = z.object({
  email: z.string().trim().email(),
  token: z.string().trim().min(8).max(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid verification code." }, { status: 400 });
    }

    const { email, token } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedToken = token.trim().toUpperCase();

    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const pendingUser = await db.collection("pendingUsers").findOne({
      email: normalizedEmail,
      token: normalizedToken,
      expiresAt: { $gt: new Date() },
    });

    if (!pendingUser) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    if (pendingUser.attempts >= 5) {
      await db.collection("pendingUsers").deleteOne({ _id: pendingUser._id });
      return NextResponse.json({ error: "Too many failed verification attempts." }, { status: 400 });
    }

    const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
    if (existingUser) {
      await db.collection("pendingUsers").deleteOne({ _id: pendingUser._id });
      return NextResponse.json({ error: "This account has already been verified." }, { status: 409 });
    }

    const userId = new ObjectId();
    const userDocument = {
      _id: userId,
      name: pendingUser.name,
      email: normalizedEmail,
      passwordHash: pendingUser.passwordHash,
      avatar: null,
      verifiedAt: new Date(),
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(userDocument);
    await db.collection("pendingUsers").deleteOne({ _id: pendingUser._id });

    const jwt = await signJwt({ sub: String(userId), email: normalizedEmail }, "7d");
    const response = NextResponse.json({ ok: true, user: { _id: String(userId), name: pendingUser.name, email: normalizedEmail } });

    return setSessionCookie(response, jwt, false);
  } catch (error) {
    console.error("Register verify error:", error);
    return NextResponse.json({ error: "Unable to verify your account right now." }, { status: 500 });
  }
}
