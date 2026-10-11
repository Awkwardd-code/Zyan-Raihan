"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTASection() {
  const handleStartProject = () => {
    window.location.href = "mailto:hello@zaynraihan.com?subject=Start%20a%20Project";
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-4 pb-24 pt-10"
    >
      <div className="relative mx-auto flex min-h-[62vh] max-w-6xl items-center justify-center overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.18),rgba(255,255,255,0.02)_32%,rgba(10,20,32,0.96)_70%)] px-6 py-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.38)]">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.06, 0.95] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,197,24,0.22),transparent_38%)] blur-3xl"
        />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-8 top-8 h-16 w-16 rounded-full border border-[#f5c518]/25 bg-[#f5c518]/5 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 h-20 w-20 rounded-full border border-white/10 bg-white/5"
        />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5c518]/20 bg-[#f5c518]/8 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#f5c518] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Ready to build
          </div>

          <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[0.94] tracking-[-0.05em] text-white">
            Let&apos;s build something together
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65 md:text-lg">
            Your next launch, brand, or growth engine deserves clarity, craft, and momentum from day one.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              type="button"
              onClick={handleStartProject}
              data-cursor="hover"
              className="bg-[#f5c518] px-8 py-4 text-base font-medium text-[#0a0f1c] shadow-[0_20px_50px_rgba(245,197,24,0.28)] hover:bg-[#ffdb53]"
            >
              Start a Project
            </MagneticButton>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              View work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
