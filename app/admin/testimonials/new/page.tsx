"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    avatar: "",
    featured: false,
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save testimonial.");
      }

      router.push("/admin/testimonials");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Testimonials</p>
          <h1 className="mt-2 text-3xl font-semibold">Create testimonial</h1>
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
        <FormActions loading={saving} submitLabel="Create testimonial" onCancel={() => router.push("/admin/testimonials")} />
      </form>
    </div>
  );
}
