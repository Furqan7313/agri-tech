"use client";

import { CloudRain, Sun, Cloud, CloudLightning, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

// Demo 7-day forecast data
const DEMO_FORECAST = [
    { date: new Date().toISOString(), temp_max: 27, temp_min: 12, rain_mm: 0, condition: "sunny" },
    { date: new Date(Date.now() + 86400000).toISOString(), temp_max: 28, temp_min: 13, rain_mm: 0, condition: "sunny" },
    { date: new Date(Date.now() + 86400000 * 2).toISOString(), temp_max: 25, temp_min: 12, rain_mm: 0.2, condition: "cloudy" },
    { date: new Date(Date.now() + 86400000 * 3).toISOString(), temp_max: 24, temp_min: 11, rain_mm: 5, condition: "rain" },
    { date: new Date(Date.now() + 86400000 * 4).toISOString(), temp_max: 25, temp_min: 12, rain_mm: 0, condition: "sunny" },
    { date: new Date(Date.now() + 86400000 * 5).toISOString(), temp_max: 26, temp_min: 13, rain_mm: 2, condition: "cloudy" },
    { date: new Date(Date.now() + 86400000 * 6).toISOString(), temp_max: 27, temp_min: 14, rain_mm: 0, condition: "sunny" },
];

export function NewWeatherForecast() {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    // Use API data if available, otherwise use demo data
    const weekly = dashboardData?.weather?.weekly?.length ? dashboardData.weather.weekly : DEMO_FORECAST;

    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
            <CardHeader className="pb-3 pt-5 px-5 border-b border-gray-50">
                <CardTitle className="font-heading text-base font-semibold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Sun className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <span className="text-gray-800">7-Day Weather Forecast</span>
                        <div className="flex items-center gap-1 mt-0.5">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-[10px] text-gray-400 font-normal">Favorable conditions ahead</span>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {weekly.slice(0, 7).map((day: any, idx: number) => {
                        const date = new Date(day.date);
                        const dayName = date.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'short' }).toUpperCase();
                        const isFirst = idx === 0;
                        const isRainy = day.rain_mm > 2;

                        const getWeatherIcon = () => {
                            if (day.rain_mm > 5) return <CloudLightning className="w-5 h-5" />;
                            if (day.rain_mm > 0.5) return <CloudRain className="w-5 h-5" />;
                            if (day.rain_mm > 0) return <Cloud className="w-5 h-5" />;
                            return <Sun className="w-5 h-5" />;
                        };

                        const getIconColor = () => {
                            if (isFirst) return "text-amber-300";
                            if (day.rain_mm > 5) return "text-blue-500";
                            if (day.rain_mm > 0) return "text-gray-400";
                            return "text-amber-400";
                        };

                        return (
                            <div
                                key={idx}
                                className={`relative flex flex-col items-center min-w-[64px] p-3 rounded-xl transition-colors ${isFirst
                                    ? "bg-[#1B4332] text-white"
                                    : isRainy
                                        ? "bg-blue-50 hover:bg-blue-100"
                                        : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                {/* Today badge */}
                                {isFirst && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 rounded-full text-[8px] font-semibold uppercase text-white">
                                        Today
                                    </div>
                                )}

                                <span className={`text-[10px] font-semibold tracking-wide mb-1 ${isFirst ? "text-white/70" : "text-gray-400"}`}>
                                    {dayName}
                                </span>
                                <span className={`text-base font-bold mb-2 ${isFirst ? "text-white" : "text-gray-700"}`}>
                                    {date.getDate()}
                                </span>

                                {/* Weather icon */}
                                <div className={`mb-2 ${getIconColor()}`}>
                                    {getWeatherIcon()}
                                </div>

                                {/* Temps */}
                                <div className="flex flex-col items-center">
                                    <span className={`text-base font-bold ${isFirst ? "text-white" : "text-gray-700"}`}>
                                        {Math.round(day.temp_max)}°
                                    </span>
                                    <span className={`text-xs font-medium ${isFirst ? "text-white/50" : "text-gray-400"}`}>
                                        {Math.round(day.temp_min)}°
                                    </span>
                                </div>

                                {/* Rain indicator */}
                                {day.rain_mm > 0 && !isFirst && (
                                    <div className="mt-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 rounded-full">
                                        <CloudRain className="w-2.5 h-2.5 text-blue-500" />
                                        <span className="text-[8px] font-semibold text-blue-600">{day.rain_mm}mm</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
