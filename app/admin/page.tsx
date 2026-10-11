"use client";

import { useEffect, useState } from "react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    resources: 0,
    services: 0,
    subscribers: 0,
    messages: 0,
  });

  useEffect(() => {
    async function load() {
      const endpoints = [
        ["projects", "/api/admin/projects"],
        ["testimonials", "/api/admin/testimonials"],
        ["resources", "/api/admin/resources"],
        ["services", "/api/admin/services"],
        ["subscribers", "/api/admin/subscribers"],
        ["messages", "/api/admin/messages"],
      ] as const;

      const nextStats = {
        projects: 0,
        testimonials: 0,
        resources: 0,
        services: 0,
        subscribers: 0,
        messages: 0,
      };

      for (const [key, url] of endpoints) {
        try {
          const response = await fetch(url, { cache: "no-store" });
          if (!response.ok) {
            continue;
          }

          const value = await response.json();
          nextStats[key] = Array.isArray(value) ? value.length : 0;
        } catch {
          nextStats[key] = 0;
        }
      }

      setStats(nextStats);
    }

    void load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">Overview</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#F5F5F0]">Portfolio dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard label="Projects" value={stats.projects} detail="live portfolio" />
        <AdminStatCard label="Testimonials" value={stats.testimonials} detail="client feedback" />
        <AdminStatCard label="Resources" value={stats.resources} detail="assets" />
        <AdminStatCard label="Services" value={stats.services} detail="offerings" />
        <AdminStatCard label="Subscribers" value={stats.subscribers} detail="email list" />
        <AdminStatCard label="Messages" value={stats.messages} detail="pending review" />
      </div>
    </div>
  );
}
