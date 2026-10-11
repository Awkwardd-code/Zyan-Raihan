"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [routeId, setRouteId] = useState("");
  const [item, setItem] = useState<Record<string, unknown> | null>(null);

  useEffect(() => { Promise.resolve(params).then((resolved) => setRouteId(resolved.id)); }, [params]);

  useEffect(() => {
    if (!routeId) return;
    async function load() {
      const response = await fetch(`/api/admin/messages/${routeId}`, { cache: "no-store" });
      if (!response.ok) return;
      setItem(await response.json());
    }
    void load();
  }, [routeId]);

  if (!item) return <div className="text-sm text-[#F5F5F0]/70">Loading message...</div>;

  async function toggleRead() {
    if (!item) {
      return;
    }

    const nextState = !Boolean(item.read);
    await fetch(`/api/admin/messages/${routeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: nextState }),
    });
    setItem({ ...item, read: nextState });
  }

  async function deleteMessage() {
    if (!item) {
      return;
    }

    await fetch(`/api/admin/messages/${routeId}`, { method: "DELETE" });
    router.push("/admin/messages");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Inbox</p>
          <h1 className="mt-2 text-3xl font-semibold">Message detail</h1>
        </div>
        <Link href="/admin/messages" className="text-sm text-[#F5C518]">Back</Link>
      </div>
      <div className="rounded-3xl border border-white/10 bg-[#0B1220]/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-sm text-[#F5F5F0]/60">From</p>
            <h2 className="text-xl font-semibold">{String(item.name ?? "Unknown")}</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={toggleRead} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-[#F5F5F0]">{Boolean(item.read) ? "Mark unread" : "Mark read"}</button>
            <button type="button" onClick={deleteMessage} className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white">Delete</button>
          </div>
        </div>

        <div className="mt-4 space-y-4 text-sm text-[#F5F5F0]/80">
          <p><strong>Email:</strong> {String(item.email ?? "-")}</p>
          <p><strong>Subject:</strong> {String(item.subject ?? "-")}</p>
          <div className="rounded-xl border border-white/10 bg-[#07111f] p-4 whitespace-pre-line">{String(item.message ?? "")}</div>
        </div>
      </div>
    </div>
  );
}
