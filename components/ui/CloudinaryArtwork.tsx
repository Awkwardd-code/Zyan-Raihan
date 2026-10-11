"use client";

import { CldImage } from "next-cloudinary";
import { useState } from "react";

export function CloudinaryArtwork({
  src,
  alt,
  sizes,
  className = "",
  fallbackLabel,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackLabel: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_70%_25%,rgba(245,197,24,0.14),transparent_26%),linear-gradient(135deg,#183047,#0A0F1C)]">
      {src && !failed && (
        <CldImage
          src={src}
          alt={alt}
          fill
          crop="fill"
          sizes={sizes}
          onError={() => setFailed(true)}
          className={className}
        />
      )}
      {(!src || failed) && (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="font-display text-[clamp(8rem,24vw,18rem)] leading-none text-white/[0.06]">{fallbackLabel.slice(0, 1)}</span>
          <span className="absolute left-8 top-8 h-16 w-16 rounded-full border border-white/10" />
          <span className="absolute left-12 top-12 h-8 w-8 rounded-full border border-[#F5C518]/25" />
        </div>
      )}
    </div>
  );
}
