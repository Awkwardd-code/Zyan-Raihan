"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function RadarSignal() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex h-52 w-52 items-center justify-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 rounded-full border border-[#ffdb53]/40 bg-[#ffdb53]/8" />
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className="radar-ring absolute h-full w-full rounded-full border border-[#ffdb53]/55"
          style={{ transform: `scale(${1 + index * 0.16})` }}
        />
      ))}
      <div className="absolute h-28 w-28 rounded-full border border-white/15 bg-[#0d1728]/80 shadow-[0_0_24px_rgba(255,219,83,0.15)]" />
      <div className="absolute h-10 w-10 rounded-full bg-[#ffdb53] shadow-[0_0_34px_rgba(255,219,83,0.7)]" />

      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.a
            key="cta"
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.26rem] text-white"
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        ) : (
          <motion.div
            key="radar-label"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute text-[10px] font-medium uppercase tracking-[0.34rem] text-[#ffdb53]"
          >
            radar
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
