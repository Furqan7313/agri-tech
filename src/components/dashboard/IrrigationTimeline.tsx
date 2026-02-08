"use client";

import { Droplets, Sun, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface IrrigationTimelineProps {
    crop: Crop;
}

type DayStatus = "water" | "sun" | "rain";

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
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const data = dashboardData?.irrigation;

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-[#E5E7EB] shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg flex items-center gap-2">
                        <div className="p-2 bg-agri-info/10 rounded-lg">
                            <Droplets className="w-5 h-5 text-agri-info" />
                        </div>
                        {t('weeklyPlan')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agri-info" />
                </CardContent>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card className="border-[#E5E7EB] shadow-sm">
                <CardHeader>
                    <CardTitle className="font-heading text-lg flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-agri-info" />
                        {t('weeklyPlan')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">No irrigation data available.</p>
                </CardContent>
            </Card>
        );
    }

    const nextWaterText = language === 'ur'
        ? `اگلا پانی: ${data.decision.includes('irrigate') ? 'آج' : 'ابھی ضرورت نہیں'}`
        : `Next Water: ${data.decision.includes('irrigate') ? 'Today' : 'Not Needed'}`;

    const recommendedText = language === 'ur'
        ? `مشورہ: ${data.reason}، ${data.depth_inches} انچ، ${data.timing}`
        : `Recommended: ${data.reason}, ${data.depth_inches} inches, ${data.timing}`;

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-agri-info/10 rounded-lg">
                        <Droplets className="w-5 h-5 text-agri-info" />
                    </div>
                    {t('weeklyPlan')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Timeline */}
                <div className="grid grid-cols-7 gap-2">
                    {data.weekly_plan.map((item: any, idx: number) => {
                        const dateObj = new Date(item.day);
                        const isValidDate = !isNaN(dateObj.getTime());
                        const dayName = isValidDate
                            ? dateObj.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'short' })
                            : "—";
                        const dateNum = isValidDate ? dateObj.getDate() : "—";
                        const isToday = idx === 0;

                        let status: DayStatus = "sun";
                        if (isToday) {
                            if (data.decision.includes("irrigate")) status = "water";
                            else if (data.decision.includes("rain")) status = "rain";
                        } else {
                            const rainValue = item.rain || "0mm";
                            const rainMM = parseFloat(rainValue.replace('mm', '')) || 0;
                            if (rainMM > 0.5) status = "rain";
                        }

                        const config = statusConfig[status];

                        return (
                            <div
                                key={idx}
                                className={`
                                    relative text-center p-2 md:p-3 rounded-xl transition-all duration-300
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
                                <p className="text-[10px] text-[#6B7280] font-medium truncate">{dayName}</p>
                                <p className="text-sm font-bold text-[#1F2937] mb-2">{dateNum}</p>
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
