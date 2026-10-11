import type { Metadata } from "next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { AboutPageContent } from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Zayn Raihan, a creative strategist building clear systems around brands, content, and momentum.",
};

export default function AboutPage() {
  return <SecondaryPageShell><AboutPageContent /></SecondaryPageShell>;
}
