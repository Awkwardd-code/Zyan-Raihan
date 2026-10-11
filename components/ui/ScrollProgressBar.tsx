"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 28,
    mass: 0.5,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[200] h-[2px] origin-left bg-[#FACC15]"
      style={{ scaleX }}
    />
  );
}
