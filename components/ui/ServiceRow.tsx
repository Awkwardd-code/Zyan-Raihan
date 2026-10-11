"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

export function ServiceRow({
  number,
  title,
  active,
  onClick,
  description,
  deliverables = [],
  duration,
  price,
  ctaHref,
}: {
  number: string;
  title: string;
  active: boolean;
  onClick: () => void;
  description?: string;
  deliverables?: string[];
  duration?: string;
  price?: string;
  ctaHref?: string;
}) {
  return (
    <motion.article layout className="border-b border-white/[0.08] last:border-0">
      <button
        type="button"
        aria-expanded={active}
        onClick={onClick}
        className="group flex w-full items-center gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]"
      >
        <span className={`font-mono text-xs ${active ? "text-[#F5C518]" : "text-white/40"}`}>{number}</span>
        <span className={`flex-1 font-display text-2xl tracking-tight sm:text-3xl ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}>
          {title}
        </span>
        <span className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${active ? "border-[#F5C518]/40 bg-[#F5C518]/10 text-[#F5C518]" : "border-white/10 text-white/50 group-hover:border-white/25"}`}>
          <ArrowUpRight size={17} />
        </span>
      </button>
      {active && description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#101826] p-6 sm:p-8">
            <p className="max-w-xl leading-7 text-white/65">{description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {deliverables.map((item) => (
                <li key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75">
                  <Check size={12} className="text-[#F5C518]" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Timeline</p>
                <p className="mt-2 text-sm text-white/80">{duration}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Starting at</p>
                <p className="mt-2 text-sm text-white/80">{price}</p>
              </div>
            </div>
            {ctaHref && (
              <a href={ctaHref} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#F5C518] hover:text-white">
                Start a project <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
