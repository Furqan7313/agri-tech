"use client";

import { MapPin, Sprout, Wheat } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAgri } from "@/context/AgriContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTranslation } from "@/lib/i18n";

export function FarmerSnapshot() {
    const router = useRouter();
    const { district, province, crop, cropStage, language } = useAgri();

    const t = (key: any) => getTranslation(language, key);

    return (
        <Card className="border-[#DCFCE7] bg-[#F0FDF4] shadow-sm mb-6 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-[#DCFCE7]">

                    {/* Location */}
                    <div className="flex-1 flex items-center gap-4 p-4 md:p-6 hover:bg-[#DCFCE7]/30 transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm shrink-0 flex items-center justify-center border border-green-100">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-green-700/70 font-bold uppercase tracking-widest truncate mb-0.5">{t('location')}</p>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-lg truncate leading-tight">
                                {district || t('unknown')}, {province?.substring(0, 3) || "PB"}
                            </p>
                        </div>
                    </div>

                    {/* Crop */}
                    <div className="flex-1 flex items-center gap-4 p-4 md:p-6 hover:bg-[#DCFCE7]/30 transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm shrink-0 flex items-center justify-center border border-green-100">
                            <Wheat className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-green-700/70 font-bold uppercase tracking-widest truncate mb-0.5">{t('crop')}</p>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-lg truncate leading-tight">{crop || "Wheat"}</p>
                        </div>
                    </div>

                    {/* Stage */}
                    <div className="flex-1 flex items-center gap-4 p-4 md:p-6 hover:bg-[#DCFCE7]/30 transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm shrink-0 flex items-center justify-center border border-green-100">
                            <Sprout className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-green-700/70 font-bold uppercase tracking-widest truncate mb-0.5">{t('stage')}</p>
                            <p className="font-heading font-bold text-[#1B4332] text-sm md:text-lg truncate leading-tight">{cropStage || "Vegetative"}</p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
