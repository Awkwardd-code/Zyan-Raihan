"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const START_ANGLE_DEGREES = 60;
const getOrbitRadius = () => (typeof window === "undefined" ? 380 : (window.innerHeight * 38) / 100);

function TrailDot({ offset, opacity }: { offset: number; opacity: number }) {
  const { scrollYProgress } = useScroll();
  const [radius, setRadius] = useState(380);

  useEffect(() => {
    const onResize = () => setRadius(getOrbitRadius());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [START_ANGLE_DEGREES, START_ANGLE_DEGREES + 720],
  );
  const trailRotate = useTransform(rotate, (value) => value - offset);
  const x = useTransform(trailRotate, (value) => Math.cos((value * Math.PI) / 180) * radius);
  const y = useTransform(trailRotate, (value) => Math.sin((value * Math.PI) / 180) * radius);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ x, y, opacity, willChange: "transform" }}
    >
      <div className="h-2.5 w-2.5 rounded-full bg-[#FACC15]/80 shadow-[0_0_12px_rgba(250,204,21,0.5)]" />
    </motion.div>
  );
}

export function BackgroundOrbit() {
  const prefersReducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  const [radius, setRadius] = useState(380);

  useEffect(() => {
    const onResize = () => setRadius(getOrbitRadius());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [START_ANGLE_DEGREES, START_ANGLE_DEGREES + 720],
  );
  const x = useTransform(rotate, (value) => Math.cos((value * Math.PI) / 180) * radius);
  const y = useTransform(rotate, (value) => Math.sin((value * Math.PI) / 180) * radius);
  const rotatePlus90 = useTransform(rotate, (value) => value + 90);

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            x: Math.cos((START_ANGLE_DEGREES * Math.PI) / 180) * radius,
            y: Math.sin((START_ANGLE_DEGREES * Math.PI) / 180) * radius,
            rotate: START_ANGLE_DEGREES + 90,
          }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FACC15] shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <Send className="h-[60px] w-[60px]" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute left-1/2 top-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 8" />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2">
        <TrailDot offset={8} opacity={0.15} />
        <TrailDot offset={16} opacity={0.1} />
        <TrailDot offset={24} opacity={0.05} />
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ x, y, rotate: rotatePlus90, willChange: "transform" }}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#FACC15]/25 bg-[#FACC15]/10 text-[#FACC15] shadow-[0_0_30px_rgba(250,204,21,0.2)] backdrop-blur-sm">
          <Send className="h-[60px] w-[60px]" />
        </div>
      </motion.div>
    </div>
  );
}
