"use client";

import { FlaskConical, Leaf, Droplets, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface FertilizerCardProps {
    crop: Crop;
    userId?: string;
    area?: number;
}

interface FertilizerProduct {
    bags: number;
    full_name: string;
    cost_pkr: number;
}

interface FertilizerCardData {
    season_total: {
        products: Record<string, FertilizerProduct>;
        total_cost: number;
        area?: number;
    };
    next_application: {
        status: string;
        products: FertilizerProduct[];
        sub_stage?: string;
        stage?: string;
        timing_note?: string;
        instructions?: string;
        urgency?: string;
    };
}

function extractFertilizerActionPlan(fertilizerCard: FertilizerCardData) {
    const recommendation = fertilizerCard;
    const products = recommendation.season_total.products;
    const area = recommendation.season_total.area || 10; // default to 10 acres if not provided

    let totalN = 0, totalP = 0, totalK = 0;
    if (products.DAP) {
        const dapKg = products.DAP.bags * 50;
        totalN += dapKg * 0.18;
        totalP += dapKg * 0.46;
    }
    if (products.Urea) {
        const ureaKg = products.Urea.bags * 50;
        totalN += ureaKg * 0.46;
    }
    if (products.MOP) {
        const mopKg = products.MOP.bags * 50;
        totalK += mopKg * 0.60;
    }
    const npk = {
        nitrogen: Math.round(totalN / area),
        phosphorus: Math.round(totalP / area),
        potassium: Math.round(totalK / area)
    };
    const nextApp = recommendation.next_application;
    let guidanceText = "";
    if (nextApp.status === "DUE_NOW") {
        guidanceText = `Apply ${nextApp.products?.[0]?.full_name || 'fertilizer'} now at ${nextApp.sub_stage || nextApp.stage} stage. `;
        guidanceText += nextApp.timing_note || nextApp.instructions || "";
    } else if (nextApp.status === "COMPLETE") {
        guidanceText = "All scheduled applications for this season are complete. Monitor crop health during grain filling.";
    } else {
        guidanceText = "Apply nitrogen in split doses: 30% at sowing, 40% at tillering, 30% at jointing";
    }
    return {
        npkRatio: npk,
        applicationGuidance: guidanceText,
        nextApplication: {
            status: nextApp.status,
            stage: nextApp.sub_stage || nextApp.stage,
            product: nextApp.products?.[0]?.full_name,
            bags: nextApp.products?.[0]?.bags,
            cost: nextApp.products?.[0]?.cost_pkr,
            urgency: nextApp.urgency,
            instructions: nextApp.instructions
        },
        totalSeasonCost: recommendation.season_total.total_cost
    };
}

export function FertilizerCard({ crop, userId, area = 10 }: FertilizerCardProps) {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const fertilizerData = dashboardData?.fertilizer?.fertilizer_card;

    if (isDashboardLoading && !dashboardData) {
        return (
            <Card className="border-[#E5E7EB] shadow-sm rounded-2xl animate-pulse h-64">
                <CardHeader className="h-16 border-b border-gray-50" />
                <CardContent className="h-48" />
            </Card>
        );
    }

    if (!fertilizerData) return null;

    const plan = extractFertilizerActionPlan(fertilizerData);
    const total = plan.npkRatio.nitrogen + plan.npkRatio.phosphorus + plan.npkRatio.potassium || 1;

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-[#D4A373]/10 rounded-lg">
                        <FlaskConical className="w-5 h-5 text-[#D4A373]" />
                    </div>
                    {t('fertilizerOptimization')}
                    <span className="text-xs font-normal text-[#6B7280] ml-auto">{t('npkRatio')}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* NPK Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Nitrogen */}
                    <div className="text-center p-4 bg-[#1B4332]/5 rounded-xl border border-[#1B4332]/10 hover:border-[#1B4332]/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#1B4332] rounded-full flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{t('nitrogen')}</p>
                        <p className="text-2xl font-bold text-[#1B4332] font-heading">{plan.npkRatio.nitrogen}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#1B4332] rounded-full"
                                style={{ width: `${(plan.npkRatio.nitrogen / total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Phosphorus */}
                    <div className="text-center p-4 bg-[#D4A373]/5 rounded-xl border border-[#D4A373]/10 hover:border-[#D4A373]/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#D4A373] rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{t('phosphorus')}</p>
                        <p className="text-2xl font-bold text-[#D4A373] font-heading">{plan.npkRatio.phosphorus}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#D4A373] rounded-full"
                                style={{ width: `${(plan.npkRatio.phosphorus / total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Potassium */}
                    <div className="text-center p-4 bg-[#52B788]/5 rounded-xl border border-[#52B788]/10 hover:border-[#52B788]/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#52B788] rounded-full flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{t('potassium')}</p>
                        <p className="text-2xl font-bold text-[#52B788] font-heading">{plan.npkRatio.potassium}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#52B788] rounded-full"
                                style={{ width: `${(plan.npkRatio.potassium / total) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Application Notes */}
                <div className="p-3 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">{t('appGuidance')}</p>
                    <p className="text-sm text-[#1F2937] leading-relaxed">{plan.applicationGuidance}</p>
                </div>

                {/* Next Application Details */}
                {plan.nextApplication.status !== "COMPLETE" && plan.nextApplication.product && (
                    <div className="p-3 bg-[#F0FDFA] rounded-lg border border-[#E5E7EB] mt-2">
                        <p className="text-xs text-[#6B7280] mb-1">{t('nextApplication')}</p>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-[#115E59]">
                                {plan.nextApplication.product} ({plan.nextApplication.bags} bags) - Rs. {plan.nextApplication.cost?.toLocaleString()}
                            </p>
                            <p className="text-xs text-[#1F2937]">
                                <span className="font-semibold">Stage:</span> {plan.nextApplication.stage} | <span className="font-semibold">Urgency:</span> {plan.nextApplication.urgency}
                            </p>
                            {plan.nextApplication.instructions && (
                                <p className="text-xs text-[#4B5563] italic">
                                    {plan.nextApplication.instructions}
                                </p>
                            )}
                        </div>
                    </div>
                )}


            </CardContent>
        </Card>
    );
}
