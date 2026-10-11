"use client";

import { AnimatePresence, motion, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const serviceCards = [
  {
    id: "interactive-design-experiences",
    number: "01",
    title: "Interactive design experiences",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "motion-graphics-production",
    number: "02",
    title: "Motion graphics production",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "website-design-development",
    number: "03",
    title: "Website design development",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "digital-marketing-solutions",
    number: "04",
    title: "Digital marketing solutions",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
];

export function HelpSection() {
  const { scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = serviceCards[activeIndex] ?? serviceCards[0] ?? { id: "", title: "Service preview", image: "" };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const firstVisible = visibleEntries[0];
          if (!firstVisible) return;

          const element = firstVisible.target as HTMLDivElement | null;
          if (!element) return;

          const nextIndex = Number(element.dataset.index ?? 0);
          setActiveIndex(nextIndex);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  if (!serviceCards.length) return null;

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ y }}
      className="relative w-full py-32 md:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-8 md:px-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="relative lg:sticky lg:top-[120px] lg:h-fit">
          <div className="space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5C518]">How can I help you</p>
            <h2 className="max-w-[520px] font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-white">
              Innovative ideas and bold execution that drive measurable growth
            </h2>
          </div>

          <div className="relative mt-12 aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[var(--bg-elevated)] shadow-[0_26px_70px_rgba(0,0,0,0.14)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-mono tracking-[0.16em] text-white/80 backdrop-blur-md">
              <span className="relative inline-block h-2 w-2 rounded-full bg-[#F5C518] shadow-[0_0_10px_rgba(245,197,24,0.9)]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#F5C518]/80" />
              </span>
              LIVE PREVIEW
            </div>

            <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
              {activeService.title}
            </div>
          </div>

          <div className="mt-8 inline-flex w-full max-w-[520px] items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-3 pl-3 pr-4 backdrop-blur-xl">
            <div className="flex -space-x-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-[#0A0F1C] bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]"
                >
                  <span className="text-[8px] font-medium text-[#0A0F1C]">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2rem] text-white">Open the vault</div>
              <div className="text-xs text-white/60">190 templates · 3 new this week</div>
            </div>
            <div className="relative h-2.5 w-2.5 shrink-0 rounded-full bg-[#22C55E]">
              <span className="absolute inset-0 rounded-full bg-[#22C55E]/60 animate-ping" />
            </div>
          </div>

          <div className="mt-8 max-w-[520px] border-l-2 border-[#F5C518]/40 pl-5">
            <p className="text-sm leading-relaxed text-white/55">
              We combine forward-thinking ideas with flawless execution, ensuring every campaign, design or strategy is not only beautiful but purpose-built to move your business forward.
            </p>
          </div>

          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-[#F5C518] group"
          >
            <span>See all services</span>
            <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="space-y-0">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Services</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">{String(serviceCards.length).padStart(2, "0")} items</span>
          </div>

          {serviceCards.map((service, index) => {
            const isActive = index === activeIndex;
            const showDivider = index < serviceCards.length - 1 && !isActive && index !== activeIndex - 1;

            return (
              <motion.div
                key={service.id}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                data-index={index}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="group relative overflow-hidden border border-transparent"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                  borderColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  borderRadius: 20,
                  paddingInline: 24,
                  paddingBlock: 32,
                }}
              >
                {showDivider ? <div className="absolute bottom-0 left-6 right-6 h-px bg-white/[0.06]" /> : null}

                <div className="relative grid grid-cols-[64px_1fr_56px] items-center gap-6 py-0">
                  <div className="flex items-center justify-center">
                    {isActive ? (
                      <span className="relative font-mono text-sm tracking-[0.2em] text-[#F5C518]">
                        {service.number}
                        <span className="absolute -bottom-1 left-0 h-px w-full bg-[#F5C518]/60" />
                      </span>
                    ) : (
                      <span className="font-mono text-sm tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
                        {service.number}
                      </span>
                    )}
                  </div>

                  <span className="text-lg font-medium tracking-[-0.04em] text-white/90">{service.title}</span>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                      isActive
                        ? "rotate-[-45deg] border-transparent bg-[#F5C518] text-black"
                        : "border-white/10 text-white/40 group-hover:border-white/25 group-hover:text-white/70"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
