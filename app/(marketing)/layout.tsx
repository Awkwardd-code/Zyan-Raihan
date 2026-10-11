import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zayn Raihan | Creative Growth Partner",
  description:
    "Creative strategies, web experiences, digital marketing, and content systems that help businesses grow with clarity and momentum.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative overflow-x-hidden bg-[#07111f] text-white">{children}</div>;
}
