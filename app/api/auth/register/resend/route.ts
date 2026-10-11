import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { generateVerificationToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/send";
import { verificationEmailTemplate } from "@/lib/email/templates/verification";

const resendSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = resendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const pendingUser = await db.collection("pendingUsers").findOne({ email });

    if (!pendingUser) {
      return NextResponse.json({ error: "No pending registration was found for this email." }, { status: 404 });
    }

    const now = new Date();
    const lastSentAt = pendingUser.lastSentAt ? new Date(pendingUser.lastSentAt) : null;

    if (lastSentAt && now.getTime() - lastSentAt.getTime() < 60_000) {
      return NextResponse.json({ error: "Please wait before requesting another code." }, { status: 429 });
    }

    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.collection("pendingUsers").updateOne(
      { _id: pendingUser._id },
      { $set: { token, expiresAt, attempts: 0, lastSentAt: now } }
    );

    await sendEmail({
      to: email,
      subject: "Your verification code",
      html: verificationEmailTemplate({ name: pendingUser.name, token }),
      text: `Your verification code is ${token}.`,
    });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({ error: "Unable to resend the verification code." }, { status: 500 });
  }
}
