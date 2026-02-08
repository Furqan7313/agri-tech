"use client";

import { useState } from "react";
import { FlaskConical, Leaf, TrendingUp, Calendar, ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface NewFertilizerPanelProps {
    crop: Crop;
    userId?: string;
    area?: number;
}

// Demo fertilizer data
const DEMO_FERTILIZER = {
    npkRatio: {
        nitrogen: 71,
        phosphorus: 25,
        potassium: 17
    },
    applicationGuidance: "Apply Urea (1st interval) now at Tillering stage. Apply at Crown Root Initiation (CRI) stage around 21-25 days after sowing for optimal results.",
    totalSeasonCost: 210354,
    nextApplication: "3 days"
};

export function NewFertilizerPanel({ crop, userId, area = 10 }: NewFertilizerPanelProps) {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const plan = DEMO_FERTILIZER;

    const [showFeedback, setShowFeedback] = useState(false);

    const handleViewPlan = () => {
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
    };

    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
            <CardHeader className="pb-3 pt-5 px-5 border-b border-gray-50 flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-base flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                        <FlaskConical className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <span className="text-gray-800 font-semibold block">
                            Fertilizer Monitoring
                        </span>
                        <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            Next application in {plan.nextApplication}
                        </span>
                    </div>
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 text-xs font-medium rounded-lg transition-colors ${showFeedback ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
                    onClick={handleViewPlan}
                >
                    {showFeedback ? (
                        <>
                            <Check className="w-4 h-4 mr-1 text-green-600" />
                            <span>Plan Loaded!</span>
                        </>
                    ) : (
                        <>
                            <span>View Plan</span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                    )}
                </Button>
            </CardHeader>
            <CardContent className="p-5">
                {/* NPK Cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {/* Nitrogen */}
                    <div className="rounded-xl bg-green-50 p-4 text-center hover:bg-green-100 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2">
                            N
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">Nitrogen</p>
                        <p className="text-2xl font-bold text-green-700 font-heading">{plan.npkRatio.nitrogen}</p>
                        <p className="text-[10px] text-gray-400">kg/acre</p>
                        <div className="mt-2 h-1.5 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: `${(plan.npkRatio.nitrogen / 100) * 100}%` }} />
                        </div>
                    </div>

                    {/* Phosphorus */}
                    <div className="rounded-xl bg-orange-50 p-4 text-center hover:bg-orange-100 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2">
                            P
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">Phosphorus</p>
                        <p className="text-2xl font-bold text-orange-600 font-heading">{plan.npkRatio.phosphorus}</p>
                        <p className="text-[10px] text-gray-400">kg/acre</p>
                        <div className="mt-2 h-1.5 bg-orange-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(plan.npkRatio.phosphorus / 100) * 100}%` }} />
                        </div>
                    </div>

                    {/* Potassium */}
                    <div className="rounded-xl bg-yellow-50 p-4 text-center hover:bg-yellow-100 transition-colors">
                        <div className="w-12 h-12 mx-auto bg-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2">
                            K
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">Potassium</p>
                        <p className="text-2xl font-bold text-yellow-600 font-heading">{plan.npkRatio.potassium}</p>
                        <p className="text-[10px] text-gray-400">kg/acre</p>
                        <div className="mt-2 h-1.5 bg-yellow-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(plan.npkRatio.potassium / 100) * 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* Application Guidance */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 mb-4">
                    <p className="text-xs uppercase tracking-wide font-semibold text-green-700 mb-1.5 flex items-center gap-1.5">
                        <Leaf className="w-4 h-4" />
                        Application Guidance
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{plan.applicationGuidance}</p>
                </div>

                {/* Total Cost */}
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-sm text-gray-700 font-semibold">Total Season Cost</span>
                            <p className="text-xs text-gray-400">Estimated for {area} acres</p>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-500 font-medium">Rs.</span>
                        <span className="font-heading font-bold text-2xl text-gray-800">
                            {plan.totalSeasonCost?.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
