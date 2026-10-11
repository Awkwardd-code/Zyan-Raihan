import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { getCollection, parseObjectId } from "@/lib/admin/db";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const objectId = parseObjectId(id);
  if (!objectId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const collection = await getCollection("subscribers");
  const result = await collection.deleteOne({ _id: objectId });
  return NextResponse.json({ ok: result.deletedCount > 0 });
}
