"use client";

import { useReducedMotion as useMotionReduced } from "motion/react";

export function useReducedMotionSafe() {
  return useMotionReduced();
}
