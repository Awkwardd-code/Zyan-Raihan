"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { serviceItems } from "@/lib/data";

const serviceVisuals = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
];

export function ServicesSection() {
  const { scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 1], [24, -28]);
  const [active, setActive] = useState(0);
  const activeService = serviceItems[active] ?? serviceItems[0] ?? { title: "Brand Strategy", description: "" };
  const activeVisual = serviceVisuals[active] ?? serviceVisuals[0] ?? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";

  if (!serviceItems.length) return null;

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ y }}
      className="relative px-4 py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-5 md:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.42rem] text-[#f5c518]">
              How can I help you
            </p>
            <h2 className="mt-5 max-w-[980px] font-display text-[clamp(2.8rem,5vw,7rem)] leading-[0.9] tracking-[-0.06em] text-white">
              Innovative ideas and bold execution that move businesses forward.
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60 backdrop-blur-xl md:self-auto">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f5c518] shadow-[0_0_16px_rgba(245,197,24,0.8)]" />
            {serviceItems.length} service systems
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1523] shadow-[0_40px_100px_rgba(0,0,0,0.38)] md:min-h-[540px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.18),transparent_30%),linear-gradient(180deg,rgba(6,10,15,0.18),rgba(6,10,15,0.78))]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeVisual}
                  alt={activeService.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-14 top-12 h-44 w-44 rounded-full bg-[#f5c518]/20 blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-12 bottom-10 h-52 w-52 rounded-full bg-[#6ea8ff]/15 blur-3xl"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] border border-white/10 bg-black/30 p-4 backdrop-blur-xl md:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
                      Selected work
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                      {activeService.title}
                    </h3>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 rounded-[30px] border border-white/10 bg-white/[0.02] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-3">
            {serviceItems.map((service, index) => {
              const isActive = active === index;

              return (
                <motion.button
                  key={service.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[22px] border border-transparent bg-transparent text-left"
                  aria-pressed={isActive}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scaleX: isActive ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 origin-left bg-[linear-gradient(90deg,rgba(245,197,24,0.18),rgba(245,197,24,0.06),transparent)]"
                  />

                  <div className="relative flex items-start gap-4 px-4 py-4 md:px-5 md:py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[10px] font-medium tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-[#f5c518]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-white/85 transition-all duration-300 group-hover:text-white md:text-xl">
                          {service.title}
                        </h3>

                        <motion.span
                          animate={{ rotate: isActive ? -45 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-300 group-hover:border-[#f5c518]/80 group-hover:bg-[#f5c518] group-hover:text-black"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </motion.span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-sm leading-6 text-white/60"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}