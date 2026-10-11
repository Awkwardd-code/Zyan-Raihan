"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ScrollVideo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const blur = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);

  return (
    <div ref={ref} className="relative h-[420px] overflow-hidden rounded-[32px] border border-white/15 bg-[#0a1f34]">
      <motion.div
        style={{ y, scale, filter: `blur(${blur}px)` }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,219,83,0.17),_transparent_26%),linear-gradient(135deg,#0a1420,#102740_30%,#07111f)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(7,17,31,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111f] to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm tracking-[0.38rem] text-white/70 uppercase">
          Scroll story
        </div>
      </div>
    </div>
  );
}
