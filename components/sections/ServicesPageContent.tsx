"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Compass, Film, Megaphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BackgroundOrbit } from "@/components/layout/BackgroundOrbit";
import { FAQItem } from "@/components/ui/FAQItem";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceRow } from "@/components/ui/ServiceRow";

const services: {
  title: string;
  icon: LucideIcon;
  short: string;
  deliverables: string[];
  duration: string;
  price: string;
}[] = [
  {
    title: "Personal Branding",
    icon: Sparkles,
    short: "Positioning, voice, and visual identity that make you impossible to ignore.",
    deliverables: ["Brand strategy", "Visual identity", "Voice & tone", "Asset library"],
    duration: "2–4 weeks",
    price: "$2,500",
  },
  {
    title: "Business Strategy & Content",
    icon: Compass,
    short: "Systems that turn scattered ideas into compounding content engines.",
    deliverables: ["Content pillars", "Calendar", "Repurposing system", "Analytics"],
    duration: "3–6 weeks",
    price: "$3,200",
  },
  {
    title: "Digital Marketing Solutions",
    icon: Megaphone,
    short: "Paid and organic campaigns that scale predictably across every channel.",
    deliverables: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads"],
    duration: "Ongoing retainer",
    price: "$1,800/mo",
  },
  {
    title: "Web Development",
    icon: Code2,
    short: "Fast, conversion-focused sites on Shopify and WordPress.",
    deliverables: ["Design → Build", "Shopify", "WordPress", "SEO-ready"],
    duration: "4–8 weeks",
    price: "$4,500",
  },
  {
    title: "Video Editing",
    icon: Film,
    short: "Edits that hold attention — from short-form reels to long-form storytelling.",
    deliverables: ["Premiere Pro", "After Effects", "CapCut", "Motion graphics"],
    duration: "Per project",
    price: "$800",
  },
];

const process: Array<[string, string, string]> = [
  ["01", "Discover", "Deep dive into your business, market, and goals."],
  ["02", "Define", "Strategy, roadmap, and success metrics locked in."],
  ["03", "Build", "Execution across design, content, campaigns, or code."],
  ["04", "Compound", "Iterate, measure, and scale what works."],
];

const faqs: Array<[string, string]> = [
  ["What's your typical turnaround?", "Most focused projects take two to eight weeks. We agree on scope, milestones, and review windows before work begins."],
  ["Do you work with teams or solo founders?", "Both. The process adapts to your decision-making setup, from a founder-led business to a collaborative marketing team."],
  ["What's included in a retainer?", "A shared roadmap, ongoing execution, regular reviews, and clear reporting on the work and outcomes that matter."],
  ["Can I hire you for just one project?", "Absolutely. Project engagements are scoped around one outcome and a defined timeline."],
  ["How do we communicate during a project?", "We set one primary communication channel, keep feedback in shared documents, and schedule concise check-ins at key milestones."],
  ["What if I'm not happy with the result?", "We build in review rounds and align on success criteria early. If something misses the brief, we address it against those agreed goals."],
];

const engagements = [
  { title: "Project", description: "One deliverable, one timeline", price: "from $2,500", term: "2–8 weeks", href: "/?service=project#contact", button: "Start a Project" },
  { title: "Retainer", description: "Ongoing execution and iteration", price: "from $3,500/mo", term: "3-month minimum", href: "/?service=retainer#contact", button: "Book a call", popular: true },
  { title: "Advisory", description: "Strategy sessions, no execution", price: "$500/session", term: "90 minutes", href: "/?service=advisory#contact", button: "Book a session" },
];

