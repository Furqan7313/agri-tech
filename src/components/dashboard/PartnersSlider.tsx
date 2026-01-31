"use client";

import { Building2, Globe, Landmark, Sprout, Wheat } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { useAgri } from "@/context/AgriContext";

export function PartnersSlider() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const logos = [
        { name: "Punjab Food Authority", icon: Landmark },
        { name: "Agri Dept. Punjab", icon: Building2 },
        { name: "Ayub Research", icon: Sprout },
        { name: "Global Farmers", icon: Globe },
        { name: "Wheat Institute", icon: Wheat },
    ];

    // Duplicate for infinite scroll
    const allLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section className="py-6 bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm mb-8">
            <div className="container mx-auto px-4 mb-4">
                <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {language === 'en' ? "Our Partners" : "ہمارے شراکت دار"}
                </p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto flex overflow-hidden mask-linear-gradient">
                <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] whitespace-nowrap gap-12 md:gap-16 w-max">
                    {allLogos.map((logo, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground/80 hover:text-primary transition-colors cursor-pointer group">
                            <div className="p-1.5 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <logo.icon className="w-5 h-5" />
                            </div>
                            <span className="font-heading font-medium text-sm">{logo.name}</span>
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </section>
    );
}
