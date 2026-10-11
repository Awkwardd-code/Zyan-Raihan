"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "border-[#F5C518] bg-[#F5C518] text-[#0A0F1C] hover:bg-[#ffdb53]",
  secondary: "border-white/15 bg-white/[0.05] text-white hover:border-white/30 hover:bg-white/[0.09]",
  ghost: "border-transparent bg-transparent text-white/75 hover:text-white",
};

export function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 32, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 240, damping: 32, mass: 0.7 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-8, Math.min(8, (event.clientX - rect.left - rect.width / 2) * 0.12)));
    y.set(Math.max(-8, Math.min(8, (event.clientY - rect.top - rect.height / 2) * 0.12)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const shared = {
    "data-cursor": "hover" as const,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileHover: reducedMotion ? undefined : { scale: 1.03 },
    whileTap: reducedMotion ? undefined : { scale: 0.98 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
    style: { x: springX, y: springY },
    className: `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1C] ${variants[variant]} ${className}`,
  };

  if (href) {
    return (
      <motion.div {...shared}>
        <Link
          href={href}
          className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]"
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...shared}
      {...props}
      type={props.type ?? "button"}
      onMouseMove={(event) => {
        handleMove(event);
        props.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        reset();
        props.onMouseLeave?.(event);
      }}
    >
      {children}
    </motion.button>
  );
}
