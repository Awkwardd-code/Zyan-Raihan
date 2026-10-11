import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; email?: string; message?: string };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    if (!clientPromise) {
      await sendContactEmail({ name, email, message });
      return NextResponse.json({ success: true, stored: false });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    await sendContactEmail({ name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Unable to send your message." }, { status: 500 });
  }
}
