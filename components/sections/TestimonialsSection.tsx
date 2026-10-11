"use client";

import Image from "next/image";
import { AnimatePresence, motion, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { fallbackTestimonials } from "@/lib/data";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

export function TestimonialsSection() {
  const { scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 1], [28, -26]);
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = (await response.json()) as Testimonial[];
        if (Array.isArray(data) && data.length) setItems(data);
      } catch {
        setItems(fallbackTestimonials);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!items.length || isHovered) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items, isHovered]);

  const active = items[activeIndex] ?? fallbackTestimonials[0] ?? {
    name: "Client feedback",
    role: "Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    quote: "Thoughtful work, clear communication, and measurable momentum.",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ y }}
      className="px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.34rem] text-[#f5c518]">Testimonials</p>
          <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em] text-white">
            What clients say
          </h2>
        </motion.div>

        <div
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_40px_100px_rgba(0,0,0,0.28)] md:p-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,24,0.14),transparent_32%),radial-gradient(circle_at_80%_100%,rgba(110,168,255,0.12),transparent_30%)]" />
          <div className="absolute inset-x-[20%] top-[-28%] h-[260px] rounded-full bg-[conic-gradient(from_0deg,rgba(245,197,24,0.16),rgba(255,255,255,0.04),rgba(110,168,255,0.16),rgba(245,197,24,0.16))] blur-3xl" />

          <div className="relative z-10 flex items-center justify-end gap-2 pb-5">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:border-[#f5c518]/60 hover:bg-[#f5c518]/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:border-[#f5c518]/60 hover:bg-[#f5c518]/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 grid gap-7 md:grid-cols-[200px_1fr] md:items-center"
            >
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:h-40 md:w-40">
                <Image src={active.image} alt={active.name} width={240} height={240} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(245,197,24,0.38),transparent_28%)]" />
              </div>

              <div className="relative flex flex-col justify-center">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#f5c518]/30 bg-[#f5c518]/10 text-[#f5c518]">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="max-w-3xl text-xl font-light leading-[1.6] text-white/85 md:text-3xl md:leading-[1.45]">
                  “{active.quote}”
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-lg font-semibold text-white">{active.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.26rem] text-white/50">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 mt-8 flex items-center justify-center gap-2.5">
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`View testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className="rounded-full border border-white/10 bg-white/3 transition-all duration-300"
                style={{
                  width: index === activeIndex ? 28 : 8,
                  height: 8,
                  background: index === activeIndex ? "#f5c518" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
