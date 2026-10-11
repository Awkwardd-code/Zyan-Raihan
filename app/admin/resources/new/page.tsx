"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function NewResourcePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", category: "", description: "", meta: "", image: "", href: "", featured: false, status: "draft" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/resources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save resource.");
      }
      router.push("/admin/resources");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save resource.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Resources</p>
          <h1 className="mt-2 text-3xl font-semibold">Create resource</h1>
        </div>
        <Link href="/admin/resources" className="text-sm text-[#F5C518]">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0B1220]/80 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldInput label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} required />
          <FieldInput label="Slug" value={form.slug} onChange={(value) => setForm((current) => ({ ...current, slug: value }))} required />
          <FieldInput label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} />
          <FieldInput label="Meta" value={form.meta} onChange={(value) => setForm((current) => ({ ...current, meta: value }))} />
          <FieldInput label="Link" value={form.href} onChange={(value) => setForm((current) => ({ ...current, href: value }))} placeholder="https://" />
        </div>
        <FieldTextarea label="Description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} rows={5} />
        <CloudinaryUploader label="Resource image" value={form.image} onChange={(value) => setForm((current) => ({ ...current, image: value }))} folder="portfolio/resources" />
        <label className="flex items-center gap-3 text-sm text-[#F5F5F0]">
          <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
          Featured
        </label>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <FormActions loading={saving} submitLabel="Create resource" onCancel={() => router.push("/admin/resources")} />
      </form>
    </div>
  );
}
