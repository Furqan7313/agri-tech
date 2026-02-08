"use client";

import { useState } from "react";
import { Calendar, CheckCircle, MapPin, Leaf, Send, Download, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crop, District, useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

interface NewSowingCalendarProps {
    crop: Crop;
    district: District;
}

// Demo calendar data
const DEMO_MONTHS = [
    { month: "Jan", status: "off_season" },
    { month: "Feb", status: "optimal", is_current: true },
    { month: "Mar", status: "optimal" },
    { month: "Apr", status: "off_season" },
    { month: "May", status: "off_season" },
    { month: "Jun", status: "off_season" },
    { month: "Jul", status: "off_season" },
    { month: "Aug", status: "off_season" },
    { month: "Sep", status: "off_season" },
    { month: "Oct", status: "sowing_window" },
    { month: "Nov", status: "sowing_window" },
    { month: "Dec", status: "off_season" },
];

const DEMO_SEASONAL = {
    status: "passed",
    months: DEMO_MONTHS,
    recommendation: "Optimal sowing window has passed. Consider early maturing varieties if planting now. Current conditions favor vegetative growth stage management.",
    sowing_period: "Oct 15 - Nov 30",
    optimal_dates: "Nov 1 - Nov 15",
    season_type: "Rabi Season"
};

export function NewSowingCalendar({ crop, district }: NewSowingCalendarProps) {
    const { language, dashboardData, isDashboardLoading } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    // Use API data if available, otherwise use demo data
    const data = dashboardData?.seasonal || DEMO_SEASONAL;
    const displayMonths = data.months || DEMO_MONTHS;

    const [acknowledgedFeedback, setAcknowledgedFeedback] = useState(false);
    const [whatsappFeedback, setWhatsappFeedback] = useState(false);
    const [downloadFeedback, setDownloadFeedback] = useState(false);

    const handleAcknowledge = () => {
        setAcknowledgedFeedback(true);
        setTimeout(() => setAcknowledgedFeedback(false), 2000);
    };

    const handleWhatsAppReminder = () => {
        setWhatsappFeedback(true);
        setTimeout(() => setWhatsappFeedback(false), 2500);
    };

    const handleDownloadReport = () => {
        setDownloadFeedback(true);
        setTimeout(() => setDownloadFeedback(false), 2000);
    };

    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
            <CardHeader className="pb-4 pt-5 px-5 border-b border-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="font-heading text-base flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <span className="text-gray-800 font-semibold block">
                                Seasonal Guidance & Sowing Calendar
                            </span>
                            <span className="text-xs text-gray-400 font-normal flex items-center gap-1 mt-0.5">
                                <Leaf className="w-3 h-3 text-amber-500" />
                                {DEMO_SEASONAL.season_type} • {crop || "Wheat"}
                            </span>
                        </div>
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-700 flex items-center gap-1.5 px-3 py-1.5 rounded-full border-0 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>SOWING COMPLETE</span>
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-5">
                {/* Month Timeline */}
                <div className="flex gap-1.5 overflow-x-auto pb-3 mb-5">
                    {displayMonths.map((month: any, idx: number) => {
                        const displayName = month.month || month.name;
                        const isOptimal = month.status === "optimal" || month.status === "sowing_window";
                        const isCurrent = month.is_current;

                        return (
                            <div
                                key={idx}
                                className={`relative min-w-[52px] px-3 py-2.5 rounded-lg text-center text-xs font-semibold transition-colors ${isOptimal
                                    ? "bg-[#1B4332] text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {isCurrent && (
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                                )}
                                <span className={`${isOptimal ? 'text-white/70' : 'text-gray-400'} text-[9px] block mb-0.5 uppercase`}>
                                    {isCurrent ? 'Now' : ''}
                                </span>
                                <span className="text-sm font-bold">{displayName?.substring(0, 3)}</span>
                                {isOptimal && (
                                    <div className="mt-1 w-1 h-1 bg-green-300 rounded-full mx-auto" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                    <div className="p-3.5 bg-green-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Region</p>
                                <p className="font-semibold text-gray-700 text-sm">{district || "Multan"}, Punjab</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Optimal Sowing</p>
                                <p className="font-semibold text-gray-700 text-sm">{DEMO_SEASONAL.optimal_dates}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3.5 bg-cyan-50 rounded-xl border border-cyan-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center">
                                <Leaf className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Season</p>
                                <p className="font-semibold text-gray-700 text-sm">{DEMO_SEASONAL.season_type}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendation Text */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 mb-5">
                    <p className="text-xs uppercase tracking-wide font-semibold text-green-700 mb-1.5 flex items-center gap-1.5">
                        <Leaf className="w-4 h-4" />
                        Expert Recommendation
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{data.recommendation}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                    <Button
                        className={`flex-1 min-w-[180px] rounded-lg h-10 text-sm font-medium transition-colors ${acknowledgedFeedback ? 'bg-green-500 hover:bg-green-500' : 'bg-[#1B4332] hover:bg-[#2D5A47]'} text-white`}
                        onClick={handleAcknowledge}
                    >
                        {acknowledgedFeedback ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                All Acknowledged!
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Acknowledge All
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className={`flex-1 min-w-[180px] border rounded-lg h-10 text-sm font-medium transition-colors ${whatsappFeedback ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        onClick={handleWhatsAppReminder}
                    >
                        {whatsappFeedback ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Reminder Sent!
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                WhatsApp Reminder
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className={`flex-1 min-w-[180px] border rounded-lg h-10 text-sm font-medium transition-colors ${downloadFeedback ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        onClick={handleDownloadReport}
                    >
                        {downloadFeedback ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Downloaded!
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2" />
                                Download Report
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