export function ServicesPageContent() {
  const reducedMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const serviceRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = Number((visible.target as HTMLElement).dataset.serviceIndex);
          if (Number.isInteger(index)) setActiveService(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    serviceRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToService = (index: number) => {
    setActiveService(index);
    serviceRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "center",
    });
  };

  return (
    <main className="relative overflow-hidden">
      <BackgroundOrbit />
      <section className="relative flex min-h-[85vh] items-center px-6 pb-20 pt-36 md:min-h-screen md:px-16 md:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-[#F5C518]/[0.06] blur-[100px]" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 }}
          className="relative z-10 mx-auto w-full max-w-[1440px]"
        >
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.18em] text-[#F5C518]">✦ What I do</motion.p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.08 }} className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] text-[#F5F5F0]">
            Services built for momentum
          </motion.h1>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.16 }} className="mt-7 max-w-2xl text-lg leading-[1.6] text-white/65">
            From strategy to execution — every service is designed to move your business forward, not just look good.
          </motion.p>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.24 }} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="/?service=project#contact">Start a Project <ArrowUpRight size={16} /></MagneticButton>
            <MagneticButton href="/work" variant="secondary">See My Work <ArrowRight size={16} /></MagneticButton>
          </motion.div>
          <a href="#capabilities" className="mt-20 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 hover:text-white/75">
            Explore capabilities <ArrowDown size={13} />
          </a>
        </motion.div>
      </section>

      <section id="capabilities" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-16 md:py-32">
        <div className="self-start md:sticky md:top-36">
          <SectionHeader eyebrow="Capabilities" heading="What I bring to the table" subtext="The right mix of strategy and hands-on craft, shaped around the outcome you need." />
          <div className="hidden space-y-3 md:block">
            {services[activeService] && (() => {
              const ActiveIcon = services[activeService].icon;
              return (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F5C518]/20 bg-[#F5C518]/[0.06] text-[#F5C518]"><ActiveIcon size={19} /></div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">What&apos;s included</p>
                  <p className="max-w-xs text-sm leading-6 text-white/60">{services[activeService].short}</p>
                </>
              );
            })()}
          </div>
        </div>
        <div>
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(element) => { serviceRefs.current[index] = element; }}
              data-service-index={index}
              className="scroll-mt-40"
            >
              <ServiceRow
                number={`0${index + 1}`}
                title={service.title}
                active={activeService === index}
                onClick={() => scrollToService(index)}
                description={service.short}
                deliverables={service.deliverables}
                duration={service.duration}
                price={service.price}
                ctaHref={`/?service=${encodeURIComponent(service.title.toLowerCase().replaceAll(" ", "-"))}#contact`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-16 md:py-32">
        <SectionHeader eyebrow="How it works" heading="A system, not a scramble" subtext="A clear path from the first conversation to work that keeps improving." />
        <div className="relative grid gap-8 md:grid-cols-4">
          <svg aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-1 w-full md:block" viewBox="0 0 1000 4" preserveAspectRatio="none">
            <motion.path d="M0 2H1000" stroke="rgba(245,197,24,0.5)" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: reducedMotion ? 0.15 : 1.2, ease: [0.22, 1, 0.36, 1] }} />
          </svg>
          {process.map(([number, title, description]) => (
            <motion.article key={number} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative pt-1 md:pt-12">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-[#F5C518]/30 bg-[#0A0F1C] font-mono text-xs text-[#F5C518]">{number}</span>
              <h3 className="mt-5 font-display text-2xl text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-16 md:py-32">
        <SectionHeader eyebrow="Engagements" heading="Three ways to work together" subtext="Choose the level of support that fits where you are right now." />
        <div className="grid gap-5 lg:grid-cols-3">
          {engagements.map((item) => (
            <GlassCard key={item.title} className={`relative flex min-h-[350px] flex-col p-8 ${item.popular ? "border-[#F5C518]/40 bg-[#101826] lg:scale-[1.02]" : ""}`}>
              {item.popular && <span className="absolute right-6 top-6 rounded-full bg-[#F5C518] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#0A0F1C]">Most popular</span>}
              <h3 className="font-display text-3xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-white/55">{item.description}</p>
              <p className="mt-10 font-display text-4xl tracking-tight text-white">{item.price}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{item.term}</p>
              <div className="mt-auto pt-8">
                <MagneticButton href={item.href} variant={item.popular ? "primary" : "secondary"} className="w-full">{item.button} <ArrowRight size={15} /></MagneticButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <SectionHeader eyebrow="Questions" heading="Things you might be wondering" />
        <div>
          {faqs.map(([question, answer], index) => (
            <FAQItem key={question} question={question} answer={answer} open={activeFaq === index} onToggle={() => setActiveFaq(activeFaq === index ? null : index)} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 pt-12 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101826] px-7 py-16 text-center md:px-16 md:py-24"
        >
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-[#F5C518]/[0.07] blur-[90px]" />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5C518]">✦ Ready to build</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">Let&apos;s map out your next move</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/?service=project#contact">Start a Project <ArrowUpRight size={16} /></MagneticButton>
              <MagneticButton href="/work" variant="secondary">See My Work <ArrowRight size={16} /></MagneticButton>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
