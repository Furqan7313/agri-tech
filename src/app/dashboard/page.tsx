"use client";

import { useAgri } from "@/context/AgriContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LiveClimatePanel } from "@/components/dashboard/LiveClimatePanel";
import { RiskAssessmentPanel } from "@/components/dashboard/RiskAssessmentPanel";
import { FarmerSnapshot } from "@/components/dashboard/FarmerSnapshot";
import { FertilizerCard } from "@/components/dashboard/FertilizerCard";
import { IrrigationTimeline } from "@/components/dashboard/IrrigationTimeline";
import { SowingCalendar } from "@/components/dashboard/SowingCalendar";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatButton } from "@/components/chat/ChatButton";
import { getTranslation } from "@/lib/i18n";

export default function DashboardPage() {
    const { district, crop, isSelectionComplete, language } = useAgri();
    const router = useRouter();

    const t = (key: any) => getTranslation(language, key);

    useEffect(() => {
        // If loaded and not complete, redirect to setup
        // We check against explicit false to avoid redirecting during loading state (if isSelectionComplete is false during load)
        // But isSelectionComplete is (isLoaded && ...). So if not loaded, it is false.
        // We should wait until loaded.
        // For MVP, we'll assume if it's not complete after mount, we redirect.
        // But since we use "isLoaded" inside context, we can't easily access "isLoaded" here unless we expose it.
        // However, checking for district/crop nullity is enough.

        // Actually, if we are here, we might be loading.
        // We can just show loading state until we are sure.
    }, [isSelectionComplete, router]);

    // Better redirection logic handled in render or a separate effect with a timeout or an exposed isLoaded flag.
    // Given the context implementation: 
    // const isSelectionComplete = isLoaded && ...
    // So if isSelectionComplete is false, it might be loading OR it might be missing data.
    // We should probably expose `isLoaded` from context to be precise.
    // For now, I'll rely on the existing "Loading" UI if !isSelectionComplete, but add a timeout or check localStorage directly if needed.
    // Or just trust the flow. If user lands here, they expect to see dashboard or be redirected.

    // Simplest MVP hack: only redirect if we are SURE it's empty.
    // But since context runs on client, it will be null initially.
    // Let's just show Loading... until it hydrates.

    // We can check if localStorage is empty to redirect immediately.
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasData = localStorage.getItem('district');
            if (!hasData) {
                router.push("/setup");
            }
        }
    }, [router]);


    if (!isSelectionComplete) {
        return (
            <div className="min-h-screen bg-[#F8F9F1] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4332]"></div>
                    <div className="animate-pulse text-[#1B4332] font-heading text-xl">
                        {t('loading')}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9F1]">
            <DashboardHeader />

            <main className="container mx-auto px-4 py-6 lg:py-8">
                {/* Section A: Farmer Snapshot */}
                <FarmerSnapshot />

                {/* Section B & C: Climate & Risk */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Section B: Live Climate Panel */}
                    <div className="space-y-4">
                        <h2 className="font-heading text-xl font-semibold text-[#1B4332] flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#D4A373] rounded-full"></span>
                            {t('liveClimate')}
                        </h2>
                        <LiveClimatePanel />
                    </div>

                    {/* Section C: Risk Assessment */}
                    <div className="space-y-4">
                        <h2 className="font-heading text-xl font-semibold text-[#1B4332] flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#E63946] rounded-full"></span>
                            {t('riskMonitoring')}
                        </h2>
                        <RiskAssessmentPanel />
                    </div>
                </div>

                {/* Legacy Sections: Action Plan & Guidance */}
                <section className="mb-8">
                    <h2 className="font-heading text-xl font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#52B788] rounded-full"></span>
                        {t('actionPlan')}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FertilizerCard crop={crop!} />
                        <IrrigationTimeline crop={crop!} />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="font-heading text-xl font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#1B4332] rounded-full"></span>
                        {t('seasonalGuidance')}
                    </h2>
                    <SowingCalendar crop={crop!} district={district!} />
                </section>
            </main>

            {/* Chat */}
            <ChatButton />
            <ChatSidebar />
        </div>
    );
}
