"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = "left",
}: {
  eyebrow: string;
  heading: ReactNode;
  subtext?: string;
  align?: "left" | "center";
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-[#F5F5F0]">
        {heading}
      </h2>
      {subtext && (
        <p className={`mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
