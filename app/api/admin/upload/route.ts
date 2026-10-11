import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { cloudinaryClient } from "@/lib/admin/cloudinary";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const file = String(body.file ?? "");

  if (!file.startsWith("data:")) {
    return NextResponse.json({ error: "Missing file payload" }, { status: 400 });
  }

  try {
    const upload = await cloudinaryClient.uploader.upload(file, {
      folder: "portfolio/drafts",
      resource_type: "auto",
    });

    return NextResponse.json({ url: upload.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error", error);
    return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
  }
}
