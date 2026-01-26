"use client";

import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crop, District } from "@/context/AgriContext";

interface SowingCalendarProps {
    crop: Crop;
    district: District;
}

interface SowingWindow {
    startMonth: string;
    endMonth: string;
    optimalDates: string;
    status: "past" | "optimal" | "late" | "upcoming";
    recommendation: string;
}

// Sowing windows based on crop and district
const getSowingData = (crop: Crop, district: District): SowingWindow => {
    const sowingWindows: Record<Crop, Record<District, SowingWindow>> = {
        Wheat: {
            Multan: {
                startMonth: "November",
                endMonth: "December",
                optimalDates: "Nov 1 - Nov 25",
                status: "past",
                recommendation: "Optimal sowing window has passed. Consider early maturing varieties if planting now.",
            },
            Jhelum: {
                startMonth: "October",
                endMonth: "November",
                optimalDates: "Oct 15 - Nov 15",
                status: "past",
                recommendation: "Optimal sowing window has passed. Focus on crop management for existing plantings.",
            },
            Khanewal: {
                startMonth: "November",
                endMonth: "December",
                optimalDates: "Nov 5 - Nov 30",
                status: "past",
                recommendation: "Late sowing may reduce yields by 15-20%. Consider adjusting fertilizer application.",
            },
        },
        Cotton: {
            Multan: {
                startMonth: "April",
                endMonth: "May",
                optimalDates: "Apr 15 - May 15",
                status: "upcoming",
                recommendation: "Prepare land now. Optimal sowing window approaching in approximately 3 months.",
            },
            Jhelum: {
                startMonth: "May",
                endMonth: "June",
                optimalDates: "May 1 - May 31",
                status: "upcoming",
                recommendation: "Begin seed selection and land preparation. Consider Bt cotton varieties for pest resistance.",
            },
            Khanewal: {
                startMonth: "April",
                endMonth: "May",
                optimalDates: "Apr 20 - May 20",
                status: "upcoming",
                recommendation: "Arrange irrigation infrastructure. Early sowing leads to better pest management.",
            },
        },
    };
    return sowingWindows[crop][district];
};

const statusConfig = {
    past: { bg: "bg-[#6B7280]", text: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
    optimal: { bg: "bg-[#52B788]", text: "Optimal Now", icon: <CheckCircle className="w-4 h-4" /> },
    late: { bg: "bg-[#E9C46A]", text: "Late Window", icon: <AlertCircle className="w-4 h-4" /> },
    upcoming: { bg: "bg-[#457B9D]", text: "Upcoming", icon: <Clock className="w-4 h-4" /> },
};

// Generate calendar view
const generateCalendarMonths = (crop: Crop) => {
    const months = [
        { name: "Jan", index: 0 },
        { name: "Feb", index: 1 },
        { name: "Mar", index: 2 },
        { name: "Apr", index: 3 },
        { name: "May", index: 4 },
        { name: "Jun", index: 5 },
        { name: "Jul", index: 6 },
        { name: "Aug", index: 7 },
        { name: "Sep", index: 8 },
        { name: "Oct", index: 9 },
        { name: "Nov", index: 10 },
        { name: "Dec", index: 11 },
    ];

    const sowingMonths = crop === "Wheat" ? [9, 10, 11] : [3, 4, 5]; // Oct-Dec for Wheat, Apr-Jun for Cotton
    const currentMonth = 0; // January (current)

    return months.map((month) => ({
        ...month,
        isSowing: sowingMonths.includes(month.index),
        isCurrent: month.index === currentMonth,
        isOptimal: crop === "Wheat" ? month.index === 10 : month.index === 4, // Nov for Wheat, May for Cotton
    }));
};

export function SowingCalendar({ crop, district }: SowingCalendarProps) {
    const sowingData = getSowingData(crop, district);
    const config = statusConfig[sowingData.status];
    const calendarMonths = generateCalendarMonths(crop);

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-[#52B788]/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#52B788]" />
                    </div>
                    Optimal Sowing Window
                    <Badge className={`ml-auto ${config.bg} text-white flex items-center gap-1`}>
                        {config.icon}
                        {config.text}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Calendar View */}
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
                    {calendarMonths.map((month) => (
                        <div
                            key={month.name}
                            className={`
                relative p-2 lg:p-3 rounded-lg text-center transition-all duration-300
                ${month.isCurrent ? "ring-2 ring-[#1B4332] ring-offset-1" : ""}
                ${month.isOptimal ? "bg-[#52B788] text-white" : ""}
                ${month.isSowing && !month.isOptimal ? "bg-[#52B788]/20 text-[#1B4332]" : ""}
                ${!month.isSowing ? "bg-[#F3F4F6] text-[#6B7280]" : ""}
                hover:scale-105 cursor-pointer
              `}
                        >
                            {month.isCurrent && (
                                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1B4332] rounded-full" />
                            )}
                            <p className="text-xs font-medium">{month.name}</p>
                            {month.isOptimal && (
                                <CheckCircle className="w-3 h-3 mx-auto mt-1" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <LegendItem color="bg-[#52B788]" label="Optimal Period" />
                    <LegendItem color="bg-[#52B788]/20" label="Sowing Window" />
                    <LegendItem color="bg-[#F3F4F6]" label="Off Season" />
                </div>

                {/* Sowing Info Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
                    <InfoCard
                        icon={<Calendar className="w-4 h-4 text-[#1B4332]" />}
                        label="Sowing Period"
                        value={`${sowingData.startMonth} - ${sowingData.endMonth}`}
                    />
                    <InfoCard
                        icon={<CheckCircle className="w-4 h-4 text-[#52B788]" />}
                        label="Optimal Dates"
                        value={sowingData.optimalDates}
                        highlight
                    />
                    <InfoCard
                        icon={<Clock className="w-4 h-4 text-[#D4A373]" />}
                        label="Crop Type"
                        value={crop === "Wheat" ? "Rabi Season" : "Kharif Season"}
                    />
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Recommendation for {district}
                    </p>
                    <p className="text-sm text-[#1F2937]">{sowingData.recommendation}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className={`w-3 h-3 ${color} rounded`} />
            <span>{label}</span>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className={`p-3 rounded-lg ${highlight ? "bg-[#52B788]/10 border border-[#52B788]/20" : "bg-[#F3F4F6]"}`}>
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs text-[#6B7280]">{label}</span>
            </div>
            <p className={`text-sm font-semibold ${highlight ? "text-[#1B4332]" : "text-[#1F2937]"}`}>{value}</p>
        </div>
    );
}
