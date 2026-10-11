import type { Metadata } from "next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { LearnPageContent } from "@/components/sections/LearnPageContent";

export const metadata: Metadata = {
  title: "Learn",
  description: "Free playbooks, practical templates, and breakdowns for better brand, content, and growth decisions.",
};

export default function LearnPage() {
  return <SecondaryPageShell><LearnPageContent /></SecondaryPageShell>;
}
