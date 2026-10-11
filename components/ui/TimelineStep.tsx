"use client";

import { motion } from "motion/react";

export function TimelineStep({
  year,
  title,
  description,
  side = "left",
}: {
  year: string;
  title: string;
  description: string;
  side?: "left" | "right";
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid grid-cols-[3.5rem_1fr] gap-4 md:block md:w-1/2 ${side === "right" ? "md:ml-auto" : "md:mr-auto"}`}
    >
      <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border border-[#F5C518]/25 bg-[#0A0F1C] font-mono text-xs text-[#F5C518] md:absolute md:top-0 ${side === "right" ? "md:-left-6" : "md:-right-6"}`}>
        {year}
      </span>
      <div className={`pb-10 md:pb-5 ${side === "right" ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{year}</p>
        <h3 className="mt-2 font-display text-2xl text-white">{title}</h3>
        <p className="mt-2 leading-7 text-white/60">{description}</p>
      </div>
    </motion.article>
  );
}
