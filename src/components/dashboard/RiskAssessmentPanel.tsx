"use client";

import { AlertTriangle, Bug, CloudLightning, Activity, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";
import { useState, useEffect } from "react";

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

interface RiskDetail {
    name: string;
    symptoms?: string[] | string;
    management?: any;
    severity: string;
    impact?: string;
}

interface RiskItem {
    typeKey: string; // dictionary key for title
    level: RiskLevel;
    icon: React.ReactNode;
    explanation_en: string;
    explanation_ur: string;
    actions_en: string[];
    actions_ur: string[];
    details?: RiskDetail[];
}

/** API risk item from overview */
interface ApiRiskItem {
    type_key: string;
    level: string;
    message_en: string;
    message_ur: string;
    actions_en: string[];
    actions_ur: string[];
    details?: RiskDetail[];
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
        details: api.details
    };
}

const FALLBACK_RISKS: RiskItem[] = [
    { typeKey: "diseaseRisk", level: "LOW", icon: <AlertTriangle className="w-5 h-5" />, explanation_en: "Assessment not available.", explanation_ur: "تشخیص دستیاب نہیں ہے۔", actions_en: [], actions_ur: [] },
    { typeKey: "pestRisk", level: "LOW", icon: <Bug className="w-5 h-5" />, explanation_en: "Assessment not available.", explanation_ur: "تشخیص دستیاب نہیں ہے۔", actions_en: [], actions_ur: [] },
    { typeKey: "climateRisk", level: "LOW", icon: <CloudLightning className="w-5 h-5" />, explanation_en: "Assessment not available.", explanation_ur: "تشخیص دستیاب نہیں ہے۔", actions_en: [], actions_ur: [] },
];

const SEVERITY_INFO: Record<string, { color: string, bg: string }> = {
    HIGH: { color: "text-red-700", bg: "bg-red-50 border-red-100" },
    MEDIUM: { color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-100" },
    LOW: { color: "text-green-700", bg: "bg-green-50 border-green-100" },
    CRITICAL: { color: "text-red-800", bg: "bg-red-100 border-red-200" },
};

export function RiskAssessmentPanel() {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [risks, setRisks] = useState<RiskItem[]>(FALLBACK_RISKS);

    useEffect(() => {
        if (dashboardData?.risk?.assessments) {
            const items = dashboardData.risk.assessments.map((r: ApiRiskItem) => apiRiskToItem(r));
            setRisks(items.length ? items : FALLBACK_RISKS);
        }
    }, [dashboardData]);

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden h-full animate-pulse">
                <CardHeader className="h-16 border-b border-gray-50" />
                <CardContent className="h-48" />
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
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
                    {["diseaseRisk", "pestRisk", "climateRisk"].map((typeKey) => {
                        const risk = risks.find(r => r.typeKey === typeKey);
                        const riskLevel = risk?.level || 'LOW';
                        const explanation = language === 'ur' ? risk?.explanation_ur : risk?.explanation_en;

                        return (
                            <div key={typeKey} className="group p-4 md:p-6 hover:bg-gray-50/30 transition-colors flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 bg-white shadow-sm mt-1`}>
                                        {risk?.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-bold text-gray-900 text-base">{t(typeKey)}</h4>
                                            <Badge variant="outline" className={`text-[10px] px-2.5 py-0.5 h-auto font-bold border rounded-full uppercase tracking-wider ${riskLevel === "HIGH" ? "bg-red-50 text-red-600 border-red-100" :
                                                riskLevel === "MEDIUM" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                                                    "bg-green-50 text-green-600 border-green-100"
                                                }`}>
                                                {t(riskLevel.toLowerCase())}
                                            </Badge>
                                        </div>

                                        {!risk?.details || risk.details.length === 0 ? (
                                            <p className="text-sm text-gray-500 italic">{explanation}</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {risk.details.map((detail, idx) => {
                                                    const sev = SEVERITY_INFO[detail.severity] || SEVERITY_INFO.LOW;
                                                    return (
                                                        <div key={idx} className={`rounded-xl border p-4 ${sev.bg} transition-all duration-200 hover:shadow-sm`}>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className={`font-bold text-sm ${sev.color}`}>{detail.name}</span>
                                                                <Badge variant="secondary" className="text-[10px] bg-white/50 text-gray-600 border-none font-semibold">
                                                                    {detail.severity}
                                                                </Badge>
                                                            </div>

                                                            {detail.symptoms && (Array.isArray(detail.symptoms) ? detail.symptoms.length > 0 : detail.symptoms.length > 0) && (
                                                                <div className="mb-3">
                                                                    <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1 flex items-center gap-1.5">
                                                                        <Activity className="w-3 h-3" />
                                                                        Symptoms
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {(Array.isArray(detail.symptoms) ? detail.symptoms : detail.symptoms.split(/[.,]/).filter(s => s.trim())).map((s, i) => (
                                                                            <span key={i} className="text-xs bg-white py-0.5 px-2 rounded-md border border-gray-100 text-gray-600 shadow-sm">
                                                                                {s.trim()}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="space-y-2">
                                                                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5">
                                                                    <ShieldCheck className="w-3 h-3" />
                                                                    Management Action
                                                                </div>
                                                                <div className="p-3 bg-white rounded-lg border border-gray-100 text-xs text-gray-700 shadow-sm leading-relaxed">
                                                                    {typeof detail.management === 'string' ? detail.management :
                                                                        (detail.management?.chemical_control?.[0] || detail.management?.[0] || "Monitor conditions")}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
