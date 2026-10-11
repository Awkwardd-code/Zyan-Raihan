import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { fallbackProjects } from "@/lib/data";

export const revalidate = 60;

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json(fallbackProjects);
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const projects = await db
      .collection("projects")
      .find({})
      .sort({ featured: -1, year: -1, order: 1 })
      .toArray();

    return NextResponse.json(projects.length ? projects : fallbackProjects);
  } catch {
    return NextResponse.json(fallbackProjects);
  }
}
