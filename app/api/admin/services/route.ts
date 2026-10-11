import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { getCollection } from "@/lib/admin/db";
import { serviceSchema } from "@/lib/admin/schema";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const collection = await getCollection("services");
  const documents = await collection.find({}).sort({ featured: -1, _id: -1 }).toArray();
  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const item = serviceSchema.parse(body);
  const collection = await getCollection("services");
  const result = await collection.insertOne({ ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return NextResponse.json({ _id: result.insertedId, ...item }, { status: 201 });
}
