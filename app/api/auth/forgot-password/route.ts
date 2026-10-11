import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { generateResetCode } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/send";
import { resetEmailTemplate } from "@/lib/email/templates/reset";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const code = generateResetCode();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.collection("passwordResets").findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          userId: user._id,
          code,
          used: false,
          usedAt: null,
          expiresAt,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: resetEmailTemplate({
        name: user.name,
        code,
        url: `${appUrl}/reset-password?code=${encodeURIComponent(code)}`,
      }),
      text: `Reset your password by visiting ${appUrl}/reset-password?code=${code}`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
