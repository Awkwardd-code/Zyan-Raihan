"use client";

import { useScroll, type MotionValue } from "motion/react";
import type { RefObject } from "react";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();

  return { scrollYProgress };
}

export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return scrollYProgress;
}
