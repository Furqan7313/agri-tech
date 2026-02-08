"use client";

import { useState } from "react";
import { Droplets, Sun, CloudRain, ChevronRight, Waves, Calendar, CheckCircle, Timer, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface NewIrrigationPanelProps {
    crop: Crop;
}

type DayStatus = "water" | "sun" | "rain";

// Demo irrigation schedule
const DEMO_IRRIGATION = {
    decision: "no_irrigation_needed",
    soil_moisture: 78,
    next_watering: "3 days",
    water_saved: "2,400L",
    weekly_plan: [
        { day: new Date().toISOString(), rain: "0mm", status: "sun" },
        { day: new Date(Date.now() + 86400000).toISOString(), rain: "0mm", status: "sun" },
        { day: new Date(Date.now() + 86400000 * 2).toISOString(), rain: "0mm", status: "water" },
        { day: new Date(Date.now() + 86400000 * 3).toISOString(), rain: "0mm", status: "sun" },
        { day: new Date(Date.now() + 86400000 * 4).toISOString(), rain: "0.5mm", status: "rain" },
        { day: new Date(Date.now() + 86400000 * 5).toISOString(), rain: "2mm", status: "rain" },
        { day: new Date(Date.now() + 86400000 * 6).toISOString(), rain: "0mm", status: "sun" },
    ]
};

const statusConfig: Record<DayStatus, { icon: React.ReactNode; bg: string; iconColor: string }> = {
    water: {
        icon: <Droplets className="w-4 h-4" />,
        bg: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    sun: {
        icon: <Sun className="w-4 h-4" />,
        bg: "bg-amber-50",
        iconColor: "text-amber-500",
    },
    rain: {
        icon: <CloudRain className="w-4 h-4" />,
        bg: "bg-green-50",
        iconColor: "text-green-500",
    },
};

export function NewIrrigationPanel({ crop }: NewIrrigationPanelProps) {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const data = dashboardData?.irrigation || DEMO_IRRIGATION;

    const [showFeedback, setShowFeedback] = useState(false);

    const handleFullCalendar = () => {
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
    };

    return (
        <div className="space-y-4">
            {/* Weekly Irrigation Plan */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
                <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between border-b border-gray-50">
                    <CardTitle className="font-heading text-base flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <span className="font-semibold text-gray-800">Weekly Irrigation Plan</span>
                            <p className="text-xs text-gray-400 font-normal">
                                Smart scheduling active
                            </p>
                        </div>
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 text-xs font-medium rounded-lg transition-colors ${showFeedback ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
                        onClick={handleFullCalendar}
                    >
                        {showFeedback ? (
                            <>
                                <Check className="w-4 h-4 mr-1 text-blue-600" />
                                <span>Calendar Opened!</span>
                            </>
                        ) : (
                            <>
                                <span>Full Calendar</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </Button>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {data.weekly_plan.slice(0, 7).map((item: any, idx: number) => {
                            const dateObj = new Date(item.day);
                            const isValidDate = !isNaN(dateObj.getTime());
                            const dayName = isValidDate
                                ? dateObj.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'short' })
                                : "—";
                            const dateNum = isValidDate ? dateObj.getDate() : "—";
                            const isFirst = idx === 0;

                            let status: DayStatus = item.status || "sun";
                            if (isFirst) {
                                if (data.decision.includes("irrigate")) status = "water";
                                else if (data.decision.includes("rain")) status = "rain";
                            }

                            const config = statusConfig[status];

                            return (
                                <div
                                    key={idx}
                                    className={`relative flex flex-col items-center min-w-[60px] p-3 rounded-xl transition-colors ${isFirst
                                        ? "bg-[#1B4332] text-white"
                                        : `${config.bg} hover:bg-opacity-70`
                                        }`}
                                >
                                    {/* Today badge */}
                                    {isFirst && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 rounded-full text-[8px] font-semibold uppercase text-white">
                                            Today
                                        </div>
                                    )}

                                    <span className={`text-[10px] font-semibold uppercase tracking-wide mb-1 ${isFirst ? "text-white/70" : "text-gray-400"}`}>
                                        {dayName}
                                    </span>
                                    <span className={`text-base font-bold mb-2 ${isFirst ? "text-white" : "text-gray-700"}`}>
                                        {dateNum}
                                    </span>

                                    {/* Status icon */}
                                    <div className={`p-1.5 rounded-lg ${isFirst ? "bg-white/20" : config.bg}`}>
                                        <span className={isFirst ? "text-amber-300" : config.iconColor}>
                                            {isFirst ? <Sun className="w-4 h-4" /> : config.icon}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                        {Object.entries(statusConfig).map(([key, config]) => (
                            <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                                <div className={`w-3 h-3 rounded ${config.bg}`}>
                                    <span className={config.iconColor} style={{ fontSize: '8px' }}></span>
                                </div>
                                <span className="font-medium capitalize">{key === 'water' ? 'Irrigation' : key === 'sun' ? 'Sunny' : 'Rain Expected'}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Soil Moisture Card */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
                <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                        {/* Water icon */}
                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                            <Waves className="w-7 h-7 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-800">
                                    Soil Moisture Level
                                </p>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            {/* Progress bar */}
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${DEMO_IRRIGATION.soil_moisture}%` }}
                                />
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-gray-500">
                                    <span className="font-bold text-gray-800 text-lg">{DEMO_IRRIGATION.soil_moisture}%</span> Adequate
                                </span>
                                <span className="text-gray-300">|</span>
                                <span className="flex items-center gap-1 text-gray-500">
                                    <Timer className="w-4 h-4 text-blue-500" />
                                    Next: <span className="font-medium text-blue-600">{DEMO_IRRIGATION.next_watering}</span>
                                </span>
                            </div>
                        </div>
                        {/* Water saved badge */}
                        <div className="px-4 py-3 bg-green-50 rounded-xl text-center shrink-0">
                            <p className="text-green-600 text-xs font-medium">Water Saved</p>
                            <p className="text-green-700 text-lg font-bold">{DEMO_IRRIGATION.water_saved}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
