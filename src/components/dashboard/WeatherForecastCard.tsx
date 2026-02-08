"use client";

import { CloudRain, Sun, Cloud, CloudLightning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function WeatherForecastCard() {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const weekly = dashboardData?.weather?.weekly || [];

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden animate-pulse min-h-[120px]" />
        );
    }

    if (!weekly.length) {
        return (
            <Card className="border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="pb-2 pt-4 px-6 border-b border-gray-50">
                    <CardTitle className="font-heading text-sm font-semibold text-[#1B4332] flex items-center gap-2">
                        <Sun className="w-4 h-4 text-amber-500" />
                        7-Day Forecast
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center text-gray-500 text-xs">
                    No forecast data available for this location.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-2 pt-4 px-6 border-b border-gray-50">
                <CardTitle className="font-heading text-sm font-semibold text-[#1B4332] flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    7-Day Forecast
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide">
                    {weekly.map((day: any, idx: number) => {
                        const date = new Date(day.date);
                        const dayName = date.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'short' });

                        return (
                            <div key={idx} className="flex flex-col items-center min-w-[60px] p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2">
                                    {dayName}
                                </span>
                                <div className="mb-2">
                                    {day.rain_mm > 5 ? (
                                        <CloudLightning className="w-5 h-5 text-blue-500" />
                                    ) : day.rain_mm > 0 ? (
                                        <CloudRain className="w-5 h-5 text-blue-400" />
                                    ) : (
                                        <Sun className="w-5 h-5 text-amber-400" />
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-bold text-gray-800">{Math.round(day.temp_max)}°</span>
                                    <span className="text-[10px] text-gray-400">{Math.round(day.temp_min)}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
