"use client";

import { useEffect, useState } from "react";

let cachedUser: AuthUser | null = null;
let pendingFetch: Promise<void> | null = null;
const subscribers = new Set<() => void>();

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  avatar?: { url?: string; publicId?: string } | null;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(cachedUser ?? null);
  const [loading, setLoading] = useState(cachedUser === null && pendingFetch === null);

  useEffect(() => {
    const notify = () => setUser(cachedUser ?? null);
    subscribers.add(notify);

    if (cachedUser !== null || pendingFetch) {
      return () => {
        subscribers.delete(notify);
      };
    }

    pendingFetch = fetch("/api/auth/me", { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) {
          cachedUser = null;
          return;
        }

        const data = await response.json();
        cachedUser = data.user ?? null;
      })
      .catch(() => {
        cachedUser = null;
      })
      .finally(() => {
        setUser(cachedUser ?? null);
        setLoading(false);
        subscribers.forEach((fn) => fn());
        pendingFetch = null;
      });

    return () => {
      subscribers.delete(notify);
    };
  }, []);

  const refresh = async () => {
    const response = await fetch("/api/auth/me", { credentials: "include" });
    const data = response.ok ? await response.json() : { user: null };
    cachedUser = data.user ?? null;
    subscribers.forEach((fn) => fn());
    setUser(cachedUser ?? null);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    cachedUser = null;
    subscribers.forEach((fn) => fn());
    setUser(null);
  };

  return { user, loading, refresh, logout };
}
