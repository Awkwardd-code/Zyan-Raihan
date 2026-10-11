"use client";

import { useCallback, useState } from "react";

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File, folder = "portfolio/drafts") => {
    setIsUploading(true);
    setProgress(5);
    setError(null);

    try {
      const signResponse = await fetch(`/api/admin/cloudinary/sign?folder=${encodeURIComponent(folder)}`);

      if (!signResponse.ok) {
        throw new Error("Unable to sign upload request.");
      }

      const signed = await signResponse.json();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signed.apiKey);
      formData.append("timestamp", String(signed.timestamp));
      formData.append("signature", signed.signature);
      formData.append("folder", folder);
      formData.append("upload_preset", signed.uploadPreset || "");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${signed.cloudName}/auto/upload`;

      const result = await new Promise<{ secure_url?: string; error?: { message?: string } }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(JSON.parse(xhr.responseText)?.error?.message || "Upload failed."));
          }
        };
        xhr.onerror = () => reject(new Error("Network upload error."));
        xhr.send(formData);
      });

      if (!result.secure_url) {
        throw new Error(result.error?.message || "Upload did not produce a URL.");
      }

      setProgress(100);
      return result.secure_url;
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
      return "";
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadFile, isUploading, progress, error };
}
