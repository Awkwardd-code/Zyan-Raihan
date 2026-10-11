"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";

export default function SubscribersPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/subscribers", { cache: "no-store" });
      if (response.ok) {
        setItems(await response.json());
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Audience</p>
        <h1 className="mt-2 text-3xl font-semibold">Subscribers</h1>
      </div>
      <DataTable rows={items} columns={[{ key: "email", label: "Email" }, { key: "source", label: "Source" }, { key: "consent", label: "Consent", render: (value) => value ? "Opted in" : "No" }]} />
    </div>
  );
}
