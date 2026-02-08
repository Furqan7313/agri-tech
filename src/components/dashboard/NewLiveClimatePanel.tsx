"use client";

import { CloudRain, Thermometer, Wind, Droplets, RefreshCw, ExternalLink, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

// Demo data for when API is not available
const DEMO_WEATHER = {
    temp_c: 19,
    condition: "Sunny",
    humidity: 49,
    wind_kph: 6,
    chance_of_rain: 15,
};

export function NewLiveClimatePanel() {
    const { language, dashboardData, isDashboardLoading, refreshDashboard } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    // Use API data if available, otherwise use demo data
    const item = dashboardData?.weather?.current || DEMO_WEATHER;
    const profile = dashboardData?.profile;
    const location = profile ? [profile.district, profile.province].filter(Boolean).join(", ") : "Multan, Punjab";

    const handleRefresh = () => {
        refreshDashboard();
    };

    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
            <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between border-b border-gray-50">
                <CardTitle className="font-heading text-base flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <span className="text-gray-800 font-semibold block">
                            {t('liveClimate')}
                        </span>
                        <span className="text-xs text-gray-400 font-normal">
                            Real-time updates
                        </span>
                    </div>
                </CardTitle>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={isDashboardLoading}
                        className="h-8 w-8 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 text-blue-500 ${isDashboardLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => window.open(`https://www.weatherapi.com/`, '_blank')}
                        title="View detailed weather forecast"
                    >
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-5">
                        {/* Weather icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                            <Sun className="w-9 h-9 text-amber-500" />
                        </div>
                        <div>
                            <div className="flex items-baseline">
                                <span className="text-5xl font-bold text-gray-800 font-heading">
                                    {Math.round(item.temp_c)}°
                                </span>
                                <span className="text-xl text-gray-400 font-medium ml-0.5">C</span>
                            </div>
                            <div className="mt-1">
                                <p className="text-base font-medium text-gray-700">{item.condition}</p>
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    {location}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Rain badge */}
                    <div className="px-4 py-3 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2">
                            <CloudRain className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="text-blue-600 text-xs font-medium">Rain Chance</p>
                                <p className="text-blue-700 text-lg font-bold">{item.chance_of_rain}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-3">
                    <ClimateMetric
                        icon={<Droplets className="w-5 h-5" />}
                        label={t('humidity')}
                        value={`${item.humidity}%`}
                        iconBg="bg-cyan-50"
                        iconColor="text-cyan-500"
                    />
                    <ClimateMetric
                        icon={<Wind className="w-5 h-5" />}
                        label={t('wind')}
                        value={`${Math.round(item.wind_kph)} km/h`}
                        iconBg="bg-slate-50"
                        iconColor="text-slate-500"
                    />
                    <ClimateMetric
                        icon={<Sun className="w-5 h-5" />}
                        label="UV Index"
                        value="Moderate"
                        iconBg="bg-amber-50"
                        iconColor="text-amber-500"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

function ClimateMetric({ icon, label, value, iconBg, iconColor }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    iconBg: string,
    iconColor: string
}) {
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className={`mb-2 p-2 rounded-lg ${iconBg} ${iconColor}`}>
                {icon}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{label}</p>
            <p className="font-heading font-bold text-gray-700 text-lg">{value}</p>
        </div>
    )
}
