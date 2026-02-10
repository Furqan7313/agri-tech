"use client";

import { useAgri } from "@/context/AgriContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Keep the useTriggerRiskAssessment hook - preserving API integration
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

// Import ORIGINAL components (with proper API integration)
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickStatsBar } from "@/components/dashboard/QuickStatsBar";
import { LiveClimatePanel } from "@/components/dashboard/LiveClimatePanel";
import { WeatherForecastCard } from "@/components/dashboard/WeatherForecastCard";
import { RiskAssessmentPanel } from "@/components/dashboard/RiskAssessmentPanel";
import { DiseasePredictionCard } from "@/components/dashboard/DiseasePredictionCard";
import { FertilizerCard } from "@/components/dashboard/FertilizerCard";
import { IrrigationTimeline } from "@/components/dashboard/IrrigationTimeline";
import { SowingCalendar } from "@/components/dashboard/SowingCalendar";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatButton } from "@/components/chat/ChatButton";
import { getTranslation } from "@/lib/i18n";

export default function DashboardPage() {
    // Preserve all context variables - no changes to data flow
    const { district, crop, isSelectionComplete, language, isLoaded, cropStage, province } = useAgri();
    const { triggerAssessment, loading: triggerLoading, error: triggerError } = useTriggerRiskAssessment();
    const router = useRouter();

    const t = (key: any) => getTranslation(language, key);

    // Proper authentication and setup check
    useEffect(() => {
        if (!isLoaded) return;

        const userId = localStorage.getItem("user_id");
        if (!userId) {
            router.push("/signup");
            return;
        }

        if (!isSelectionComplete) {
            router.push("/setup");
            return;
        }
    }, [isLoaded, isSelectionComplete, router]);

    if (!isLoaded || !isSelectionComplete) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4332]"></div>
                    <div className="text-[#1B4332] font-heading text-lg">
                        {t('loading')}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Header with navigation */}
            <DashboardHeader />

            <main className="container mx-auto px-4 py-6 lg:py-8">
                {/* Welcome Banner with filters */}
                <WelcomeBanner />

                {/* Quick Stats Bar - Location, Crop, Stage, Irrigation, Soil */}
                <QuickStatsBar />

                {/* Main Content: Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Column: Live Climate, Forecast, Fertilizer */}
                    <div className="space-y-6">
                        {/* Section Header */}
                        <h2 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#1B4332] rounded-full"></span>
                            {t('liveClimate')}
                        </h2>

                        {/* Live Climate Panel */}
                        <LiveClimatePanel />

                        {/* 7-Day Forecast */}
                        <WeatherForecastCard />

                        {/* Fertilizer Monitoring Section */}
                        <h2 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2 pt-4">
                            <span className="w-1 h-6 bg-[#D4A373] rounded-full"></span>
                            {t('FertilizerMonitoring')}
                        </h2>

                        {/* Fertilizer Panel - preserving crop and userId props */}
                        <FertilizerCard
                            crop={crop!}
                            userId={typeof window !== 'undefined' ? localStorage.getItem('user_id') || '' : ''}
                        />
                    </div>

                    {/* Right Column: Risk Assessment, Irrigation Activity */}
                    <div className="space-y-6">
                        {/* Section Header */}
                        <h2 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#E63946] rounded-full"></span>
                            {t('riskMonitoring')}
                        </h2>

                        {/* Disease Prediction (AI Image Diagnostic) */}
                        <DiseasePredictionCard />

                        {/* Risk Assessment Panel */}
                        <RiskAssessmentPanel />

                        {/* Irrigation Activity Section */}
                        <h2 className="font-heading text-lg font-bold text-[#1B4332] flex items-center gap-2 pt-4">
                            <span className="w-1 h-6 bg-[#0369A1] rounded-full"></span>
                            {t('IrrigationActivity')}
                        </h2>

                        {/* Irrigation Panel - preserving crop prop */}
                        <IrrigationTimeline crop={crop!} />
                    </div>
                </div>

                {/* Seasonal Guidance - Full Width */}
                <section className="mb-8">
                    <h2 className="font-heading text-lg font-bold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#52B788] rounded-full"></span>
                        {t('seasonalGuidance')}
                    </h2>
                    {/* Sowing Calendar - preserving crop and district props */}
                    <SowingCalendar crop={crop!} district={district!} />
                </section>
            </main>

            {/* Chat - preserving existing functionality */}
            <ChatButton />
            <ChatSidebar />
        </div>
    );
}
