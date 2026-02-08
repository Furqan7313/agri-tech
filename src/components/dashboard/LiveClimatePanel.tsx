"use client";

import { CloudRain, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function LiveClimatePanel() {
    const { language, dashboardData, isDashboardLoading, refreshDashboard } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const item = dashboardData?.weather?.current;
    const profile = dashboardData?.profile;
    const location = profile ? [profile.district, profile.province].filter(Boolean).join(", ") : "";

    const handleRefresh = () => {
        refreshDashboard();
    };

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden h-full animate-pulse">
                <CardHeader className="h-16 border-b border-gray-50" />
                <CardContent className="h-48" />
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-4 pt-6 px-6 flex flex-row items-center justify-between border-b border-gray-50">
                <CardTitle className="font-heading text-lg flex items-center gap-3 text-[#1B4332]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-blue-600" />
                    </div>
                    {t('liveClimate')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={isDashboardLoading}
                        className="h-8 w-8 hover:bg-gray-50 rounded-full"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-400 ${isDashboardLoading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {item ? (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-start">
                                    <span className="text-5xl font-bold text-[#1F2937] font-heading tracking-tight">
                                        {Math.round(item.temp_c)}°
                                    </span>
                                    <span className="text-2xl text-gray-400 font-medium mt-1.5 ml-0.5">C</span>
                                </div>
                                <div className="pl-4 border-l border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">{item.condition}</p>
                                    <p className="text-xs text-gray-500">{location || "—"}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100">
                                    <CloudRain className="w-3 h-3 mr-1.5" />
                                    {item.chance_of_rain <= 20 ? t('lowRainChance') : `${item.chance_of_rain}% ${t('precip')}`}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <ClimateMetric
                                icon={<Droplets className="w-4 h-4" />}
                                label={t('humidity')}
                                value={`${item.humidity}%`}
                                color="text-blue-500"
                                bg="bg-blue-50"
                                borderColor="border-blue-100"
                            />
                            <ClimateMetric
                                icon={<Wind className="w-4 h-4" />}
                                label={t('wind')}
                                value={`${Math.round(item.wind_kph)} km/h`}
                                color="text-slate-500"
                                bg="bg-slate-50"
                                borderColor="border-slate-100"
                            />
                            <ClimateMetric
                                icon={<CloudRain className="w-4 h-4" />}
                                label={t('precip')}
                                value={`${item.chance_of_rain}%`}
                                color="text-cyan-500"
                                bg="bg-cyan-50"
                                borderColor="border-cyan-100"
                            />
                        </div>
                    </>
                ) : (
                    <div className="py-8 text-center text-gray-500 text-sm">
                        No climate data. Complete your farm setup first.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ClimateMetric({ icon, label, value, color, bg, borderColor }: { icon: React.ReactNode, label: string, value: string, color: string, bg: string, borderColor: string }) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${borderColor} ${bg} transition-transform hover:-translate-y-1 duration-200`}>
            <div className={`mb-2 ${color}`}>
                {icon}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{label}</p>
            <p className="font-heading font-bold text-gray-800 text-lg">{value}</p>
        </div>
    )
}
