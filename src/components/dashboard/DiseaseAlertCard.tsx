"use client";

import { AlertTriangle, Bug, Info, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { District, Crop } from "@/context/AgriContext";

interface DiseaseAlertCardProps {
    district: District;
    crop: Crop;
}

// Simulated disease data
const getDiseaseData = (district: District, crop: Crop) => {
    const diseases: Record<Crop, { name: string; severity: "low" | "medium" | "high"; symptoms: string[]; treatment: string }> = {
        Wheat: {
            name: "Yellow Rust",
            severity: "medium",
            symptoms: ["Yellow-orange pustules on leaves", "Striped pattern along veins"],
            treatment: "Apply fungicide (Propiconazole) within 48 hours",
        },
        Cotton: {
            name: "Leaf Curl Virus",
            severity: "high",
            symptoms: ["Upward curling of leaves", "Stunted plant growth", "Thickened leaf veins"],
            treatment: "Remove infected plants, apply systemic insecticide for whitefly control",
        },
    };
    return diseases[crop];
};

const severityConfig = {
    low: {
        color: "bg-[#52B788]",
        textColor: "text-[#52B788]",
        bgLight: "bg-[#52B788]/10",
        label: "Low Alert",
    },
    medium: {
        color: "bg-[#E9C46A]",
        textColor: "text-[#D4A373]",
        bgLight: "bg-[#E9C46A]/10",
        label: "Medium Alert",
    },
    high: {
        color: "bg-[#E63946]",
        textColor: "text-[#E63946]",
        bgLight: "bg-[#E63946]/10",
        label: "High Alert",
    },
};

export function DiseaseAlertCard({ district, crop }: DiseaseAlertCardProps) {
    const disease = getDiseaseData(district, crop);
    const config = severityConfig[disease.severity];

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 ${config.bgLight} rounded-lg`}>
                            <Bug className={`w-5 h-5 ${config.textColor}`} />
                        </div>
                        Disease Alert
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 ${config.color} rounded-full animate-pulse-warning`} />
                        <Badge variant="outline" className={`${config.textColor} border-current`}>
                            {config.label}
                        </Badge>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Disease Name & Warning */}
                <div className={`flex items-start gap-3 p-3 ${config.bgLight} rounded-lg`}>
                    <AlertTriangle className={`w-5 h-5 ${config.textColor} flex-shrink-0 mt-0.5 animate-pulse-warning`} />
                    <div>
                        <p className={`font-semibold ${config.textColor}`}>{disease.name}</p>
                        <p className="text-sm text-[#6B7280]">Detected risk in {district} district</p>
                    </div>
                </div>

                {/* Symptoms */}
                <div>
                    <p className="text-xs text-[#6B7280] mb-2 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Key Symptoms to Watch
                    </p>
                    <ul className="space-y-1">
                        {disease.symptoms.map((symptom, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#1F2937]">
                                <span className={`w-1.5 h-1.5 ${config.color} rounded-full mt-2 flex-shrink-0`} />
                                {symptom}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Treatment */}
                <div className="pt-3 border-t border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-2">Recommended Action:</p>
                    <p className="text-sm text-[#1F2937] font-medium">{disease.treatment}</p>
                </div>

                {/* Action Button */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
                        >
                            View Treatment Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2 text-xl font-heading">
                                <Bug className={`w-6 h-6 ${config.textColor}`} />
                                {disease.name}
                            </SheetTitle>
                            <SheetDescription>
                                Detected in {district} district for {crop} crop.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-6">
                            {/* Severity Badge */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Severity Level:</span>
                                <Badge variant="outline" className={`${config.textColor} border-current`}>
                                    {config.label}
                                </Badge>
                            </div>

                            {/* Symptoms Section */}
                            <div>
                                <h4 className="flex items-center gap-2 font-semibold text-[#1B4332] mb-3">
                                    <Info className="w-4 h-4" />
                                    Identified Symptoms
                                </h4>
                                <ul className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    {disease.symptoms.map((symptom, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-[#1F2937]">
                                            <span className={`w-2 h-2 ${config.color} rounded-full mt-1.5 flex-shrink-0`} />
                                            {symptom}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Treatment Section */}
                            <div>
                                <h4 className="flex items-center gap-2 font-semibold text-[#1B4332] mb-3">
                                    <div className="p-1 bg-[#1B4332] rounded">
                                        <Bug className="w-3 h-3 text-white" />
                                    </div>
                                    Recommended Treatment
                                </h4>
                                <div className="p-4 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                                    <p className="text-sm text-[#1F2937] leading-relaxed">
                                        {disease.treatment}
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
                                        * Please consult with a local agricultural expert before applying chemical treatments.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}
