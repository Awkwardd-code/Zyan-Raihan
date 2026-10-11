"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function ProjectsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      if (response.ok) {
        const payload = await response.json();
        setItems(payload);
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Content</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#F5F5F0]">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="rounded-xl bg-[#F5C518] px-4 py-2.5 text-sm font-medium text-[#0A0F1C]">
          New project
        </Link>
      </div>

      <DataTable
        rows={items}
        columns={[
          { key: "title", label: "Title" },
          { key: "client", label: "Client" },
          { key: "category", label: "Category" },
          { key: "featured", label: "Featured", render: (value) => (value ? "Yes" : "No") },
          { key: "status", label: "Status", render: (value) => <StatusBadge value={String(value ?? "draft")} /> },
          {
            key: "_id",
            label: "Actions",
            render: (_, row) => (
              <Link href={`/admin/projects/${String(row._id)}`} className="text-[#F5C518]">
                Edit
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
