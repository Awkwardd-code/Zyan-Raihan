import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { fallbackProjects } from "@/lib/data";
import clientPromise from "@/lib/mongodb";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CloudinaryArtwork } from "@/components/ui/CloudinaryArtwork";
import { MagneticButton } from "@/components/ui/MagneticButton";

type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string | number;
  hero?: string;
  summary: string;
  deliverables: string[];
  outcome: string[];
  link?: string;
};

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const fallback = fallbackProjects.find((project) => project.slug === slug);
  let record: Record<string, unknown> | null = null;

  if (clientPromise) {
    try {
      const client = await clientPromise;
      record = await client.db(process.env.MONGODB_DB || "portfolio")
        .collection("projects")
        .findOne({ slug });
    } catch (error) {
      console.error(`Unable to fetch case study "${slug}":`, error);
    }
  }

  if (record && typeof record.slug === "string" && typeof record.title === "string" && typeof record.summary === "string") {
    return {
      slug: record.slug,
      title: record.title,
      client: typeof record.client === "string" ? record.client : record.title,
      category: typeof record.category === "string" ? record.category : "Selected work",
      year: typeof record.year === "string" || typeof record.year === "number" ? record.year : "",
      hero: typeof record.hero === "string" ? record.hero : typeof record.thumbnail === "string" ? record.thumbnail : undefined,
      summary: record.summary,
      deliverables: strings(record.deliverables),
      outcome: strings(record.outcome),
      link: typeof record.link === "string" ? record.link : undefined,
    };
  }

  if (!fallback) return null;
  return {
    ...fallback,
    client: fallback.client ?? fallback.title,
    deliverables: fallback.deliverables ?? [],
    outcome: fallback.outcome ?? [],
  };
}

export const metadata: Metadata = {
  title: "Case Study",
  description: "A selected project by Zayn Raihan.",
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getCaseStudy(slug);
  if (!project) notFound();

  return (
    <SecondaryPageShell>
    <main className="mx-auto max-w-[1440px] px-6 pb-28 pt-36 md:px-16 md:pt-44">
      <Link href="/work" className="mb-12 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
        <ArrowLeft size={15} /> All work
      </Link>
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <Eyebrow>{project.category} · {project.year}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.04em] text-white">{project.title}</h1>
        </div>
        <p className="max-w-xl leading-7 text-white/65">{project.summary}</p>
      </div>
      <div className="group relative mt-12 aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.08]">
        <CloudinaryArtwork src={project.hero} alt={`${project.title} case study`} sizes="(max-width: 768px) 100vw, 90vw" className="object-cover" fallbackLabel={project.title} />
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <Eyebrow>Project snapshot</Eyebrow>
          <p className="mt-4 text-xl text-white">{project.client}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40">{project.category} · {project.year}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-[#F5C518] hover:text-white">
              Visit project <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-white">What we made</h2>
            <ul className="mt-4 space-y-3">
              {project.deliverables.map((item) => <li key={item} className="text-sm text-white/60">{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-white">What changed</h2>
            <ul className="mt-4 space-y-3">
              {project.outcome.map((item) => <li key={item} className="text-sm text-white/60">{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-20 rounded-3xl border border-white/[0.08] bg-[#101826] p-8 md:p-12">
        <Eyebrow>Have a similar challenge?</Eyebrow>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-display text-4xl text-white md:text-5xl">Let&apos;s make the next move together.</h2>
          <MagneticButton href="/?service=project#contact">Start a Project <ArrowUpRight size={15} /></MagneticButton>
        </div>
      </div>
    </main>
    </SecondaryPageShell>
  );
}
