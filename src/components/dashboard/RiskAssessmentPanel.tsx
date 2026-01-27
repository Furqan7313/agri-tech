"use client";

import { AlertTriangle, Bug, CloudLightning, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

interface RiskItem {
    typeKey: string; // dictionary key for title
    level: RiskLevel;
    icon: React.ReactNode;
    explanation_en: string;
    explanation_ur: string;
    actions_en: string[];
    actions_ur: string[];
}

const getRisksData = (): RiskItem[] => [
    {
        typeKey: "diseaseRisk",
        level: "HIGH",
        icon: <AlertTriangle className="w-5 h-5" />,
        explanation_en: "High humidity (85%) combined with moderate temperatures (22°C) creates ideal conditions for Yellow Rust. Preventative fungicide spray is recommended immediately.",
        explanation_ur: "زیادہ نمی (85٪) اور معتدل درجہ حرارت (22°C) زرد زنگ (Yellow Rust) کے لیے مثالی حالات پیدا کر رہے ہیں۔ حفاظتی فنگسائڈ اسپرے فوری طور پر تجویز کیا جاتا ہے۔",
        actions_en: ["Monitor field density daily.", "Check for discoloration in lower leaves."],
        actions_ur: ["روزانہ کھیت کی کثافت کی نگرانی کریں۔", "نچلے پتوں میں رنگت کی تبدیلی چیک کریں۔"]
    },
    {
        typeKey: "pestRisk",
        level: "MEDIUM",
        icon: <Bug className="w-5 h-5" />,
        explanation_en: "Aphid population is rising in neighboring districts. Monitor your crop density. Current wind speed favors migration.",
        explanation_ur: "پڑوسی اضلاع میں سست تیلے (Aphid) کی آبادی بڑھ رہی ہے۔ فصل کی کثافت پر نظر رکھیں۔ موجودہ ہوا کی رفتار منتقلی کے لیے سازگار ہے۔",
        actions_en: ["Place sticky traps.", "Monitor wind direction."],
        actions_ur: ["چپکنے والے جال لگائیں۔", "ہوا کی سمت کی نگرانی کریں۔"]
    },
    {
        typeKey: "climateRisk",
        level: "LOW",
        icon: <CloudLightning className="w-5 h-5" />,
        explanation_en: "Weather forecast is favorable for the next 7 days. No extreme heat or heavy rainfall events predicted.",
        explanation_ur: "اگلے 7 دنوں کے لیے موسم کی پیشگوئی سازگار ہے۔ شدید گرمی یا بھاری بارش کی کوئی پیشگوئی نہیں ہے۔",
        actions_en: ["Continue routine irrigation.", "Maintain standard checks."],
        actions_ur: ["معمول کی آبپاشی جاری رکھیں۔", "معیاری جانچ پڑتال برقرار رکھیں۔"]
    }
];

const LEVEL_COLORS: Record<RiskLevel, string> = {
    LOW: "bg-green-100 text-green-700 border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
    HIGH: "bg-red-100 text-red-700 border-red-200",
};

export function RiskAssessmentPanel() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);
    const risks = getRisksData();

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden h-full">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-gray-50 flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-lg flex items-center gap-3 text-[#1B4332]">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    {t('riskAssessment')}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-50">
                    {risks.map((risk) => (
                        <div key={risk.typeKey} className="group p-4 md:p-5 hover:bg-gray-50/50 transition-colors flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border mt-1 ${risk.level === 'HIGH' ? 'bg-red-50 border-red-100 text-red-600' : risk.level === 'MEDIUM' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                    {risk.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{t(risk.typeKey)}</h4>
                                        <Badge variant="outline" className={`text-[10px] px-2 py-0.5 h-auto font-bold border rounded-full uppercase tracking-wider ${LEVEL_COLORS[risk.level]}`}>
                                            {t(risk.level.toLowerCase())}
                                        </Badge>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500 line-clamp-1 max-w-[200px] md:max-w-xs">
                                        {language === 'ur' ? risk.explanation_ur : risk.explanation_en}
                                    </p>
                                </div>
                            </div>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="sm" className="shrink-0 text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all rounded-full h-8 w-8 p-0">
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l border-border bg-gray-50/50">
                                    <div className={`h-40 w-full relative overflow-hidden flex flex-col justify-end p-6 ${risk.level === 'HIGH' ? 'bg-red-500' : risk.level === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                                        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                                            <AlertTriangle className="w-64 h-64 text-white" />
                                        </div>
                                        <div className="relative z-10 text-white">
                                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                                <Badge variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 uppercase tracking-widest text-[10px] px-2">
                                                    {t('analysis')}
                                                </Badge>
                                            </div>
                                            <SheetTitle className="text-3xl font-heading text-white flex items-center gap-2">
                                                {t(risk.typeKey)}
                                            </SheetTitle>
                                        </div>
                                        <SheetDescription className="text-white/80 mt-1">
                                            {t('riskBreakdown')}
                                        </SheetDescription>
                                    </div>

                                    <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-160px)]">
                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('currentRisk')}</span>
                                                <Badge className={`${risk.level === 'HIGH' ? 'bg-red-100 text-red-700 hover:bg-red-200' : risk.level === 'MEDIUM' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'} border-transparent px-3 py-1 text-xs font-bold`}>
                                                    {t(risk.level.toLowerCase())}
                                                </Badge>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="p-3 bg-gray-50 rounded-lg shrink-0">
                                                    {risk.icon}
                                                </div>
                                                <div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {language === 'ur' ? risk.explanation_ur : risk.explanation_en}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-heading font-semibold text-gray-900 flex items-center gap-2 text-lg">
                                                <div className="w-1 h-5 bg-primary rounded-full"></div>
                                                {t('recommendedActions')}
                                            </h4>
                                            <div className="grid gap-3">
                                                {(language === 'ur' ? risk.actions_ur : risk.actions_en).map((action, i) => (
                                                    <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                                                            <span className="text-xs font-bold text-primary group-hover:text-white">{i + 1}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium leading-relaxed">{action}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
