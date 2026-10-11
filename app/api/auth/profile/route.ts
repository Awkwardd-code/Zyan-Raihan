import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { requireUser, serializeUser } from "@/lib/auth/session";

const profileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  avatar: z
    .object({
      publicId: z.string().min(1),
      url: z.string().url(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .nullable()
    .optional(),
});

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json().catch(() => ({}));
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide valid profile details." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client?.db();

    if (!db) {
      return NextResponse.json({ error: "Database is unavailable." }, { status: 503 });
    }

    const update: Record<string, unknown> = { updatedAt: new Date() };

    if (parsed.data.name) {
      update.name = parsed.data.name;
    }

    if (parsed.data.avatar !== undefined) {
      update.avatar = parsed.data.avatar ?? null;
    }

    const result = await db.collection("users").findOneAndUpdate(
      { _id: user._id },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, user: serializeUser(result.value) });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Unable to update profile." }, { status: 500 });
  }
}
