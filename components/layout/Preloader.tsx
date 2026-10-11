"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const word = "ZAYN RAIHAN";

export function Preloader() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("preloaded") !== "true";
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted || !visible) return;

    const timer = window.setTimeout(() => {
      setReady(true);
      window.setTimeout(() => {
        setVisible(false);
        window.sessionStorage.setItem("preloaded", "true");
      }, 1600);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [mounted, visible]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black"
          />
          <div className="relative flex gap-1 text-center text-2xl font-black uppercase tracking-[0.7rem] text-white md:text-6xl">
            {word.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.8, filter: "blur(20px)" }}
            animate={
              ready
                ? { clipPath: "inset(0 0 0% 0)", opacity: 0, filter: "blur(0px)" }
                : { clipPath: "inset(0 0 100% 0)", opacity: 1, filter: "blur(20px)" }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-[#0b1322] via-[#0e1b31] to-black"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
