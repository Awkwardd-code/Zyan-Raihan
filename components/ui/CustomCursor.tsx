"use client";

import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const x = useSpring(position.x, { stiffness: 200, damping: 25, mass: 0.5 });
  const y = useSpring(position.y, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("[data-cursor='hover']")));
    };

    const onLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] hidden md:block" aria-hidden="true">
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.4 : 1,
          backgroundColor: hovering ? "rgba(250, 204, 21, 0.12)" : "rgba(255,255,255,0.8)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.4 }}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.3 : 1,
          borderColor: hovering ? "rgba(250, 204, 21, 0.5)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-white/60 bg-transparent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
