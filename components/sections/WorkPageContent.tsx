"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fallbackProjects } from "@/lib/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatCounter } from "@/components/ui/StatCounter";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

type Project = {
  _id?: string;
  slug: string;
  title: string;
  client?: string;
  category: string;
  year: number | string;
  thumbnail?: string;
  hero?: string;
  summary: string;
  deliverables?: string[];
  outcome?: string[];
  link?: string;
  featured?: boolean;
  accent?: string;
};

const filters = ["All", "Branding", "Content", "Web", "Ads", "Video"];

function matchesCategory(projectCategory: string, filter: string) {
  if (filter === "All") return true;
  const category = projectCategory.toLowerCase();
  const matcher: Record<string, string[]> = {
    Branding: ["brand", "identity"],
    Content: ["content", "social", "editorial"],
    Web: ["web", "shopify", "e-commerce", "website"],
    Ads: ["ads", "marketing", "campaign", "performance"],
    Video: ["video", "film", "production"],
  };
  return matcher[filter]?.some((term) => category.includes(term)) ?? false;
}

function ProjectArtwork({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [failed, setFailed] = useState(false);
  const image = featured ? project.hero || project.thumbnail : project.thumbnail;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(245,197,24,0.16),transparent_24%),linear-gradient(135deg,#183047,#0A0F1C)]">
      {image && !failed && (
        <CldImage
          src={image}
          alt={`${project.title} project artwork`}
          fill
          crop="fill"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      )}
      {(!image || failed) && (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(245,197,24,0.22),transparent_22%),radial-gradient(circle_at_80%_70%,rgba(69,141,180,0.18),transparent_28%)]" />
          <span aria-hidden="true" className="absolute bottom-4 right-5 font-display text-[clamp(5rem,12vw,12rem)] leading-none text-white/[0.06]">{project.title.slice(0, 1)}</span>
          <span aria-hidden="true" className="absolute left-7 top-7 h-20 w-20 rounded-full border border-white/10" />
          <span aria-hidden="true" className="absolute left-12 top-12 h-10 w-10 rounded-full border border-[#F5C518]/25" />
        </>
      )}
    </div>
  );
}

export function WorkPageContent() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Project request failed (${response.status})`);
        const data: unknown = await response.json();
        if (Array.isArray(data) && data.length) {
          const validProjects = data.filter(
            (item): item is Project =>
              typeof item === "object" &&
              item !== null &&
              "slug" in item &&
              typeof item.slug === "string" &&
              "title" in item &&
              typeof item.title === "string" &&
              "category" in item &&
              typeof item.category === "string" &&
              "summary" in item &&
              typeof item.summary === "string" &&
              "year" in item &&
              (typeof item.year === "number" || typeof item.year === "string"),
          );
          if (validProjects.length) setProjects(validProjects);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Unable to load projects; showing featured samples.", error);
        setProjects(fallbackProjects);
      });
    return () => controller.abort();
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesCategory(project.category, filter)),
    [filter, projects],
  );
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <main>
      <section className="relative px-6 pb-16 pt-36 md:px-16 md:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-28 h-72 w-72 rounded-full bg-[#F5C518]/[0.05] blur-[90px]" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-[1440px]">
          <Eyebrow>Selected work</Eyebrow>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] text-[#F5F5F0]">Work that moves numbers</h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-white/65">A selection of recent projects across branding, content, web, and campaigns.</p>
        </motion.div>
      </section>

      <nav aria-label="Filter projects" className="sticky top-24 z-30 mx-auto max-w-[1440px] overflow-x-auto px-6 py-4 md:px-16">
        <div className="flex w-max gap-2 rounded-full border border-white/[0.08] bg-[#0A0F1C]/80 p-2 backdrop-blur-xl">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] ${filter === item ? "bg-[#F5C518] text-[#0A0F1C]" : "text-white/55 hover:bg-white/[0.06] hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-8 md:px-16 md:pb-32">
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.slug || project._id || project.title}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] ${index % 3 === 1 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
              >
                <Link href={`/work/${encodeURIComponent(project.slug)}`} aria-label={`View ${project.title} case study`} className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F5C518]">
                  <ProjectArtwork project={project} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs text-white/80 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    View case <ArrowUpRight size={14} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5C518]">{project.category}</p>
                    <h2 className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl">{project.title}</h2>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">{project.client || project.title} · {project.year}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
          {visibleProjects.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-white/50">No projects in this category yet.</p>
          )}
        </motion.div>
      </section>

      {featured && (
        <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-16 md:py-28">
          <Link href={`/work/${encodeURIComponent(featured.slug)}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.08]">
            <ProjectArtwork project={featured} featured />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </Link>
          <div>
            <Eyebrow>Featured case</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">{featured.title}</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">{featured.summary}</p>
            <ul className="mt-6 space-y-3">
              {(featured.outcome ?? featured.deliverables ?? []).slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C518]" /> {item}
                </li>
              ))}
            </ul>
            <Link href={`/work/${encodeURIComponent(featured.slug)}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#F5C518] hover:text-white">
              Read full case study <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 border-y border-white/[0.08] px-6 py-16 md:grid-cols-4 md:px-16 md:py-20">
        <StatCounter value={40} suffix="+" label="Projects delivered" />
        <StatCounter value={12} label="Industries served" />
        <StatCounter value={3.2} suffix="x" label="Average ROAS" />
        <StatCounter value={100} suffix="%" label="Client retention" />
      </section>

      <TestimonialsSection />

      <section className="px-6 pb-28 pt-12 md:px-16">
        <GlassCard className="mx-auto max-w-[1440px] bg-[radial-gradient(circle_at_80%_0%,rgba(245,197,24,0.08),transparent_32%),#101826] p-8 md:p-14">
          <Eyebrow>Got a project in mind</Eyebrow>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">Let&apos;s add yours to the list</h2>
            <MagneticButton href="/?service=project#contact">Start a Project <ArrowRight size={15} /></MagneticButton>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}
