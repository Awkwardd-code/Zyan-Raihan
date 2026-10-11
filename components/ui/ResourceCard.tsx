"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CloudinaryArtwork } from "@/components/ui/CloudinaryArtwork";

export function ResourceCard({
  image,
  category,
  title,
  description,
  meta,
  href,
}: {
  image?: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  href: string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]"
    >
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F5C518]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <CloudinaryArtwork src={image} alt="" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" fallbackLabel={title} />
          <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-[#0A0F1C]/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">{category}</span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl leading-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">{meta}</span>
            <ArrowUpRight size={16} className="text-white/50 transition-colors group-hover:text-[#F5C518]" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
