"use client";

import { Building2, Landmark, Sprout, Wheat, Tractor, Leaf } from "lucide-react";
import { useAgri } from "@/context/AgriContext";

// Translations for TrustedBy
const TRUSTED_TEXT = {
    en: {
        trustedTitle: "Trusted by farmers & partners across Punjab",
        agricultureDept: "Agriculture",
        dept: "Dept",
        universityOf: "University of",
        agriculture: "Agriculture",
        kisan: "Kisan",
        cooperatives: "Cooperatives",
        punjabSeed: "Punjab Seed",
        corp: "Corp",
        millat: "Millat",
        tractors: "Tractors",
        narc: "Ministry of National Food Security and Research",
        islamabad: "Islamabad",
    },
    ur: {
        trustedTitle: "پنجاب بھر کے کسانوں اور شراکت داروں کا اعتماد",
        agricultureDept: "محکمہ",
        dept: "زراعت",
        universityOf: "زرعی",
        agriculture: "یونیورسٹی",
        kisan: "کسان",
        cooperatives: "کوآپریٹو",
        punjabSeed: "پنجاب سیڈ",
        corp: "کارپ",
        millat: "ملت",
        tractors: "ٹریکٹرز",
        narc: "قومی غذائی تحفظ و تحقیق",
        islamabad: "اسلام آباد",
    }
};

export function TrustedBy() {
    const { language } = useAgri();
    const t = (key: keyof typeof TRUSTED_TEXT.en) => TRUSTED_TEXT[language]?.[key] || TRUSTED_TEXT['en'][key];

    return (
        <section className="py-12 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 relative overflow-hidden border-b border-emerald-100/50 shadow-sm" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Subtle aesthetic background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500"></div>

            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm md:text-base font-bold text-emerald-800 uppercase tracking-[0.2em] font-sans">
                    {t('trustedTitle')}
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-gradient">
                {/* The Scrolling Drawer */}
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] items-center gap-16 md:gap-24">
                    {/* ORIGINAL SET */}
                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('agricultureDept')}<br />{t('dept')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Landmark className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('universityOf')}<br />{t('agriculture')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Sprout className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('kisan')}<br />{t('cooperatives')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Wheat className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('punjabSeed')}<br />{t('corp')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Tractor className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('millat')}<br />{t('tractors')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Leaf className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('narc')}<br />{t('islamabad')}</span>
                    </div>

                    {/* DUPLICATE SET FOR SCROLL */}
                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('agricultureDept')}<br />{t('dept')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Landmark className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('universityOf')}<br />{t('agriculture')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Sprout className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('kisan')}<br />{t('cooperatives')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Wheat className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('punjabSeed')}<br />{t('corp')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Tractor className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('millat')}<br />{t('tractors')}</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Leaf className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">{t('narc')}<br />{t('islamabad')}</span>
                    </div>
                </div>

                {/* Left/Right Fade Masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-emerald-50 to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-emerald-50 to-transparent z-10"></div>
            </div>
        </section>
    );
}
