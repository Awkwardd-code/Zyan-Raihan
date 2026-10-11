import { v2 as cloudinary } from "cloudinary";

const cloudName = 
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  "demo";

cloudinary.config({
  cloud_name: cloudName,
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export const cloudinaryClient = cloudinary;

export function signCloudinaryParams(params: Record<string, unknown> = {}) {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = { timestamp, ...params };
  const signature = cloudinary.utils.api_sign_request(
    payload,
    process.env.CLOUDINARY_API_SECRET || ""
  );

  return {
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    cloudName,
    signature,
    ...payload,
  };
}
