"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function WordCycler({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [words]);

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
