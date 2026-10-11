"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function TestimonialsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/testimonials", { cache: "no-store" });
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Social proof</p>
          <h1 className="mt-2 text-3xl font-semibold">Testimonials</h1>
        </div>
        <Link href="/admin/testimonials/new" className="rounded-xl bg-[#F5C518] px-4 py-2.5 text-sm font-medium text-[#0A0F1C]">New testimonial</Link>
      </div>

      <DataTable
        rows={items}
        columns={[
          { key: "name", label: "Name" },
          { key: "company", label: "Company" },
          { key: "status", label: "Status", render: (value) => <StatusBadge value={String(value ?? "draft")} /> },
          { key: "_id", label: "Actions", render: (_, row) => <Link href={`/admin/testimonials/${String(row._id)}`} className="text-[#F5C518]">Edit</Link> },
        ]}
      />
    </div>
  );
}
