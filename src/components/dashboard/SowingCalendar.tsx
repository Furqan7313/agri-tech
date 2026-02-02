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

interface SowingWindow {
    startMonth: string;
    endMonth: string;
    optimalDates: string;
    status: "past" | "optimal" | "late" | "upcoming";
    recommendation: string;
}

const defaultSowingWindow: SowingWindow = {
    startMonth: "",
    endMonth: "",
    optimalDates: "",
    status: "upcoming",
    recommendation: "",
};

// Sowing windows based on crop and district
const getSowingData = (crop: Crop, district: District, language: string): SowingWindow => {
    const isUrdu = language === 'ur';

    // Helper to translate months if needed (simple mapping)
    // Actually we can just return English keys or localized strings directly here
    // For specific dates "Nov 1", we hardcode translation logic

    const sowingWindows: Record<Crop, Record<District, SowingWindow>> = {
        Wheat: {
            Multan: {
                startMonth: isUrdu ? "نومبر" : "November",
                endMonth: isUrdu ? "دسمبر" : "December",
                optimalDates: isUrdu ? "یکم نومبر - 25 نومبر" : "Nov 1 - Nov 25",
                status: "past",
                recommendation: isUrdu
                    ? "بہترین بوائی کا وقت گزر چکا ہے۔ اگر ابھی کاشت کر رہے ہیں تو جلد پکنے والی اقسام پر غور کریں۔"
                    : "Optimal sowing window has passed. Consider early maturing varieties if planting now.",
            },
            Jhelum: {
                startMonth: isUrdu ? "اکتوبر" : "October",
                endMonth: isUrdu ? "نومبر" : "November",
                optimalDates: isUrdu ? "15 اکتوبر - 15 نومبر" : "Oct 15 - Nov 15",
                status: "past",
                recommendation: isUrdu
                    ? "بہترین بوائی کا وقت گزر چکا ہے۔ موجودہ فصل کی دیکھ بھال پر توجہ دیں۔"
                    : "Optimal sowing window has passed. Focus on crop management for existing plantings.",
            },
            Khanewal: {
                startMonth: isUrdu ? "نومبر" : "November",
                endMonth: isUrdu ? "دسمبر" : "December",
                optimalDates: isUrdu ? "5 نومبر - 30 نومبر" : "Nov 5 - Nov 30",
                status: "past",
                recommendation: isUrdu
                    ? "تاخیر سے کاشت پیداوار میں 15-20٪ کمی کر سکتی ہے۔ کھاد کے استعمال کو ایڈجسٹ کریں۔"
                    : "Late sowing may reduce yields by 15-20%. Consider adjusting fertilizer application.",
            },
        },
        Cotton: {
            Multan: {
                startMonth: isUrdu ? "اپریل" : "April",
                endMonth: isUrdu ? "مئی" : "May",
                optimalDates: isUrdu ? "15 اپریل - 15 مئی" : "Apr 15 - May 15",
                status: "upcoming",
                recommendation: isUrdu
                    ? "زمین تیار کریں. بہترین بوائی کا وقت تقریباً 3 ماہ میں آ رہا ہے۔"
                    : "Prepare land now. Optimal sowing window approaching in approximately 3 months.",
            },
            Jhelum: {
                startMonth: isUrdu ? "مئی" : "May",
                endMonth: isUrdu ? "جون" : "June",
                optimalDates: isUrdu ? "یکم مئی - 31 مئی" : "May 1 - May 31",
                status: "upcoming",
                recommendation: isUrdu
                    ? "بیج کا انتخاب اور زمین کی تیاری شروع کریں۔ کیڑوں کے خلاف مزاحمت کے لیے بی ٹی کاٹن کی اقسام پر غور کریں۔"
                    : "Begin seed selection and land preparation. Consider Bt cotton varieties for pest resistance.",
            },
            Khanewal: {
                startMonth: isUrdu ? "اپریل" : "April",
                endMonth: isUrdu ? "مئی" : "May",
                optimalDates: isUrdu ? "20 اپریل - 20 مئی" : "Apr 20 - May 20",
                status: "upcoming",
                recommendation: isUrdu
                    ? "آبپاشی کا انتظام کریں۔ ابتدائی بوائی کیڑوں کے بہتر انتظام کا باعث بنتی ہے۔"
                    : "Arrange irrigation infrastructure. Early sowing leads to better pest management.",
            },
        },
    };
    return sowingWindows[crop]?.[district] ?? defaultSowingWindow;
};

const statusConfig = {
    past: { bg: "bg-[#6B7280]", textKey: "completed", icon: <CheckCircle className="w-4 h-4" /> },
    optimal: { bg: "bg-[#52B788]", textKey: "optimalNow", icon: <CheckCircle className="w-4 h-4" /> },
    late: { bg: "bg-[#E9C46A]", textKey: "lateWindow", icon: <AlertCircle className="w-4 h-4" /> },
    upcoming: { bg: "bg-[#457B9D]", textKey: "upcoming", icon: <Clock className="w-4 h-4" /> },
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
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const sowingData = getSowingData(crop, district, language);
    const config = statusConfig[sowingData.status] ?? statusConfig.upcoming;
    const calendarMonths = generateCalendarMonths(crop);

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
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
                            <p className="text-xs font-medium">{t(month.name.toLowerCase())}</p>
                            {month.isOptimal && (
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
                        value={`${sowingData.startMonth} - ${sowingData.endMonth}`}
                    />
                    <InfoCard
                        icon={<CheckCircle className="w-4 h-4 text-[#52B788]" />}
                        label={t('optimalDates')}
                        value={sowingData.optimalDates}
                        highlight
                    />
                    <InfoCard
                        icon={<Clock className="w-4 h-4 text-[#D4A373]" />}
                        label={t('cropType')}
                        value={crop === "Wheat" ? t('rabi') : t('kharif')}
                    />
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {t('recFor')} {district}
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
