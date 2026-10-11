"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
