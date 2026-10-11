"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { WordCycler } from "@/components/ui/WordCycler";
import { rotatingWords } from "@/lib/data";

const heroMessage =
  "Bring me something you're trying to build. I'll think with you, create with you and help you move it forward.";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeCurve },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden pt-32 pb-24">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_20%_20%,rgba(245,197,24,0.12),transparent_20%),radial-gradient(circle_at_80%_10%,rgba(124,161,255,0.12),transparent_20%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial="hidden" animate="visible" variants={containerStagger} className="max-w-[620px]">
          <motion.div variants={itemFade} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#F5C518]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">CREATIVE GROWTH PARTNER</span>
          </motion.div>

          <motion.h1 variants={itemFade} className="mt-6 font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] text-white">
            <span className="block">YOUR</span>
            <span className="block text-[#F5C518]">
              <WordCycler words={rotatingWords} className="min-w-[220px] justify-center text-center" />
            </span>
            <span className="block">PARTNER</span>
          </motion.h1>

          <motion.p variants={itemFade} className="mt-8 max-w-md text-lg leading-relaxed text-white/65">
            I build clear systems around brands, content, and momentum so your business can look sharper, move faster, and grow with more intention.
          </motion.p>

          <motion.div variants={itemFade} className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" className="rounded-full bg-[#F5C518] px-6 py-3 font-medium text-black transition hover:scale-[1.02]">
              Start a Project
            </button>
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10">
              See My Work <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -right-2 top-10 z-20">
            <div className="relative flex h-18 w-18 items-center justify-center">
              <span className="absolute h-12 w-12 rounded-full border border-[#F5C518]/30" />
              <span className="absolute h-16 w-16 rounded-full border border-[#F5C518]/20" />
              <span className="absolute h-20 w-20 rounded-full border border-[#F5C518]/10" />
              <span className="h-3 w-3 rounded-full bg-[#F5C518] shadow-[0_0_18px_rgba(245,197,24,0.8)]" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1423] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(245,197,24,0.18),transparent_24%)]" />
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
              alt="Zayn Raihan portrait"
              width={900}
              height={1100}
              priority
              className="relative h-[620px] w-full rounded-[24px] object-cover"
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 z-20 rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(8,12,18,0.35)]">
            <div className="mb-3 flex items-center gap-2 text-[#F5C518]">
              <span className="h-2 w-2 rounded-full bg-[#F5C518]" />
              <span className="text-[10px] uppercase tracking-[0.24em]">BRANDING</span>
            </div>
            <p className="text-base leading-7 text-white/90">{heroMessage}</p>
            <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              About me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-white/8 bg-white/[0.02] py-5 backdrop-blur-sm">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap px-4 text-[11px] font-medium uppercase tracking-[0.38em] text-white/60">
          {Array.from({ length: 2 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-8">
              {[
                "GEO",
                "META ADS",
                "GOOGLE ADS",
                "LINKEDIN ADS",
                "TIKTOK ADS",
                "PINTEREST ADS",
              ].map((item) => (
                <span key={`${rowIndex}-${item}`} className="inline-flex items-center gap-8">
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
