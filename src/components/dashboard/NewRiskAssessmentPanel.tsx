"use client";

import { useState } from "react";
import { AlertTriangle, Bug, CloudLightning, Shield, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

interface RiskItem {
    typeKey: string;
    level: RiskLevel;
    icon: React.ReactNode;
    explanation_en: string;
    explanation_ur: string;
    percentage: number;
}

// Demo risk data
const DEMO_RISKS: RiskItem[] = [
    {
        typeKey: "diseaseRisk",
        level: "LOW",
        icon: <AlertTriangle className="w-5 h-5" />,
        explanation_en: "No significant diseases detected. Fields are healthy.",
        explanation_ur: "کوئی اہم بیماری نہیں ملی۔",
        percentage: 12
    },
    {
        typeKey: "pestRisk",
        level: "LOW",
        icon: <Bug className="w-5 h-5" />,
        explanation_en: "Minimal pest activity observed. Continue monitoring.",
        explanation_ur: "کوئی اہم کیڑے خطرہ نہیں ملا۔",
        percentage: 8
    },
    {
        typeKey: "climateRisk",
        level: "MEDIUM",
        icon: <CloudLightning className="w-5 h-5" />,
        explanation_en: "Moderate temperature fluctuations expected this week.",
        explanation_ur: "کوئی اہم موسمی خطرہ نہیں ملا۔",
        percentage: 35
    },
];

const RISK_CONFIG = {
    diseaseRisk: {
        label: "Disease Risk",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        progressBg: "bg-red-500",
        bgHover: "hover:bg-red-50/50"
    },
    pestRisk: {
        label: "Pest Risk",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        progressBg: "bg-amber-500",
        bgHover: "hover:bg-amber-50/50"
    },
    climateRisk: {
        label: "Climate Risk",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        progressBg: "bg-blue-500",
        bgHover: "hover:bg-blue-50/50"
    },
};

const LEVEL_CONFIG = {
    HIGH: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
    MEDIUM: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertTriangle },
    LOW: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

export function NewRiskAssessmentPanel() {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const risks = DEMO_RISKS;

    const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

    const handleViewDetails = (typeKey: string) => {
        setSelectedRisk(typeKey);
        setTimeout(() => setSelectedRisk(null), 2500);
    };

    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
            <CardHeader className="pb-3 pt-5 px-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-base flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <span className="text-gray-800 font-semibold block">
                                {t('riskAssessment') || "Risk Assessment"}
                            </span>
                            <span className="text-xs text-gray-400 font-normal">
                                All risks under control
                            </span>
                        </div>
                    </CardTitle>
                    {/* Health score */}
                    <div className="px-3 py-2 bg-green-50 rounded-lg">
                        <p className="text-green-600 text-xs font-medium">Health Score</p>
                        <p className="text-green-700 text-xl font-bold">92%</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
                {["diseaseRisk", "pestRisk", "climateRisk"].map((typeKey) => {
                    const risk = risks.find(r => r.typeKey === typeKey)!;
                    const config = RISK_CONFIG[typeKey as keyof typeof RISK_CONFIG];
                    const levelConfig = LEVEL_CONFIG[risk.level];
                    const LevelIcon = levelConfig.icon;
                    const explanation = language === 'ur' ? risk.explanation_ur : risk.explanation_en;

                    return (
                        <div
                            key={typeKey}
                            className={`group relative p-4 rounded-xl bg-gray-50 ${config.bgHover} transition-colors`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className={`w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                                    <span className={config.iconColor}>{risk.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-700 text-sm">{t(typeKey)}</span>
                                        <Badge className={`text-[10px] px-2 py-1 h-auto font-semibold uppercase tracking-wide rounded-md border-0 ${levelConfig.bg} ${levelConfig.text} flex items-center gap-1`}>
                                            <LevelIcon className="w-3 h-3" />
                                            {risk.level}
                                        </Badge>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                                        <div
                                            className={`h-full ${config.progressBg} rounded-full transition-all duration-500`}
                                            style={{ width: `${risk.percentage}%` }}
                                        />
                                    </div>

                                    <p className="text-xs text-gray-500">{explanation}</p>
                                </div>

                                {/* View details button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 px-2 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${selectedRisk === typeKey ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-white'}`}
                                    onClick={() => handleViewDetails(typeKey)}
                                >
                                    {selectedRisk === typeKey ? (
                                        <>
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Viewed
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-3 h-3 mr-1" />
                                            Details
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
