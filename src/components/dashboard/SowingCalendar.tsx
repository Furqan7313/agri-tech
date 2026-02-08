"use client";

import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crop, District, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface SowingCalendarProps {
    crop: Crop;
    district: District;
}

const statusConfig = {
    passed: { bg: "bg-[#6B7280]", textKey: "completed", icon: <CheckCircle className="w-4 h-4" /> },
    optimal: { bg: "bg-[#52B788]", textKey: "optimalNow", icon: <CheckCircle className="w-4 h-4" /> },
    late: { bg: "bg-[#E9C46A]", textKey: "lateWindow", icon: <AlertCircle className="w-4 h-4" /> },
    upcoming: { bg: "bg-[#457B9D]", textKey: "upcoming", icon: <Clock className="w-4 h-4" /> },
};

export function SowingCalendar({ crop, district }: SowingCalendarProps) {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const data = dashboardData?.seasonal;

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-[#E5E7EB] shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg flex items-center gap-2">
                        <div className="p-2 bg-[#52B788]/10 rounded-lg">
                            <Calendar className="w-5 h-5 text-[#52B788]" />
                        </div>
                        {t('optimalWindow')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#52B788]" />
                </CardContent>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card className="border-[#E5E7EB] shadow-sm">
                <CardHeader>
                    <CardTitle className="font-heading text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#52B788]" />
                        {t('optimalWindow')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">No seasonal guidance available.</p>
                </CardContent>
            </Card>
        );
    }

    const config = (statusConfig as any)[data.status] ?? statusConfig.upcoming;

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-[#52B788]/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#52B788]" />
                    </div>
                    {t('optimalWindow')}
                    <Badge className={`ml-auto ${config.bg} text-white flex items-center gap-1`}>
                        {config.icon}
                        {t(config.textKey)}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Calendar View */}
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
                    {data.months.map((month: any) => (
                        <div
                            key={month.month}
                            className={`
                                relative p-2 lg:p-3 rounded-lg text-center transition-all duration-300
                                ${month.is_current ? "ring-2 ring-[#1B4332] ring-offset-1" : ""}
                                ${month.status === "optimal" ? "bg-[#52B788] text-white" : ""}
                                ${month.status === "sowing_window" ? "bg-[#52B788]/20 text-[#1B4332]" : ""}
                                ${month.status === "off_season" ? "bg-[#F3F4F6] text-[#6B7280]" : ""}
                                hover:scale-105 cursor-pointer
                            `}
                        >
                            {month.is_current && (
                                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1B4332] rounded-full" />
                            )}
                            {month.is_completed && !month.is_current && (
                                <CheckCircle className="absolute -top-1.5 -right-1 w-3 h-3 text-[#1B4332] bg-white rounded-full" />
                            )}
                            <p className="text-[10px] lg:text-xs font-medium">{t(month.month.toLowerCase())}</p>
                            {month.status === "optimal" && (
                                <CheckCircle className="w-3 h-3 mx-auto mt-1" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <LegendItem color="bg-[#52B788]" label={t('optimalPeriod')} />
                    <LegendItem color="bg-[#52B788]/20" label={t('sowingWindow')} />
                    <LegendItem color="bg-[#F3F4F6]" label={t('offSeason')} />
                </div>

                {/* Sowing Info Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
                    <InfoCard
                        icon={<Calendar className="w-4 h-4 text-[#1B4332]" />}
                        label={t('sowingPeriod')}
                        value={data.sowing_period}
                    />
                    <InfoCard
                        icon={<CheckCircle className="w-4 h-4 text-[#52B788]" />}
                        label={t('optimalDates')}
                        value={data.optimal_dates}
                        highlight
                    />
                    <InfoCard
                        icon={<Clock className="w-4 h-4 text-[#D4A373]" />}
                        label={t('cropType')}
                        value={data.season_type}
                    />
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {t('recFor')} {district}
                    </p>
                    <p className="text-sm text-[#1F2937]">{data.recommendation}</p>
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
