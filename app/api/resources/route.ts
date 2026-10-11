import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { fallbackResources } from "@/lib/data";

export const revalidate = 60;

export async function GET() {
  if (!clientPromise) return NextResponse.json(fallbackResources);

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const resources = await db.collection("resources").find({}).sort({ featured: -1, createdAt: -1 }).toArray();
    return NextResponse.json(resources.length ? resources : fallbackResources);
  } catch {
    return NextResponse.json(fallbackResources);
  }
}
