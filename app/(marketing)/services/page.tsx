import type { Metadata } from "next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand strategy, content systems, digital marketing, web development, and video built for business momentum.",
};

export default function ServicesPage() {
  return <SecondaryPageShell><ServicesPageContent /></SecondaryPageShell>;
}
