"use client";

import { useState, useRef } from "react";
import { Upload, Camera, Trash2, CheckCircle, AlertTriangle, Scan, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function DiseasePredictionCard() {
    const { language } = useAgri();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const clearSelection = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/predict/disease`,
                {
                    method: "POST",
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Analysis failed");
            }

            const data = await res.json();
            setResult(data.prediction);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const t = (key: string) => {
        const translations: any = {
            en: {
                title: "Disease Diagnosis",
                desc: "Upload a photo of wheat leaf to detect rust diseases.",
                uploadBtn: "Select Image",
                snapBtn: "Snap Photo",
                analyzeBtn: "Analyze for Diseases",
                analyzing: "Scanning Image...",
                resultTitle: "Diagnosis Result",
                confidence: "Confidence Score",
                recommendation: "Treatment Advice",
                reScan: "Try Another Image",
                healthy: "Everything looks healthy!",
                warning: "Disease Detected",
            },
            ur: {
                title: "بیماری کی تشخیص",
                desc: "گندم کے پتے کی تصویر اپ لوڈ کریں تاکہ زنگ کی بیماریوں کا پتہ لگایا جا سکے۔",
                uploadBtn: "تصویر منتخب کریں",
                snapBtn: "تصویر کھینچیں",
                analyzeBtn: "بیماری کی تشخیص کریں",
                analyzing: "تجزیہ کیا جا رہا ہے...",
                resultTitle: "تشخیصی نتیجہ",
                confidence: "یقینی حد",
                recommendation: "علاج کی تجویز",
                reScan: "دوسری تصویر آزمائیں",
                healthy: "سب کچھ صحت مند لگ رہا ہے!",
                warning: "بیماری کا پتہ چلا",
            }
        };
        return translations[language]?.[key] || translations['en'][key];
    };

    return (
        <Card className="overflow-hidden border-none shadow-md bg-white">
            <CardHeader className="bg-gradient-to-r text-black pb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Scan className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-heading">{t('title')}</CardTitle>
                        <CardDescription className="text-black text-xs">
                            {t('desc')}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                {!previewUrl && !result ? (
                    <div
                        onClick={handleUploadClick}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                    >
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-emerald-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">{t('uploadBtn')}</p>
                            <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {previewUrl && !result && (
                            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 shadow-inner group">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={clearSelection}
                                        className="h-8 rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                                    </Button>
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className={`p-4 rounded-xl border-l-4 ${result.disease === 'Healthy' ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {result.disease === 'Healthy' ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                                        )}
                                        <h3 className="font-bold text-gray-900">{result.disease}</h3>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${result.disease === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {result.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white/60 p-2 rounded-lg">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-bold">{t('confidence')}</p>
                                        <p className="text-lg font-bold text-gray-800">{result.confidence.toFixed(1)}%</p>
                                    </div>
                                    <div className="bg-white/60 p-2 rounded-lg">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-bold">Severity</p>
                                        <p className="text-lg font-bold text-gray-800">{result.severity}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">{t('recommendation')}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-white/40 p-3 rounded-lg border border-white/60 shadow-sm italic">
                                        "{result.recommendation}"
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {!result ? (
                                <Button
                                    onClick={analyzeImage}
                                    disabled={isAnalyzing || !selectedImage}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl shadow-md transition-all active:scale-[0.98]"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            {t('analyzing')}
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-4 h-4 mr-2" />
                                            {t('analyzeBtn')}
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={clearSelection}
                                    className="flex-1 border-gray-200 text-gray-600 h-11 rounded-xl"
                                >
                                    {t('reScan')}
                                </Button>
                            )}
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 text-center animate-shake">{error}</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
