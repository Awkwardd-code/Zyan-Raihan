"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-white/10 bg-[#0B1220]/90 p-4 backdrop-blur xl:w-72 xl:border-b-0 xl:border-r">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C518] text-sm font-bold text-[#0A0F1C]">
          Z
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#F5F5F0]/60">Portfolio</p>
          <h1 className="text-lg font-semibold text-[#F5F5F0]">Admin</h1>
        </div>
      </div>

      <nav className="flex flex-col gap-2 xl:mt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2 text-sm transition ${
                isActive ? "bg-[#F5C518] text-[#0A0F1C]" : "text-[#F5F5F0]/80 hover:bg-white/5 hover:text-[#F5F5F0]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
