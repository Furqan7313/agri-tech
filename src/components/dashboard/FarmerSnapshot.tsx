"use client";

import { MapPin, Sprout, Wheat, Droplet } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslation } from "@/lib/i18n";
import { RiskGauge } from "./visuals/RiskGauge";

export function FarmerSnapshot() {
    const {
        district,
        province,
        crop,
        cropStage,
        language,
        irrigation_type,
        soil_type,
        dashboardData,
        isDashboardLoading,
    } = useAgri();

    const t = (key: any) => getTranslation(language, key);

    // If data exists in dashboardData, it means it's synced with profile
    const profile = dashboardData?.profile || {};

    // Calculate a mock health score based on risks
    const calculateHealthScore = () => {
        if (!dashboardData?.risk?.assessments) return 100;
        const weights = { HIGH: 30, MEDIUM: 15, LOW: 5 };
        const totalPenalty = dashboardData.risk.assessments.reduce((acc: number, r: any) => acc + (weights[r.level as keyof typeof weights] || 0), 0);
        return Math.max(0, 100 - totalPenalty);
    };

    const healthScore = calculateHealthScore();

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-[#DCFCE7] bg-[#F0FDF4] shadow-sm mb-6 rounded-2xl animate-pulse h-24" />
        );
    }

    return (
        <Card className="border-gray-100 bg-white shadow-sm mb-8 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-stretch">

                    {/* Left: Metadata Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gray-50 bg-white">
                        {/* Location */}
                        <div className="p-4 md:p-6 flex flex-col justify-center gap-1 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-2 text-green-700/70 mb-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('location')}</span>
                            </div>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-base leading-tight">
                                {district || profile.district || t('unknown')}, {province?.substring(0, 3) || profile.province?.substring(0, 3) || "PB"}
                            </p>
                        </div>

                        {/* Crop */}
                        <div className="p-4 md:p-6 flex flex-col justify-center gap-1 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-2 text-amber-600/70 mb-1">
                                <Wheat className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('crop')}</span>
                            </div>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-base leading-tight">
                                {crop || profile.crop || "Wheat"}
                            </p>
                        </div>

                        {/* Stage */}
                        <div className="p-4 md:p-6 flex flex-col justify-center gap-1 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-2 text-green-600/70 mb-1">
                                <Sprout className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('stage')}</span>
                            </div>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-base leading-tight">
                                {cropStage || profile.stage || "Vegetative"}
                            </p>
                        </div>

                        {/* Irrigation */}
                        <div className="p-4 md:p-6 flex flex-col justify-center gap-1 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-2 text-blue-600/70 mb-1">
                                <Droplet className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('irrigation_type')}</span>
                            </div>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-base leading-tight">
                                {irrigation_type || profile.irrigation_type || "Canal"}
                            </p>
                        </div>

                        {/* Soil */}
                        <div className="p-4 md:p-6 flex flex-col justify-center gap-1 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-2 text-yellow-600/70 mb-1">
                                <Sprout className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('soil_type')}</span>
                            </div>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-base leading-tight">
                                {soil_type || profile.soil_type || "Loam"}
                            </p>
                        </div>
                    </div>

                    {/* Right: Health Center (USP HIGHLIGHT) */}
                    <div className="w-full lg:w-48 bg-[#F0FDF4] p-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-green-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
                        <RiskGauge score={healthScore} size={80} />
                        <div className="mt-1 text-center">
                            <div className={`text-[10px] font-bold uppercase tracking-tighter ${healthScore > 70 ? 'text-green-700' : 'text-amber-700'}`}>
                                {healthScore > 80 ? 'Optimal' : healthScore > 50 ? 'Stable' : 'Unstable'}
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
