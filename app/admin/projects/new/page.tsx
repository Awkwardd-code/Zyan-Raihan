"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTags } from "@/components/admin/FieldTags";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

const initialState = {
  title: "",
  slug: "",
  client: "",
  category: "",
  year: new Date().getFullYear(),
  summary: "",
  thumbnail: "",
  hero: "",
  deliverables: [] as string[],
  outcome: [] as string[],
  link: "",
  featured: false,
  status: "draft",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save project.");
      }

      router.push("/admin/projects");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#F5F5F0]">Create project</h1>
        </div>
        <Link href="/admin/projects" className="text-sm text-[#F5C518]">Back</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0B1220]/80 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldInput label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} required />
          <FieldInput label="Slug" value={form.slug} onChange={(value) => setForm((current) => ({ ...current, slug: value }))} required />
          <FieldInput label="Client" value={form.client} onChange={(value) => setForm((current) => ({ ...current, client: value }))} />
          <FieldInput label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} />
          <FieldInput label="Year" type="number" value={String(form.year)} onChange={(value) => setForm((current) => ({ ...current, year: Number(value) || new Date().getFullYear() }))} />
          <FieldInput label="External link" value={form.link} onChange={(value) => setForm((current) => ({ ...current, link: value }))} placeholder="https://" />
        </div>

        <FieldTextarea label="Summary" value={form.summary} onChange={(value) => setForm((current) => ({ ...current, summary: value }))} rows={5} />
        <FieldTags label="Deliverables" value={form.deliverables} onChange={(value) => setForm((current) => ({ ...current, deliverables: value }))} />
        <FieldTags label="Outcomes" value={form.outcome} onChange={(value) => setForm((current) => ({ ...current, outcome: value }))} />

        <div className="grid gap-4 md:grid-cols-2">
          <CloudinaryUploader label="Thumbnail" value={form.thumbnail} onChange={(value) => setForm((current) => ({ ...current, thumbnail: value }))} folder="portfolio/projects" />
          <CloudinaryUploader label="Hero image" value={form.hero} onChange={(value) => setForm((current) => ({ ...current, hero: value }))} folder="portfolio/hero" />
        </div>

        <label className="flex items-center gap-3 text-sm text-[#F5F5F0]">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
            className="h-4 w-4 border-white/10 bg-[#07111f]"
          />
          Featured project
        </label>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <FormActions loading={saving} submitLabel="Create project" onCancel={() => router.push("/admin/projects")} />
      </form>
    </div>
  );
}
