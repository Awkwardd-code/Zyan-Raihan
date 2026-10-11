"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function NewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", shortDescription: "", description: "", icon: "", featured: false, status: "draft" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to save service.");
      }
      router.push("/admin/services");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Services</p>
          <h1 className="mt-2 text-3xl font-semibold">Create service</h1>
        </div>
        <Link href="/admin/services" className="text-sm text-[#F5C518]">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0B1220]/80 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldInput label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} required />
          <FieldInput label="Icon" value={form.icon} onChange={(value) => setForm((current) => ({ ...current, icon: value }))} />
        </div>
        <FieldTextarea label="Short description" value={form.shortDescription} onChange={(value) => setForm((current) => ({ ...current, shortDescription: value }))} rows={3} />
        <FieldTextarea label="Full description" value={form.description} onChange={(value) => setForm((current) => ({ ...current, description: value }))} rows={5} />
        <label className="flex items-center gap-3 text-sm text-[#F5F5F0]">
          <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
          Featured
        </label>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <FormActions loading={saving} submitLabel="Create service" onCancel={() => router.push("/admin/services")} />
      </form>
    </div>
  );
}
