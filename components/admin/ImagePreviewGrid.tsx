import Image from "next/image";

type ImagePreviewGridProps = {
  images: string[];
};

export function ImagePreviewGrid({ images }: ImagePreviewGridProps) {
  if (!images.filter(Boolean).length) {
    return <p className="text-sm text-[#F5F5F0]/60">No images selected.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {images.filter(Boolean).map((image, index) => (
        <div key={`${image}-${index}`} className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1220] p-2">
          <Image
            src={image}
            alt={`Preview ${index + 1}`}
            width={800}
            height={128}
            unoptimized
            className="h-32 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
