import { Hero } from "@/components/landing/Hero";
import { SelectionCard } from "@/components/landing/SelectionCard";
import { DataIntegrity } from "@/components/landing/DataIntegrity";
import { Footer } from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SelectionCard />
      <DataIntegrity />
      <Footer />
    </main>
  );
}
