"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let previousY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollDirection(currentY > previousY ? "down" : "up");
        previousY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollDirection;
}
