import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { getCollection, parseObjectId } from "@/lib/admin/db";
import { projectSchema } from "@/lib/admin/schema";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const objectId = parseObjectId(id);

  if (!objectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const collection = await getCollection("projects");
  const document = await collection.findOne({ _id: objectId });

  if (!document) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(document);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const objectId = parseObjectId(id);

  if (!objectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const update = projectSchema.partial().parse(body);

  const collection = await getCollection("projects");
  const result = await collection.updateOne(
    { _id: objectId },
    { $set: { ...update, updatedAt: new Date().toISOString() } }
  );

  return NextResponse.json({ ok: result.modifiedCount > 0 });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const objectId = parseObjectId(id);

  if (!objectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const collection = await getCollection("projects");
  const result = await collection.deleteOne({ _id: objectId });

  return NextResponse.json({ ok: result.deletedCount > 0 });
}
