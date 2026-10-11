import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("email" in body) || typeof body.email !== "string") {
    return NextResponse.json({ success: false, error: "Enter a valid email address." }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (!clientPromise) {
    return NextResponse.json({ success: false, error: "Subscriptions are temporarily unavailable." }, { status: 503 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const subscribers = db.collection<{ email: string; createdAt: Date; welcomeSentAt?: Date }>("subscribers");
    await subscribers.createIndex({ email: 1 }, { unique: true });
    await subscribers.updateOne({ email }, { $setOnInsert: { email, createdAt: new Date() } }, { upsert: true });
    const existing = await subscribers.findOne({ email });

    if (!existing?.welcomeSentAt) {
      await sendWelcomeEmail(email);
      await subscribers.updateOne({ email }, { $set: { welcomeSentAt: new Date() } });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to complete your subscription. Please try again." },
      { status: 500 },
    );
  }
}
