import { NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { requireUser } from "@/lib/auth/session";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export async function PATCH(request: Request) {
  try {
    const user = (await requireUser({ includePasswordHash: true })) as {
      _id: ObjectId;
      passwordHash: string;
    } | null;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = passwordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide valid password details." }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    if (!(await verifyPassword(currentPassword, user.passwordHash))) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const passwordHash = await hashPassword(newPassword);

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { passwordHash, updatedAt: new Date() } }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Password update error:", error);
    return NextResponse.json({ error: "Unable to update password." }, { status: 500 });
  }
}
