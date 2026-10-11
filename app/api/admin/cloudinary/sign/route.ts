import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { signCloudinaryParams } from "@/lib/admin/cloudinary";

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || "portfolio/drafts";
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

  const params = signCloudinaryParams({ folder, upload_preset: preset, resource_type: "auto" });

  return NextResponse.json({
    apiKey: params.apiKey,
    cloudName: params.cloudName,
    signature: params.signature,
    timestamp: params.timestamp,
    uploadPreset: preset,
  });
}
