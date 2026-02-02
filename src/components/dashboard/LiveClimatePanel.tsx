"use client";

import { CloudRain, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

/** API response: ClimateData (temp_c, humidity, wind_kph, chance_of_rain, condition, datetime) */
interface ClimateDataItem {
    datetime: string;
    temp_c: number;
    humidity: number;
    wind_kph: number;
    chance_of_rain: number;
    condition: string;
}

interface ClimateResponse {
    district: string;
    province: string;
    lat: number;
    lon: number;
    data: ClimateDataItem[];
}

export function LiveClimatePanel() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [lastUpdated, setLastUpdated] = useState("justNow");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [climate, setClimate] = useState<ClimateResponse | null>(null);

    const fetchClimate = useCallback(async () => {
        if (typeof window === "undefined") return;
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/dashboard/climate`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(typeof window !== "undefined" && localStorage.getItem("access_token")
                            ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            : {}),
                    },
                    signal: controller.signal,
                }
            );
            clearTimeout(timeoutId);
            if (res.status === 401) {
                setLoading(false);
                if (typeof window !== "undefined") {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("user_email");
                    localStorage.removeItem("username");
                    window.location.href = "/login";
                }
                return;
            }
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Failed to load climate");
            }
            const json: ClimateResponse = await res.json();
            setClimate(json);
            setLastUpdated("justNow");
        } catch (e) {
            const message = e instanceof Error ? e.message : "Failed to load climate";
            setError(e instanceof Error && e.name === "AbortError" ? "Request timed out. Try again." : message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        fetchClimate();
    }, [fetchClimate]);

    const handleRefresh = () => {
        fetchClimate();
    };

    const item = climate?.data?.[0];
    const location = climate ? [climate.district, climate.province].filter(Boolean).join(", ") : "";

    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden h-full">
            <CardHeader className="pb-4 pt-6 px-6 flex flex-row items-center justify-between border-b border-gray-50">
                <CardTitle className="font-heading text-lg flex items-center gap-3 text-[#1B4332]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-blue-600" />
                    </div>
                    {t('liveClimate')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide hidden sm:inline-block">
                        {t('updated')} {t(lastUpdated)}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="h-8 w-8 hover:bg-gray-50 rounded-full"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {error && (
                    <div className="mb-4 py-3 px-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                        {error}
                    </div>
                )}
                {loading && !climate && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4332]" />
                    </div>
                )}
                {!loading && item && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-start">
                                    <span className="text-5xl font-bold text-[#1F2937] font-heading tracking-tight">
                                        {Math.round(item.temp_c)}°
                                    </span>
                                    <span className="text-2xl text-gray-400 font-medium mt-1.5 ml-0.5">C</span>
                                </div>
                                <div className="pl-4 border-l border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">{item.condition}</p>
                                    <p className="text-xs text-gray-500">{location || "—"}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100">
                                    <CloudRain className="w-3 h-3 mr-1.5" />
                                    {item.chance_of_rain <= 20 ? t('lowRainChance') : `${item.chance_of_rain}% ${t('precip')}`}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <ClimateMetric
                                icon={<Droplets className="w-4 h-4" />}
                                label={t('humidity')}
                                value={`${item.humidity}%`}
                                color="text-blue-500"
                                bg="bg-blue-50"
                                borderColor="border-blue-100"
                            />
                            <ClimateMetric
                                icon={<Wind className="w-4 h-4" />}
                                label={t('wind')}
                                value={`${Math.round(item.wind_kph)} km/h`}
                                color="text-slate-500"
                                bg="bg-slate-50"
                                borderColor="border-slate-100"
                            />
                            <ClimateMetric
                                icon={<CloudRain className="w-4 h-4" />}
                                label={t('precip')}
                                value={`${item.chance_of_rain}%`}
                                color="text-cyan-500"
                                bg="bg-cyan-50"
                                borderColor="border-cyan-100"
                            />
                        </div>
                    </>
                )}
                {!loading && !item && !error && (
                    <div className="py-8 text-center text-gray-500 text-sm">
                        No climate data. Complete your farm setup first.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ClimateMetric({ icon, label, value, color, bg, borderColor }: { icon: React.ReactNode, label: string, value: string, color: string, bg: string, borderColor: string }) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${borderColor} ${bg} transition-transform hover:-translate-y-1 duration-200`}>
            <div className={`mb-2 ${color}`}>
                {icon}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{label}</p>
            <p className="font-heading font-bold text-gray-800 text-lg">{value}</p>
        </div>
    )
}
