"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function ServicesPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/services", { cache: "no-store" });
      if (response.ok) {
        setItems(await response.json());
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Offerings</p>
          <h1 className="mt-2 text-3xl font-semibold">Services</h1>
        </div>
        <Link href="/admin/services/new" className="rounded-xl bg-[#F5C518] px-4 py-2.5 text-sm font-medium text-[#0A0F1C]">New service</Link>
      </div>
      <DataTable rows={items} columns={[{ key: "title", label: "Title" }, { key: "shortDescription", label: "Summary" }, { key: "featured", label: "Featured", render: (value) => value ? "Yes" : "No" }, { key: "status", label: "Status", render: (value) => <StatusBadge value={String(value ?? "draft")} /> }, { key: "_id", label: "Actions", render: (_, row) => <Link href={`/admin/services/${String(row._id)}`} className="text-[#F5C518]">Edit</Link> }]} />
    </div>
  );
}
