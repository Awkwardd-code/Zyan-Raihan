"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (current) =>
    current.toLocaleString(undefined, { maximumFractionDigits: Number.isInteger(value) ? 0 : 1 }),
  );

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.5, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [count, inView, reducedMotion, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="font-display text-5xl tracking-tight text-white md:text-6xl">
        {prefix}<motion.span>{rounded}</motion.span>{suffix}
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">{label}</p>
    </motion.div>
  );
}
