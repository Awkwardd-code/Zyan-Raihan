import type { ReactNode } from "react";
import { DeepSeaFooter } from "@/components/layout/DeepSeaFooter";
import { MorphingHeader } from "@/components/layout/MorphingHeader";

export function SecondaryPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MorphingHeader />
      <div className="relative z-10">{children}</div>
      <DeepSeaFooter />
    </>
  );
}
