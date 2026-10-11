"use client";

import { useEffect, useState } from "react";

export function useAdminAuth() {
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetch("/api/admin/auth/me", { cache: "no-store" });

        if (!response.ok) {
          if (mounted) {
            setUser(null);
          }
          return;
        }

        const payload = await response.json();

        if (mounted) {
          setUser(payload.user ?? null);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
