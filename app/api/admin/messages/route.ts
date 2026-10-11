import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { getCollection } from "@/lib/admin/db";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const collection = await getCollection("messages");
  const documents = await collection.find({}).sort({ read: 1, _id: -1 }).toArray();
  return NextResponse.json(documents);
}
