import type { ReactNode } from "react";

export function Eyebrow({
  children,
  withDot = true,
  className = "",
}: {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5C518] ${className}`}>
      {withDot && <span aria-hidden="true" className="mr-2">✦</span>}
      {children}
    </p>
  );
}
