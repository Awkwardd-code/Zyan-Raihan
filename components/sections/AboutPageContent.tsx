"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineStep } from "@/components/ui/TimelineStep";

const story: Array<[string, string]> = [
  ["Where it started", "I began by helping small teams explain what made them different. The early work taught me that a polished surface only matters when the underlying story is clear."],
  ["What I learned", "Across brand, content, and performance work, the pattern stayed consistent: disconnected tactics create noise. A shared direction helps good creative compound."],
  ["Why I do this", "I like the moment when a complicated business becomes easy to understand—and when that clarity gives a team the confidence to move."],
  ["How I work", "I pair thoughtful discovery with focused execution. We define the problem, agree on what progress means, then make and measure the work together."],
  ["What's next", "More useful brands, more considered digital experiences, and more partnerships built on curiosity, care, and measurable progress."],
];

const values: Array<[string, string, string]> = [
  ["01", "Clarity over cleverness", "If it doesn’t communicate, it doesn’t work."],
  ["02", "Systems beat sprints", "Compound interest applies to content and code."],
  ["03", "Motion drives attention", "Alive interfaces keep humans engaged."],
];

const timeline: Array<[string, string, string]> = [
  ["2025", "Building Zayn Raihan Studio", "Bringing brand thinking, digital craft, and growth execution together."],
  ["2023", "Led growth at Northstar Studio", "Connected positioning and creative direction to a focused growth plan."],
  ["2021", "Freelance creative director", "Partnered with founders and small teams on brand and campaign work."],
  ["2019", "Started in performance marketing", "Learned to connect creative decisions with measurable outcomes."],
  ["2017", "First brand project", "Found the overlap between visual identity and a story people remember."],
];

const tools = ["Figma", "After Effects", "Premiere Pro", "CapCut", "Next.js", "React", "Tailwind", "Motion", "MongoDB", "Cloudinary", "Shopify", "WordPress", "Meta Ads", "Google Ads"];
const currentFocus: Array<[string, string]> = [
  ["Reading", "A growing stack of books on creative work and business."],
  ["Building", "Clearer digital experiences for ambitious teams."],
  ["Listening", "Long-form conversations about ideas and craft."],
];

export function AboutPageContent() {
  return (
    <main>
      <section className="mx-auto grid min-h-[78vh] max-w-[1440px] items-center gap-12 px-6 pb-20 pt-36 md:grid-cols-[1.1fr_0.9fr] md:px-16 md:pt-44">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <Eyebrow>About me</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] text-[#F5F5F0]">Hi, I&apos;m Zayn</h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-white/65">
            I build clear systems around brands, content, and momentum so your business can look sharper, move faster, and grow with more intention.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="/?service=project#contact">Start a Project <ArrowUpRight size={16} /></MagneticButton>
            <a href="/zayn-raihan-cv.txt" download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]">
              <Download size={15} /> Download CV
            </a>
          </div>
          <a href="#story" className="mt-16 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 hover:text-white/75">
            A little more about me <ArrowDown size={13} />
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101826]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,197,24,0.15),transparent_28%),linear-gradient(180deg,rgba(20,48,66,0.25),#0A0F1C)]" />
          <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80" alt="Portrait representing Zayn Raihan" fill loading="eager" sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-center" />
          <span className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-[#0A0F1C]/60 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60 backdrop-blur-md">Strategy · Design · Growth</span>
        </motion.div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-16 md:py-28">
        <div className="relative hidden md:block">
          <div className="sticky top-36">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_30%,rgba(245,197,24,0.11),transparent_24%),linear-gradient(145deg,#173149,#0A0F1C)]">
              <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80" alt="" fill sizes="40vw" className="object-cover opacity-60" />
              <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">The work is the proof</p>
                <p className="mt-2 font-display text-2xl text-white/85">Make the complex feel clear.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="The story" heading="Built around better questions" subtext="A few chapters behind the work, and the principles that keep shaping it." />
          <div className="space-y-10">
            {story.map(([title, description], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/[0.08] pt-6">
                <span className="font-mono text-xs text-[#F5C518]">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-16 md:py-28">
        <SectionHeader eyebrow="What I stand for" heading="Principles, not slogans" />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map(([number, title, copy]) => (
            <GlassCard key={number} className="min-h-64 p-8">
              <span className="font-mono text-xs text-[#F5C518]">{number}</span>
              <h3 className="mt-12 font-display text-3xl leading-tight text-white">{title}</h3>
              <p className="mt-3 leading-6 text-white/55">{copy}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <SectionHeader eyebrow="The path" heading="A few meaningful chapters" />
        <div className="relative">
          <motion.div aria-hidden="true" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-8 left-6 top-3 w-px origin-top bg-gradient-to-b from-[#F5C518]/60 via-white/10 to-transparent md:left-1/2" />
          {timeline.map(([year, title, description], index) => (
            <TimelineStep key={year} year={year} title={title} description={description} side={index % 2 ? "right" : "left"} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-16 md:py-28">
        <SectionHeader eyebrow="The toolkit" heading="What I build with" subtext="A flexible toolkit for taking an idea from first sketch to launch and learning." />
        <div className="flex flex-wrap gap-3">
          {tools.map((tool, index) => (
            <motion.span key={tool} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.4, delay: index * 0.025 }} title={`${tool} in the toolkit`} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65 transition-colors hover:border-[#F5C518]/30 hover:text-white">
              {tool}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-16 md:py-20">
        <GlassCard hover={false} className="grid gap-8 bg-[radial-gradient(circle_at_10%_0%,rgba(245,197,24,0.07),transparent_30%),#101826] p-7 md:grid-cols-2 md:p-10">
          <div>
            <Eyebrow>Currently</Eyebrow>
            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2 text-xs text-white/75">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" /> Available for work
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/55"><MapPin size={14} /> Based in Dhaka · Working worldwide</p>
          </div>
          <div className="space-y-4 self-center">
            {currentFocus.map(([label, value], index) => (
              <motion.p key={label} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.45, delay: index * 0.08 }} className="flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-2 text-white/40"><Check size={13} className="text-[#F5C518]" /> Currently {label.toLowerCase()}:</span>
                <span className="text-white/75">{value}</span>
              </motion.p>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="px-6 pb-28 pt-12 md:px-16">
        <GlassCard hover={false} className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 bg-[radial-gradient(circle_at_85%_10%,rgba(245,197,24,0.08),transparent_30%),#101826] p-8 md:flex-row md:items-end md:p-12">
          <div>
            <Eyebrow>Let&apos;s talk</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">Ready when you are</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/?service=project#contact">Start a Project <ArrowRight size={15} /></MagneticButton>
            <Link href="/?service=call#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]">
              Book a call <ArrowUpRight size={15} />
            </Link>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}
