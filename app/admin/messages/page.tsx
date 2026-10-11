"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";

export default function MessagesPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/messages", { cache: "no-store" });
      if (response.ok) {
        setItems(await response.json());
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Inbox</p>
        <h1 className="mt-2 text-3xl font-semibold">Messages</h1>
      </div>
      <DataTable rows={items} columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "read", label: "Read", render: (value) => value ? "Yes" : "No" }, { key: "_id", label: "Actions", render: (_, row) => <Link href={`/admin/messages/${String(row._id)}`} className="text-[#F5C518]">View</Link> }]} />
    </div>
  );
}
