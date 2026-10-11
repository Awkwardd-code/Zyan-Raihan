"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [routeId, setRouteId] = useState("");
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", avatar: "", featured: false, status: "draft" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.resolve(params).then((resolved) => setRouteId(resolved.id));
  }, [params]);

  useEffect(() => {
    if (!routeId) return;
    async function load() {
      const response = await fetch(`/api/admin/testimonials/${routeId}`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json();
      setForm({
        name: payload.name ?? "",
        role: payload.role ?? "",
        company: payload.company ?? "",
        quote: payload.quote ?? "",
        avatar: payload.avatar ?? "",
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
      const response = await fetch(`/api/admin/testimonials/${routeId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to update testimonial.");
      }
      router.push("/admin/testimonials");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to update testimonial.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-[#F5F5F0]/70">Loading testimonial...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Testimonials</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit testimonial</h1>
        </div>
        <Link href="/admin/testimonials" className="text-sm text-[#F5C518]">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0B1220]/80 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldInput label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} required />
          <FieldInput label="Role" value={form.role} onChange={(value) => setForm((current) => ({ ...current, role: value }))} />
          <FieldInput label="Company" value={form.company} onChange={(value) => setForm((current) => ({ ...current, company: value }))} />
        </div>
        <FieldTextarea label="Quote" value={form.quote} onChange={(value) => setForm((current) => ({ ...current, quote: value }))} rows={5} />
        <CloudinaryUploader label="Avatar" value={form.avatar} onChange={(value) => setForm((current) => ({ ...current, avatar: value }))} folder="portfolio/testimonials" />
        <label className="flex items-center gap-3 text-sm text-[#F5F5F0]">
          <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
          Featured
        </label>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <FormActions loading={saving} submitLabel="Update testimonial" onCancel={() => router.push("/admin/testimonials")} />
      </form>
    </div>
  );
}
