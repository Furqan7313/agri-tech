"use client";

import { AlertTriangle, Bug, CloudLightning, ArrowRight } from "lucide-react";
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
import { useState, useEffect, useCallback } from "react";

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

/** API risk item from GET /dashboard/climate-risk */
interface ApiRiskItem {
    type_key: string;
    level: string;
    message_en: string;
    message_ur: string;
    actions_en: string[];
    actions_ur: string[];
}

const ICON_BY_TYPE: Record<string, React.ReactNode> = {
    diseaseRisk: <AlertTriangle className="w-5 h-5" />,
    pestRisk: <Bug className="w-5 h-5" />,
    climateRisk: <CloudLightning className="w-5 h-5" />,
};

function apiRiskToItem(api: ApiRiskItem): RiskItem {
    return {
        typeKey: api.type_key,
        level: api.level as RiskLevel,
        icon: ICON_BY_TYPE[api.type_key] ?? <CloudLightning className="w-5 h-5" />,
        explanation_en: api.message_en,
        explanation_ur: api.message_ur,
        actions_en: api.actions_en ?? [],
        actions_ur: api.actions_ur ?? api.actions_en ?? [],
    };
}

const FALLBACK_RISKS: RiskItem[] = [
    { typeKey: "diseaseRisk", level: "LOW", icon: <AlertTriangle className="w-5 h-5" />, explanation_en: "Loading risk data.", explanation_ur: "خطرے کا ڈیٹا لوڈ ہو رہا ہے۔", actions_en: [], actions_ur: [] },
    { typeKey: "pestRisk", level: "LOW", icon: <Bug className="w-5 h-5" />, explanation_en: "Loading risk data.", explanation_ur: "خطرے کا ڈیٹا لوڈ ہو رہا ہے۔", actions_en: [], actions_ur: [] },
    { typeKey: "climateRisk", level: "LOW", icon: <CloudLightning className="w-5 h-5" />, explanation_en: "Loading risk data.", explanation_ur: "خطرے کا ڈیٹا لوڈ ہو رہا ہے۔", actions_en: [], actions_ur: [] },
];

const LEVEL_COLORS: Record<RiskLevel, string> = {
    LOW: "bg-green-100 text-green-700 border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
    HIGH: "bg-red-100 text-red-700 border-red-200",
};

export function RiskAssessmentPanel() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);
    const [risks, setRisks] = useState<RiskItem[]>(FALLBACK_RISKS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRisks = useCallback(async () => {
        if (typeof window === "undefined") return;
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/dashboard/climate-risk`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(typeof window !== "undefined" && localStorage.getItem("access_token")
                            ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            : {}),
                    },
                    signal: controller.signal,
                }
            );
            clearTimeout(timeoutId);
            if (res.status === 401) {
                setLoading(false);
                if (typeof window !== "undefined") {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("user_email");
                    localStorage.removeItem("username");
                    window.location.href = "/login";
                }
                return;
            }
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Failed to load risk assessment");
            }
            const data = await res.json();
            const items: RiskItem[] = (data.risks ?? []).map((r: ApiRiskItem) => apiRiskToItem(r));
            setRisks(items.length ? items : FALLBACK_RISKS);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Failed to load risk assessment";
            setError(e instanceof Error && e.name === "AbortError" ? "Request timed out. Try again." : message);
            setRisks(FALLBACK_RISKS);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        fetchRisks();
    }, [fetchRisks]);

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
                {error && (
                    <div className="mx-4 mt-4 py-2 px-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4332]" />
                    </div>
                ) : (
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
                )}
            </CardContent>
        </Card>
    );
}
