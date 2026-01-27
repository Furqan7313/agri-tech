"use client";

import { FlaskConical, Leaf, Droplets, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface FertilizerCardProps {
    crop: Crop;
}

// NPK ratios based on crop
const getNPKData = (crop: Crop, language: string) => {
    const isUrdu = language === 'ur';
    const npkRatios: Record<Crop, { nitrogen: number; phosphorus: number; potassium: number; notes: string }> = {
        Wheat: {
            nitrogen: 120,
            phosphorus: 60,
            potassium: 40,
            notes: isUrdu
                ? "نائٹروجن کو الگ الگ خوراکوں میں ڈالیں: 50٪ بوائی کے وقت، 50٪ ٹلیرنگ کے مرحلے پر۔"
                : "Apply nitrogen in split doses: 50% at sowing, 50% at tillering stage",
        },
        Cotton: {
            nitrogen: 150,
            phosphorus: 75,
            potassium: 50,
            notes: isUrdu
                ? "بہتر فائبر کے معیار کے لیے پوٹاشیم میں اضافہ کریں۔ پھول آنے پر فولیئر اسپرے کریں۔"
                : "Increase potassium for better fiber quality. Apply foliar spray at flowering",
        },
    };
    return npkRatios[crop];
};

export function FertilizerCard({ crop }: FertilizerCardProps) {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);
    const npkData = getNPKData(crop, language);
    const total = npkData.nitrogen + npkData.phosphorus + npkData.potassium;

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300">
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
                        <p className="text-2xl font-bold text-[#1B4332] font-heading">{npkData.nitrogen}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#1B4332] rounded-full"
                                style={{ width: `${(npkData.nitrogen / total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Phosphorus */}
                    <div className="text-center p-4 bg-[#D4A373]/5 rounded-xl border border-[#D4A373]/10 hover:border-[#D4A373]/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#D4A373] rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{t('phosphorus')}</p>
                        <p className="text-2xl font-bold text-[#D4A373] font-heading">{npkData.phosphorus}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#D4A373] rounded-full"
                                style={{ width: `${(npkData.phosphorus / total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Potassium */}
                    <div className="text-center p-4 bg-[#52B788]/5 rounded-xl border border-[#52B788]/10 hover:border-[#52B788]/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#52B788] rounded-full flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-[#6B7280] mb-1">{t('potassium')}</p>
                        <p className="text-2xl font-bold text-[#52B788] font-heading">{npkData.potassium}</p>
                        <p className="text-xs text-[#6B7280]">{t('kgAcre')}</p>
                        <div className="mt-2 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#52B788] rounded-full"
                                style={{ width: `${(npkData.potassium / total) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Application Notes */}
                <div className="p-3 bg-[#F8F9F1] rounded-lg border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">{t('appGuidance')}</p>
                    <p className="text-sm text-[#1F2937]">{npkData.notes}</p>
                </div>
            </CardContent>
        </Card>
    );
}
