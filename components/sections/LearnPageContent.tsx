"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { fallbackResources } from "@/lib/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Resource = {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  meta: string;
  image?: string;
  href: string;
  featured?: boolean;
};

const categories = ["All", "Playbooks", "Templates", "Breakdowns", "Videos"];
const topics: Array<[string, string]> = [
  ["Branding", "Playbooks"],
  ["Content", "Templates"],
  ["Ads", "Breakdowns"],
  ["Web", "Templates"],
  ["Video", "Videos"],
  ["Analytics", "Breakdowns"],
];

export function LearnPageContent() {
  const [resources, setResources] = useState<Resource[]>(fallbackResources);
  const [category, setCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [featuredImageFailed, setFeaturedImageFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/resources", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Resource request failed (${response.status})`);
        const data: unknown = await response.json();
        if (Array.isArray(data) && data.length) {
          const validResources = data.filter(
            (item): item is Resource =>
              typeof item === "object" &&
              item !== null &&
              "slug" in item &&
              typeof item.slug === "string" &&
              "title" in item &&
              typeof item.title === "string" &&
              "category" in item &&
              typeof item.category === "string" &&
              "description" in item &&
              typeof item.description === "string" &&
              "meta" in item &&
              typeof item.meta === "string" &&
              "href" in item &&
              typeof item.href === "string",
          );
          if (validResources.length) setResources(validResources);
        }
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === "AbortError") return;
        console.error("Unable to load resources; showing the curated resource list.", reason);
        setResources(fallbackResources);
      });
    return () => controller.abort();
  }, []);

  const filtered = useMemo(
    () => resources.filter((resource) => category === "All" || resource.category.toLowerCase() === category.toLowerCase()),
    [category, resources],
  );
  const featured = resources.find((resource) => resource.featured) ?? resources[0];

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to subscribe right now.");
      setStatus("success");
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "Unable to subscribe right now.");
    }
  };

  return (
    <main>
      <section className="relative flex min-h-[70vh] items-center px-6 pb-20 pt-36 md:min-h-[78vh] md:px-16 md:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-28 h-72 w-72 rounded-full bg-[#F5C518]/[0.05] blur-[90px]" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[1440px]">
          <Eyebrow>Learn</Eyebrow>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] text-[#F5F5F0]">Free playbooks, no gatekeeping</h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-white/65">Tactical guides, breakdowns, and templates pulled from real client work.</p>
          <a href="#resources" className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white">
            Browse resources <ArrowDown size={15} />
          </a>
        </motion.div>
      </section>

      {featured && (
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-16 md:py-20">
          <GlassCard hover={false} className="grid gap-8 overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,24,0.08),transparent_32%),#101826] p-0 md:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden bg-[linear-gradient(135deg,#183047,#0A0F1C)] md:min-h-[420px]">
              {featured.image && !featuredImageFailed ? (
                <CldImage
                  src={featured.image}
                  alt={`${featured.title} cover`}
                  fill
                  crop="fill"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => setFeaturedImageFailed(true)}
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[clamp(8rem,20vw,15rem)] leading-none text-white/[0.06]">90</span>
                  <span className="absolute bottom-8 left-8 font-mono text-xs uppercase tracking-[0.2em] text-[#F5C518]/70">Brand systems · Field guide</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <span className="mb-5 w-fit rounded-full bg-[#F5C518] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#0A0F1C]">New</span>
              <Eyebrow>Featured playbook</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-white">{featured.title}</h2>
              <p className="mt-5 leading-7 text-white/65">{featured.description}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{featured.meta} · Free</p>
              <a href={featured.href} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#F5C518] px-5 py-3 text-sm font-semibold text-[#0A0F1C] transition-transform hover:translate-y-[-2px]">
                Request the playbook <ArrowUpRight size={15} />
              </a>
            </div>
          </GlassCard>
        </section>
      )}

      <section id="resources" className="mx-auto max-w-[1440px] scroll-mt-36 px-6 py-20 md:px-16 md:py-28">
        <SectionHeader eyebrow="The resource library" heading="Ideas you can put to work" subtext="Practical resources for making your next decision a little clearer." />
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] ${category === item ? "border-[#F5C518] bg-[#F5C518] text-[#0A0F1C]" : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"}`}>
              {item}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.slug || resource._id || resource.title} image={resource.image} category={resource.category} title={resource.title} description={resource.description} meta={resource.meta} href={resource.href} />
          ))}
          {filtered.length === 0 && <p className="col-span-full py-10 text-center text-white/50">More resources in this category are coming soon.</p>}
        </motion.div>
      </section>

      <section className="px-6 py-16 md:px-16 md:py-24">
        <GlassCard hover={false} className="mx-auto max-w-[1440px] bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,24,0.08),transparent_36%),#101826] px-6 py-12 text-center md:px-12 md:py-16">
          <Eyebrow>Newsletter</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">One email a week. Real tactics only.</h2>
          <p className="mt-5 text-white/60">No fluff. No spam. Unsubscribe anytime.</p>
          {status === "success" ? (
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status" className="mx-auto mt-8 inline-flex items-center gap-2 text-sm text-white/80">
              <Check size={17} className="text-[#F5C518]" /> You&apos;re in. Check your inbox.
            </motion.p>
          ) : (
            <form onSubmit={subscribe} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" autoComplete="email" className="min-h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm text-white placeholder:text-white/35 focus:border-[#F5C518]/60 focus:outline-none focus:ring-2 focus:ring-[#F5C518]/20" />
              <button disabled={status === "sending"} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F5C518] px-6 text-sm font-semibold text-[#0A0F1C] transition-transform hover:translate-y-[-2px] disabled:cursor-wait disabled:opacity-70">
                {status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : null}
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          )}
          {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
        </GlassCard>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-16 md:py-28">
        <SectionHeader eyebrow="Browse by topic" heading="Find your next focus" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {topics.map(([title, linkedCategory]) => {
            const count = resources.filter((item) => item.category.toLowerCase() === linkedCategory.toLowerCase()).length;
            return (
              <button key={title} type="button" onClick={() => { setCategory(linkedCategory); document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" }); }} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left transition-colors hover:border-[#F5C518]/30 hover:bg-white/[0.05] md:p-8">
                <span className="font-display text-2xl text-white md:text-3xl">{title}</span>
                <span className="mt-5 block font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{count} resources</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-28 pt-10 md:px-16">
        <GlassCard hover={false} className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 bg-[radial-gradient(circle_at_85%_10%,rgba(245,197,24,0.08),transparent_30%),#101826] p-8 md:flex-row md:items-end md:p-12">
          <div>
            <Eyebrow>Want the full vault</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">Get access to every template + playbook</h2>
          </div>
          <MagneticButton href="mailto:hello@zaynraihan.com?subject=Resource%20vault">Open the vault <ArrowUpRight size={15} /></MagneticButton>
        </GlassCard>
      </section>
    </main>
  );
}
