"use client";

import { Droplets, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop } from "@/context/AgriContext";

interface IrrigationTimelineProps {
    crop: Crop;
}

type DayStatus = "water" | "sun" | "rain";

interface DayData {
    day: string;
    date: number;
    status: DayStatus;
    label: string;
}

// Simulated weekly irrigation schedule
const getIrrigationSchedule = (crop: Crop): DayData[] => {
    const baseSchedule: DayData[] = [
        { day: "Mon", date: 27, status: "water", label: "Next Water" },
        { day: "Tue", date: 28, status: "sun", label: "Rest" },
        { day: "Wed", date: 29, status: "sun", label: "Rest" },
        { day: "Thu", date: 30, status: "water", label: "Irrigate" },
        { day: "Fri", date: 31, status: "rain", label: "Expected Rain" },
        { day: "Sat", date: 1, status: "sun", label: "Rest" },
        { day: "Sun", date: 2, status: "water", label: "Irrigate" },
    ];
    return baseSchedule;
};

const statusConfig: Record<DayStatus, { icon: React.ReactNode; bg: string; iconColor: string; border: string }> = {
    water: {
        icon: <Droplets className="w-5 h-5" />,
        bg: "bg-[#457B9D]/10",
        iconColor: "text-[#457B9D]",
        border: "border-[#457B9D]/30",
    },
    sun: {
        icon: <Sun className="w-5 h-5" />,
        bg: "bg-[#E9C46A]/10",
        iconColor: "text-[#D4A373]",
        border: "border-[#E9C46A]/30",
    },
    rain: {
        icon: <CloudRain className="w-5 h-5" />,
        bg: "bg-[#52B788]/10",
        iconColor: "text-[#52B788]",
        border: "border-[#52B788]/30",
    },
};

export function IrrigationTimeline({ crop }: IrrigationTimelineProps) {
    const schedule = getIrrigationSchedule(crop);

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-[#457B9D]/10 rounded-lg">
                        <Droplets className="w-5 h-5 text-[#457B9D]" />
                    </div>
                    Weekly Irrigation Plan
                    <span className="text-xs font-normal text-[#6B7280] ml-auto">Jan 27 - Feb 2</span>
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
                  ${isToday ? "ring-2 ring-[#1B4332] ring-offset-2" : ""}
                  hover:scale-105 cursor-pointer
                `}
                            >
                                {isToday && (
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1B4332] text-white text-[10px] rounded-full font-medium">
                                        Today
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
                <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-[#E5E7EB]">
                    <LegendItem icon={<Droplets className="w-4 h-4 text-[#457B9D]" />} label="Irrigate" />
                    <LegendItem icon={<Sun className="w-4 h-4 text-[#D4A373]" />} label="Rest Day" />
                    <LegendItem icon={<CloudRain className="w-4 h-4 text-[#52B788]" />} label="Rain Expected" />
                </div>

                {/* Next Irrigation Info */}
                <div className="mt-4 p-3 bg-[#457B9D]/5 rounded-lg border border-[#457B9D]/20 flex items-center gap-3">
                    <div className="p-2 bg-[#457B9D] rounded-lg">
                        <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#1F2937]">Next Water: Today (Mon, Jan 27)</p>
                        <p className="text-xs text-[#6B7280]">Recommended: Morning irrigation, 2-3 inches depth</p>
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
