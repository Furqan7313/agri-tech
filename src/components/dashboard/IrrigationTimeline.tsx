"use client";

import { Droplets, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface IrrigationTimelineProps {
    crop: Crop;
}

type DayStatus = "water" | "sun" | "rain";

interface DayData {
    day: string;
    date: number;
    status: DayStatus;
    labelKey: string;
}

// Simulated weekly irrigation schedule
const getIrrigationSchedule = (crop: Crop): DayData[] => {
    const today = new Date();
    const schedule: DayData[] = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
        const current = new Date(today);
        current.setDate(today.getDate() + i);

        const dayName = days[current.getDay()];
        const dateNum = current.getDate();

        // Simple mock logic for status
        // Irrigate on 1st and 4th day, Rain on 5th, Sun on others
        let status: DayStatus = "sun";
        if (i === 0 || i === 3) status = "water";
        if (i === 4) status = "rain";

        schedule.push({
            day: dayName,
            date: dateNum,
            status,
            labelKey: status === "water" ? "irrigate" : status === "rain" ? "rain" : "rest"
        });
    }
    return schedule;
};

const statusConfig: Record<DayStatus, { icon: React.ReactNode; bg: string; iconColor: string; border: string }> = {
    water: {
        icon: <Droplets className="w-5 h-5" />,
        bg: "bg-agri-info/10",
        iconColor: "text-agri-info",
        border: "border-agri-info/30",
    },
    sun: {
        icon: <Sun className="w-5 h-5" />,
        bg: "bg-secondary/10",
        iconColor: "text-secondary",
        border: "border-secondary/30",
    },
    rain: {
        icon: <CloudRain className="w-5 h-5" />,
        bg: "bg-agri-success/10",
        iconColor: "text-agri-success",
        border: "border-agri-success/30",
    },
};

export function IrrigationTimeline({ crop }: IrrigationTimelineProps) {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);
    const schedule = getIrrigationSchedule(crop);

    const recommendedText = language === 'ur'
        ? "مشورہ: صبح کی آبپاشی، 2-3 انچ گہرائی"
        : "Recommended: Morning irrigation, 2-3 inches depth";

    const nextWaterText = language === 'ur'
        ? "اگلا پانی: آج"
        : "Next Water: Today";

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-agri-info/10 rounded-lg">
                        <Droplets className="w-5 h-5 text-agri-info" />
                    </div>
                    {t('weeklyPlan')}
                    {/* Dynamic date range could be added here if needed */}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Timeline */}
                <div className="grid grid-cols-7 gap-2">
                    {schedule.map((day, idx) => {
                        const config = statusConfig[day.status];
                        const isToday = idx === 0;

                        return (
                            <div
                                key={idx}
                                className={`
                  relative text-center p-3 rounded-xl transition-all duration-300
                  ${config.bg} ${config.border} border
                  ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}
                  hover:scale-105 cursor-pointer
                `}
                            >
                                {isToday && (
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-medium">
                                        {t('today')}
                                    </span>
                                )}
                                <p className="text-xs text-[#6B7280] font-medium">{day.day}</p>
                                <p className="text-sm font-bold text-[#1F2937] mb-2">{day.date}</p>
                                <div className={`flex justify-center ${config.iconColor}`}>
                                    {config.icon}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border">
                    <LegendItem icon={<Droplets className="w-4 h-4 text-agri-info" />} label={t('irrigate')} />
                    <LegendItem icon={<Sun className="w-4 h-4 text-secondary" />} label={t('restDay')} />
                    <LegendItem icon={<CloudRain className="w-4 h-4 text-agri-success" />} label={t('rainExpected')} />
                </div>

                {/* Next Irrigation Info */}
                <div className="mt-4 p-3 bg-agri-info/5 rounded-lg border border-agri-info/20 flex items-center gap-3">
                    <div className="p-2 bg-agri-info rounded-lg">
                        <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{nextWaterText}</p>
                        <p className="text-xs text-muted-foreground">{recommendedText}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            {icon}
            <span>{label}</span>
        </div>
    );
}
