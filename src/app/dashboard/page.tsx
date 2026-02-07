"use client";

import { useAgri } from "@/context/AgriContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function useTriggerRiskAssessment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const triggerAssessment = async (farmerId: string, context: any) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/dashboard/trigger-risk-assessment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(typeof window !== "undefined" && localStorage.getItem("access_token")
                            ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            : {}),
                    },
                    body: JSON.stringify({ farmer_id: farmerId, ...context }),
                }
            );
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Failed to trigger assessment");
            }
            // Optionally, refresh dashboard data here
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to trigger assessment");
        } finally {
            setLoading(false);
        }
    };

    return { triggerAssessment, loading, error };
}
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LiveClimatePanel } from "@/components/dashboard/LiveClimatePanel";
import { WeatherForecastCard } from "@/components/dashboard/WeatherForecastCard";
import { RiskAssessmentPanel } from "@/components/dashboard/RiskAssessmentPanel";
import { FarmerSnapshot } from "@/components/dashboard/FarmerSnapshot";
import { FertilizerCard } from "@/components/dashboard/FertilizerCard";
import { IrrigationTimeline } from "@/components/dashboard/IrrigationTimeline";
import { SowingCalendar } from "@/components/dashboard/SowingCalendar";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatButton } from "@/components/chat/ChatButton";
import { getTranslation } from "@/lib/i18n";

export default function DashboardPage() {
    const { district, crop, isSelectionComplete, language, isLoaded, cropStage, province } = useAgri();
    const { triggerAssessment, loading: triggerLoading, error: triggerError } = useTriggerRiskAssessment();
    const router = useRouter();

    const t = (key: any) => getTranslation(language, key);

    useEffect(() => {
        if (!isLoaded) return;

        // FAKE AUTHENTICATION FOR DEVELOPMENT
        const fakeUserId = "fake-user-123";
        if (!localStorage.getItem("user_id")) {
            localStorage.setItem("user_id", fakeUserId);
            localStorage.setItem("access_token", "fake-token-123");
        }

        // FAKE SETUP DATA
        if (!isSelectionComplete) {
            // Force update context/localstorage if missing
            // This is a bit hacky but works for bypassing setup
            if (!localStorage.getItem("district")) localStorage.setItem("district", "Lahore");
            if (!localStorage.getItem("crop")) localStorage.setItem("crop", "Wheat");
            if (!localStorage.getItem("province")) localStorage.setItem("province", "Punjab");
            if (!localStorage.getItem("cropStage")) localStorage.setItem("cropStage", "Vegetative");
            if (!localStorage.getItem("farmSize")) localStorage.setItem("farmSize", "Medium (5-25 acres)");
            if (!localStorage.getItem("irrigationType")) localStorage.setItem("irrigationType", "Canal");
            if (!localStorage.getItem("soilType")) localStorage.setItem("soilType", "Loamy");

            // We need to reload to let context pick up these changes or we can modify context directly if exposed, 
            // but reloading is safer to ensure context initializes correctly with "fake" storage.
            if (!localStorage.getItem("fake_setup_done")) {
                localStorage.setItem("fake_setup_done", "true");
                window.location.reload();
            }
        }

        const userId = localStorage.getItem("user_id");
        if (!userId) {
            router.push("/signup");
            return;
        }

        if (userId && !isSelectionComplete) {
            // If we still think selection isn't complete (e.g. context hasn't updated yet), 
            // we might redirect, but with the reload above it should handle it.
            // However, let's just log instead of redirecting to prevent loops if something is weird
            console.log("Selection might be incomplete, but bypassing for dev.");
            // router.push("/setup"); 
        }
    }, [isLoaded, isSelectionComplete, router]);


    if (!isLoaded || !isSelectionComplete) {
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

            <main className="container mx-auto px-4 py-8 lg:py-12">
                {/* Section A: Farmer Snapshot */}
                <section className="mb-10">
                    <FarmerSnapshot />
                </section>

                {/* Section B & C: Climate & Risk */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Section B: Live Climate Panel */}
                    <div className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold text-[#1B4332] flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-[#D4A373] rounded-full"></span>
                            {t('liveClimate')}
                        </h2>
                        <div className="space-y-4">
                            <LiveClimatePanel />
                            <WeatherForecastCard />
                        </div>
                    </div>

                    {/* Section C: Risk Assessment */}
                    <div className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold text-[#1B4332] flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-[#E63946] rounded-full"></span>
                            {t('riskMonitoring')}
                        </h2>
                        <RiskAssessmentPanel />
                    </div>
                </div>

                {/* Section D: Fertilizer Monitoring & Irrigation Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold text-[#1B4332] flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-[#52B788] rounded-full"></span>
                            {t('FertilizerMonitoring')}
                        </h2>
                        <FertilizerCard crop={crop!} userId={typeof window !== 'undefined' ? localStorage.getItem('user_id') || '' : ''} />
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold text-[#1B4332] flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-[#E63946] rounded-full"></span>
                            {t('IrrigationActivity')}
                        </h2>
                        <IrrigationTimeline crop={crop!} />
                    </div>
                </div>

                {/* Section E: Seasonal Guidance */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl font-bold text-[#1B4332] mb-6 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-[#1B4332] rounded-full"></span>
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
