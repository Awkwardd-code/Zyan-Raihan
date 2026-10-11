"use client";

import { BackgroundOrbit } from "@/components/layout/BackgroundOrbit";
import { DeepSeaFooter } from "@/components/layout/DeepSeaFooter";
import { MorphingHeader } from "@/components/layout/MorphingHeader";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export default function HomePage() {
  return (
    <>
      <BackgroundOrbit />
      <MorphingHeader />
      <ScrollProgressBar />
      <CustomCursor />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <DeepSeaFooter />
    </>
  );
}
