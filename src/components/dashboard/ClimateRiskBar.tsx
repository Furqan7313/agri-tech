"use client";

import { CloudRain, Thermometer, Wind, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { District, Crop } from "@/context/AgriContext";

interface ClimateRiskBarProps {
    district: District;
    crop: Crop;
}

// Simulated risk data based on district/crop
const getRiskData = (district: District, crop: Crop) => {
    const riskMatrix: Record<District, Record<Crop, { level: number; label: string; factors: string[] }>> = {
        Multan: {
            Wheat: { level: 35, label: "Low Risk", factors: ["Favorable temperature", "Moderate humidity"] },
            Cotton: { level: 65, label: "Moderate Risk", factors: ["Heat stress possible", "Monitor water levels"] },
        },
        Jhelum: {
            Wheat: { level: 25, label: "Low Risk", factors: ["Ideal growing conditions", "Good rainfall forecast"] },
            Cotton: { level: 45, label: "Low-Moderate", factors: ["Cooler than optimal", "Extended growing period"] },
        },
        Khanewal: {
            Wheat: { level: 40, label: "Low-Moderate", factors: ["Slight water stress", "Normal temperature"] },
            Cotton: { level: 70, label: "Moderate Risk", factors: ["High temperature expected", "Pest pressure likely"] },
        },
    };
    return riskMatrix[district][crop];
};

const getRiskColor = (level: number) => {
    if (level <= 30) return { bg: "#52B788", text: "text-[#52B788]" };
    if (level <= 50) return { bg: "#E9C46A", text: "text-[#E9C46A]" };
    if (level <= 70) return { bg: "#F4A261", text: "text-[#F4A261]" };
    return { bg: "#E63946", text: "text-[#E63946]" };
};

export function ClimateRiskBar({ district, crop }: ClimateRiskBarProps) {
    const riskData = getRiskData(district, crop);
    const riskColor = getRiskColor(riskData.level);

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#1B4332]/10 rounded-lg">
                            <CloudRain className="w-5 h-5 text-[#1B4332]" />
                        </div>
                        Climate Risk Level
                    </div>
                    <span className={`text-sm font-semibold ${riskColor.text}`}>
                        {riskData.label}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#6B7280]">
                        <span>Low</span>
                        <span>Moderate</span>
                        <span>High</span>
                        <span>Critical</span>
                    </div>
                    <div className="relative h-4 bg-gradient-to-r from-[#52B788] via-[#E9C46A] via-[#F4A261] to-[#E63946] rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg rounded-full"
                            style={{ left: `${riskData.level}%`, transform: "translateX(-50%)" }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-[#6B7280]">
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Risk Factors */}
                <div className="pt-2 border-t border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-2">Current Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                        {riskData.factors.map((factor, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 text-xs bg-[#F3F4F6] text-[#1F2937] rounded-md"
                            >
                                {factor}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Weather Indicators */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                    <WeatherIndicator icon={<Thermometer className="w-4 h-4" />} label="Temp" value="28°C" />
                    <WeatherIndicator icon={<CloudRain className="w-4 h-4" />} label="Humidity" value="65%" />
                    <WeatherIndicator icon={<Wind className="w-4 h-4" />} label="Wind" value="12 km/h" />
                </div>
            </CardContent>
        </Card>
    );
}

function WeatherIndicator({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="text-center p-2 bg-[#F8F9F1] rounded-lg">
            <div className="flex justify-center text-[#1B4332] mb-1">{icon}</div>
            <p className="text-xs text-[#6B7280]">{label}</p>
            <p className="text-sm font-semibold text-[#1F2937]">{value}</p>
        </div>
    );
}
