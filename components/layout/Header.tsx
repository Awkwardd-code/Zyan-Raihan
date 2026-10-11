"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { primaryNav } from "@/lib/data";

export function Header() {
  const direction = useScrollDirection();
  const shrunk = direction === "down";

  return (
    <motion.header
      initial={false}
      animate={{
        scale: shrunk ? 0.9 : 1,
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
      style={{ transformOrigin: "top center" }}
    >
      <div className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-white/15 bg-[rgba(7,17,31,0.58)] px-4 py-3 shadow-[0_28px_80px_rgba(2,6,20,0.35)] backdrop-blur-2xl md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f5f5f0] via-[#d9d9d4] to-[#8b8b85] text-sm font-black text-[#07111f] shadow-[0_0_18px_rgba(245,197,24,0.18)] transition-transform duration-300 hover:scale-105 md:h-12 md:w-12">
            Z
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/75 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition hover:text-white"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#f5c518]/30 bg-[#f5c518]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f5c518] md:flex">
            <span className="h-2 w-2 rounded-full bg-[#f5c518] shadow-[0_0_10px_rgba(245,197,24,0.8)]" />
            Available
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#07111f] shadow-[0_18px_40px_rgba(255,255,255,0.08)] transition-all hover:-translate-y-0.5 sm:text-sm"
            aria-label="Start a project"
          >
            <Mail className="h-4 w-4" />
            Start A Project
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
