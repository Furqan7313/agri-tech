"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Wheat, ArrowRight, Loader2 } from "lucide-react";
import { useAgri, District, Crop } from "@/context/AgriContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const districts: District[] = ["Multan", "Jhelum", "Khanewal"];
const crops: Crop[] = ["Wheat", "Cotton"];

const districtInfo: Record<District, { climate: string; soil: string }> = {
    Multan: { climate: "Hot Semi-Arid", soil: "Alluvial Plains" },
    Jhelum: { climate: "Humid Subtropical", soil: "Pothohar Plateau" },
    Khanewal: { climate: "Hot Semi-Arid", soil: "Alluvial Plains" },
};

export function SelectionCard() {
    const router = useRouter();
    const { district, crop, setDistrict, setCrop, isSelectionComplete } = useAgri();
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = async () => {
        if (!isSelectionComplete) return;
        setIsLoading(true);
        // Simulate brief loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push("/dashboard");
    };

    return (
        <section className="py-16 lg:py-24 bg-[#F8F9F1]">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1B4332] mb-4">
                            Start Your Analysis
                        </h2>
                        <p className="text-[#6B7280] text-lg">
                            Select your location and crop to receive personalized agricultural insights
                        </p>
                    </div>

                    {/* Selection Card */}
                    <Card className="border-[#E5E7EB] shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white rounded-t-xl">
                            <CardTitle className="font-heading text-xl flex items-center gap-2">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                Scope Anchor
                            </CardTitle>
                            <CardDescription className="text-white/80">
                                Define your agricultural context for precise recommendations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8 space-y-6">
                            {/* District Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#1F2937] flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#1B4332]" />
                                    Select District
                                </label>
                                <Select value={district || ""} onValueChange={(value) => setDistrict(value as District)}>
                                    <SelectTrigger className="h-12 border-[#E5E7EB] focus:ring-[#1B4332] focus:border-[#1B4332]">
                                        <SelectValue placeholder="Choose your district" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((d) => (
                                            <SelectItem key={d} value={d} className="cursor-pointer">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{d}</span>
                                                    <span className="text-xs text-[#6B7280]">
                                                        {districtInfo[d].climate} • {districtInfo[d].soil}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Crop Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#1F2937] flex items-center gap-2">
                                    <Wheat className="w-4 h-4 text-[#D4A373]" />
                                    Select Crop
                                </label>
                                <Select value={crop || ""} onValueChange={(value) => setCrop(value as Crop)}>
                                    <SelectTrigger className="h-12 border-[#E5E7EB] focus:ring-[#1B4332] focus:border-[#1B4332]">
                                        <SelectValue placeholder="Choose your crop" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {crops.map((c) => (
                                            <SelectItem key={c} value={c} className="cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{c}</span>
                                                    <span className="text-xs px-2 py-0.5 bg-[#F3F4F6] rounded-full text-[#6B7280]">
                                                        {c === "Wheat" ? "Rabi Season" : "Kharif Season"}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* District Info Card */}
                            {district && (
                                <div className="p-4 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] animate-fade-in-up">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-[#1B4332]/10 rounded-lg">
                                            <MapPin className="w-4 h-4 text-[#1B4332]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1F2937]">{district} District</p>
                                            <p className="text-sm text-[#6B7280]">
                                                Climate: {districtInfo[district].climate}
                                            </p>
                                            <p className="text-sm text-[#6B7280]">
                                                Soil Type: {districtInfo[district].soil}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Proceed Button */}
                            <Button
                                onClick={handleProceed}
                                disabled={!isSelectionComplete || isLoading}
                                className="w-full h-12 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Loading Dashboard...
                                    </>
                                ) : (
                                    <>
                                        View Dashboard
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
