"use client";

import { useEffect, useState } from "react";

export function TypingText({
  text,
  className = "",
  speed = 30,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(timer);
        }
      }, speed);

      return () => window.clearInterval(timer);
    }, startDelay);

    return () => window.clearTimeout(startTimer);
  }, [speed, startDelay, text]);

  return <span className={className}>{visibleText}</span>;
}
