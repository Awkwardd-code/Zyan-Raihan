"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useTransform } from "motion/react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTAFooterSection() {
  const { scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 1], [26, -24]);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ y }}
      className="px-4 pb-20 pt-8 md:pb-28"
    >
      <div className="mx-auto max-w-6xl rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,219,83,0.12),_transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(17,31,48,0.85))] p-8 md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-[#ffdb53]">Ready to build</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-none tracking-[-0.05em] md:text-5xl">
              Make the next move obvious.
            </h2>
          </div>

          <Link href="mailto:hello@zaynraihan.com" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            hello@zaynraihan.com
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton className="bg-[#ffdb53] text-[#07111f] font-semibold">Start a Project</MagneticButton>
          <Link href="/about" className="rounded-full border border-white/15 bg-white/4 px-5 py-3 text-sm font-medium text-white/85">
            Learn more
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
