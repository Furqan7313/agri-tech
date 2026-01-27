"use client";

import { CloudRain, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function LiveClimatePanel() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    // We store the key 'justNow' initially, assuming default state logic needs upgrade for real app
    const [lastUpdated, setLastUpdated] = useState("justNow");
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLastUpdated("justNow");
            setLoading(false);
        }, 1000);
    };

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden h-full">
            <CardHeader className="pb-4 pt-6 px-6 flex flex-row items-center justify-between border-b border-gray-50">
                <CardTitle className="font-heading text-lg flex items-center gap-3 text-[#1B4332]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-blue-600" />
                    </div>
                    {t('liveClimate')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide hidden sm:inline-block">
                        {t('updated')} {t(lastUpdated)}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="h-8 w-8 hover:bg-gray-50 rounded-full"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-start">
                            <span className="text-5xl font-bold text-[#1F2937] font-heading tracking-tight">27°</span>
                            <span className="text-2xl text-gray-400 font-medium mt-1.5 ml-0.5">C</span>
                        </div>
                        <div className="pl-4 border-l border-gray-100">
                            <p className="text-sm font-medium text-gray-700">{t('sunny')}</p>
                            <p className="text-xs text-gray-500">Multan, Punjab</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100">
                            <CloudRain className="w-3 h-3 mr-1.5" />
                            {t('lowRainChance')}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <ClimateMetric
                        icon={<Droplets className="w-4 h-4" />}
                        label={t('humidity')}
                        value="68%"
                        color="text-blue-500"
                        bg="bg-blue-50"
                        borderColor="border-blue-100"
                    />
                    <ClimateMetric
                        icon={<Wind className="w-4 h-4" />}
                        label={t('wind')}
                        value="12 km/h"
                        color="text-slate-500"
                        bg="bg-slate-50"
                        borderColor="border-slate-100"
                    />
                    <ClimateMetric
                        icon={<CloudRain className="w-4 h-4" />}
                        label={t('precip')}
                        value="0mm"
                        color="text-cyan-500"
                        bg="bg-cyan-50"
                        borderColor="border-cyan-100"
                    />
                </div>
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
