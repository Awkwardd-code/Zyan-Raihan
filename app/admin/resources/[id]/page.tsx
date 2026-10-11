"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function EditResourcePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [routeId, setRouteId] = useState("");
  const [form, setForm] = useState({ title: "", slug: "", category: "", description: "", meta: "", image: "", href: "", featured: false, status: "draft" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { Promise.resolve(params).then((resolved) => setRouteId(resolved.id)); }, [params]);
  useEffect(() => {
    if (!routeId) return;
    async function load() {
      const response = await fetch(`/api/admin/resources/${routeId}`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json();
      setForm({
        title: payload.title ?? "",
        slug: payload.slug ?? "",
        category: payload.category ?? "",
        description: payload.description ?? "",
        meta: payload.meta ?? "",
        image: payload.image ?? "",
        href: payload.href ?? "",
        featured: Boolean(payload.featured),
        status: payload.status ?? "draft",
      });
      setLoading(false);
    }
    void load();
  }, [routeId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/resources/${routeId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to update resource.");
      }
      router.push("/admin/resources");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to update resource.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-[#F5F5F0]/70">Loading resource...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Resources</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit resource</h1>
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
        <FormActions loading={saving} submitLabel="Update resource" onCancel={() => router.push("/admin/resources")} />
      </form>
    </div>
  );
}
