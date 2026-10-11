"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

type CloudinaryUploaderProps = {
  value?: string;
  folder?: string;
  onChange: (url: string) => void;
  label?: string;
};

export function CloudinaryUploader({ value, folder = "portfolio/drafts", onChange, label = "Upload media" }: CloudinaryUploaderProps) {
  const { uploadFile, isUploading, progress, error } = useCloudinaryUpload();
  const [preview, setPreview] = useState(value ?? "");

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const url = await uploadFile(file, folder);
      if (url) {
        setPreview(url);
        onChange(url);
      }
    },
    [folder, onChange, uploadFile]
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#F5F5F0]">{label}</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleUpload}
        className="block w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-sm text-[#F5F5F0]"
      />
      {isUploading ? (
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#F5C518]" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-[#F5F5F0]/70">Uploading... {progress}%</p>
        </div>
      ) : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
      {preview ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1220] p-2">
          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={128}
            unoptimized
            className="h-32 w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
