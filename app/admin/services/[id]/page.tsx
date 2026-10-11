"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldInput } from "@/components/admin/FieldInput";
import { FieldTextarea } from "@/components/admin/FieldTextarea";
import { FormActions } from "@/components/admin/FormActions";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [routeId, setRouteId] = useState("");
  const [form, setForm] = useState({ title: "", shortDescription: "", description: "", icon: "", featured: false, status: "draft" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { Promise.resolve(params).then((resolved) => setRouteId(resolved.id)); }, [params]);
  useEffect(() => {
    if (!routeId) return;
    async function load() {
      const response = await fetch(`/api/admin/services/${routeId}`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json();
      setForm({
        title: payload.title ?? "",
        shortDescription: payload.shortDescription ?? "",
        description: payload.description ?? "",
        icon: payload.icon ?? "",
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
      const response = await fetch(`/api/admin/services/${routeId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to update service.");
      }
      router.push("/admin/services");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to update service.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-[#F5F5F0]/70">Loading service...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Services</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit service</h1>
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
        <FormActions loading={saving} submitLabel="Update service" onCancel={() => router.push("/admin/services")} />
      </form>
    </div>
  );
}
