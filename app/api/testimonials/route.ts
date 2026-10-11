import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { fallbackTestimonials } from "@/lib/data";

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json(fallbackTestimonials);
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "portfolio");
    const testimonials = await db.collection("testimonials").find({}).sort({ order: 1 }).toArray();

    return NextResponse.json(testimonials.length ? testimonials : fallbackTestimonials);
  } catch {
    return NextResponse.json(fallbackTestimonials);
  }
}
