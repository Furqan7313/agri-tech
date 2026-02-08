"use client";

import { MapPin, Wheat, Sprout, Droplet, Mountain } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function QuickStatsBar() {
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

    const profile = dashboardData?.profile || {};

    if (isDashboardLoading && !dashboardData) {
        return (
            <div className="bg-white rounded-xl p-4 mb-6 animate-pulse h-20 border border-gray-100 shadow-sm" />
        );
    }

    const stats = [
        {
            icon: MapPin,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            label: t('location'),
            value: `${district || profile.district || "Multan"}, ${(province || profile.province || "Punjab")?.substring(0, 3)}`,
        },
        {
            icon: Wheat,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            label: t('crop'),
            value: crop || profile.crop || "Wheat",
        },
        {
            icon: Sprout,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
            label: t('stage'),
            value: cropStage || profile.stage || "Flowering",
        },
        {
            icon: Droplet,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            label: t('irrigation_type'),
            value: irrigation_type || profile.irrigation_type || "Canal",
        },
        {
            icon: Mountain,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-600",
            label: t('soil_type'),
            value: soil_type || profile.soil_type || "Sandy",
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-100 mb-6 shadow-sm overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

            <div className="flex flex-wrap items-stretch divide-x divide-gray-100">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="flex-1 min-w-[160px] flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className={`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">
                                {stat.label}
                            </p>
                            <p className="font-heading font-bold text-gray-800 text-sm truncate">
                                {stat.value}
                            </p>
                        </div>

                        {/* Live indicator for first item */}
                        {index === 0 && (
                            <div className="flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
