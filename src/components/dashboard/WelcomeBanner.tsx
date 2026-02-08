"use client";

import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";
import { useState } from "react";

// Translations for WelcomeBanner
const BANNER_TEXT = {
    en: {
        liveDashboard: "Live Dashboard",
        welcomeTitle: "Welcome to your Farm Dashboard",
        welcomeDesc: "Monitor your crops, weather conditions, and get real-time farming insights.",
        past7Days: "Past 7 Days",
        past30Days: "Past 30 Days",
        past90Days: "Past 90 Days",
        thisYear: "This Year",
        allFields: "All Fields",
        field1: "Field 1",
        field2: "Field 2",
        field3: "Field 3",
    },
    ur: {
        liveDashboard: "براہ راست ڈیش بورڈ",
        welcomeTitle: "اپنے فارم ڈیش بورڈ میں خوش آمدید",
        welcomeDesc: "اپنی فصلوں، موسم کے حالات کی نگرانی کریں اور حقیقی وقت کی زرعی معلومات حاصل کریں۔",
        past7Days: "پچھلے 7 دن",
        past30Days: "پچھلے 30 دن",
        past90Days: "پچھلے 90 دن",
        thisYear: "اس سال",
        allFields: "تمام کھیت",
        field1: "کھیت 1",
        field2: "کھیت 2",
        field3: "کھیت 3",
    }
};

export function WelcomeBanner() {
    const { language, district } = useAgri();
    const t = (key: keyof typeof BANNER_TEXT.en) => BANNER_TEXT[language]?.[key] || BANNER_TEXT['en'][key];

    const [timeRange, setTimeRange] = useState<keyof typeof BANNER_TEXT.en>("past7Days");
    const [fieldFilter, setFieldFilter] = useState<keyof typeof BANNER_TEXT.en>("allFields");

    const timeRanges: (keyof typeof BANNER_TEXT.en)[] = ["past7Days", "past30Days", "past90Days", "thisYear"];
    const fieldOptions: (keyof typeof BANNER_TEXT.en)[] = ["allFields", "field1", "field2", "field3"];

    return (
        <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Background with subtle gradient overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/90 via-[#1B4332]/85 to-[#2D5A47]/90" />

            {/* Content */}
            <div className="relative px-6 py-8 md:px-8 md:py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-200 text-xs font-medium tracking-wide uppercase">{t('liveDashboard')}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                            {t('welcomeTitle')}
                        </h1>
                        <p className="text-green-100/80 text-sm max-w-md flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-300" />
                            {district && <span className="font-medium text-green-200">{district}</span>}
                            <span className="opacity-70">•</span>
                            <span>{t('welcomeDesc')}</span>
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm rounded-lg px-4 py-2 h-10 transition-colors"
                                >
                                    <Calendar className="w-4 h-4 mr-2 text-green-300" />
                                    <span className="font-medium">{t(timeRange)}</span>
                                    <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-lg border border-gray-100 shadow-xl bg-white">
                                {timeRanges.map((range) => (
                                    <DropdownMenuItem
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className="cursor-pointer rounded-md font-medium hover:bg-green-50 transition-colors"
                                    >
                                        {t(range)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm rounded-lg px-4 py-2 h-10 transition-colors"
                                >
                                    <span className="font-medium">{t(fieldFilter)}</span>
                                    <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-lg border border-gray-100 shadow-xl bg-white">
                                {fieldOptions.map((field) => (
                                    <DropdownMenuItem
                                        key={field}
                                        onClick={() => setFieldFilter(field)}
                                        className="cursor-pointer rounded-md font-medium hover:bg-green-50 transition-colors"
                                    >
                                        {t(field)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}
