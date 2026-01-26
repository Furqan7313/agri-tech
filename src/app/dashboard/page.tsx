"use client";

import { useAgri } from "@/context/AgriContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ClimateRiskBar } from "@/components/dashboard/ClimateRiskBar";
import { DiseaseAlertCard } from "@/components/dashboard/DiseaseAlertCard";
import { FertilizerCard } from "@/components/dashboard/FertilizerCard";
import { IrrigationTimeline } from "@/components/dashboard/IrrigationTimeline";
import { SowingCalendar } from "@/components/dashboard/SowingCalendar";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatButton } from "@/components/chat/ChatButton";

export default function DashboardPage() {
    const { district, crop, isSelectionComplete } = useAgri();
    const router = useRouter();

    useEffect(() => {
        if (!isSelectionComplete) {
            router.push("/");
        }
    }, [isSelectionComplete, router]);

    if (!isSelectionComplete) {
        return (
            <div className="min-h-screen bg-[#F8F9F1] flex items-center justify-center">
                <div className="animate-pulse text-[#1B4332] font-heading text-xl">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9F1]">
            <DashboardHeader district={district!} crop={crop!} />

            <main className="container mx-auto px-4 py-6 lg:py-8">
                {/* Row 1: Alerts */}
                <section className="mb-8">
                    <h2 className="font-heading text-xl font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#1B4332] rounded-full"></span>
                        Risk Monitoring
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ClimateRiskBar district={district!} crop={crop!} />
                        <DiseaseAlertCard district={district!} crop={crop!} />
                    </div>
                </section>

                {/* Row 2: Actions */}
                <section className="mb-8">
                    <h2 className="font-heading text-xl font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#D4A373] rounded-full"></span>
                        Action Plan
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FertilizerCard crop={crop!} />
                        <IrrigationTimeline crop={crop!} />
                    </div>
                </section>

                {/* Row 3: Guidance */}
                <section className="mb-8">
                    <h2 className="font-heading text-xl font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#52B788] rounded-full"></span>
                        Seasonal Guidance
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
