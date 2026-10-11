import type { Metadata } from "next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { WorkPageContent } from "@/components/sections/WorkPageContent";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across branding, content, web, and campaigns.",
};

export default function WorkPage() {
  return <SecondaryPageShell><WorkPageContent /></SecondaryPageShell>;
}
