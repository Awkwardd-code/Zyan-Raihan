"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const expanded = open ?? localOpen;
  const toggle = onToggle ?? (() => setLocalOpen((value) => !value));
  const answerId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      className="border-b border-white/[0.08]"
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={answerId}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] sm:text-lg"
      >
        {question}
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="shrink-0 text-white/50" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 pr-10 leading-7 text-white/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
