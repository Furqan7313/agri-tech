"use client";

import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/shared/Footer";
import { useAgri } from "@/context/AgriContext";

export default function HomePage() {
  const { language } = useAgri();

  return (
    <main className="min-h-screen bg-white" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <Hero />
      <TrustedBy />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
