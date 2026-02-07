"use client";

import {
    Sun,
    Cloud,
    CloudRain,
    Droplets,
    TrendingUp,
    Sparkles,
    Leaf,
    ChevronRight,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function WeatherRiskOverview() {
    return (
        <div className="mb-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Weather & Risk Overview
                </h2>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    <Settings className="w-4 h-4" />
                    MevWise
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 7-Day Weather Forecast */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">7-Day Weather Forecast</h3>

                    {/* Chart Area */}
                    <div className="relative h-40 mb-4">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[11px] text-gray-400">
                            <span>40°C</span>
                            <span>37°C</span>
                            <span>30°C</span>
                            <span>24°C</span>
                        </div>

                        {/* Chart area */}
                        <div className="ml-12 h-full relative">
                            {/* Grid lines */}
                            <div className="absolute inset-0">
                                <div className="h-px bg-gray-100 absolute top-0 left-0 right-0" />
                                <div className="h-px bg-gray-100 absolute top-1/3 left-0 right-0" />
                                <div className="h-px bg-gray-100 absolute top-2/3 left-0 right-0" />
                                <div className="h-px bg-gray-100 absolute bottom-8 left-0 right-0" />
                            </div>

                            {/* Yellow line chart - SVG */}
                            <svg className="w-full h-[calc(100%-32px)]" viewBox="0 0 280 80" preserveAspectRatio="none">
                                <path
                                    d="M 0,40 L 40,50 L 80,30 L 120,25 L 160,20 L 200,35 L 240,50 L 280,40"
                                    fill="none"
                                    stroke="#EAB308"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Data points */}
                                {[
                                    [0, 40], [40, 50], [80, 30], [120, 25],
                                    [160, 20], [200, 35], [240, 50], [280, 40]
                                ].map(([x, y], i) => (
                                    <circle key={i} cx={x} cy={y} r="4" fill="#EAB308" />
                                ))}
                            </svg>

                            {/* X-axis labels */}
                            <div className="flex justify-between text-[11px] text-gray-500 mt-2">
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Mon</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="text-amber-500">☀️ 1</span>
                            High 2°C
                        </span>
                        <span className="flex items-center gap-1">
                            <Cloud className="w-3.5 h-3.5 text-gray-400" />
                            Low: 24°C
                        </span>
                        <span className="flex items-center gap-1 ml-auto">
                            <span className="w-3 h-3 rounded-full bg-blue-500" />
                            Rainfall 2.2 mm in mm
                        </span>
                    </div>
                </div>

                {/* Right Column - Next 30 Days + AI Tips */}
                <div className="flex flex-col gap-4">
                    {/* Next 30 Days */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">Next 30 Days</h3>
                                <p className="text-xs text-gray-500">
                                    Increase Projection by <span className="text-green-600 font-medium">+25%</span> with AI Guidance
                                </p>
                            </div>
                            <div className="flex items-center text-green-600">
                                <TrendingUp className="w-5 h-5" />
                                <span className="text-xl font-bold">25%</span>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="relative h-24">
                            <div className="absolute left-0 top-0 bottom-5 w-8 flex flex-col justify-between text-[10px] text-gray-400">
                                <span>1.2t</span>
                                <span>1.0t</span>
                                <span>0.5t</span>
                                <span>0.0t</span>
                            </div>

                            <div className="ml-10 flex items-end justify-between h-[calc(100%-20px)] gap-3 px-2">
                                {[0.25, 0.42, 0.58, 0.83, 1.0].map((value, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full max-w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                                            style={{ height: `${value * 80}px` }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="ml-10 flex justify-between text-[10px] text-gray-500 mt-1 px-2">
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Mon</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Yield Tips */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <h3 className="text-sm font-medium text-gray-700">AI Yield Tips</h3>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Droplets className="w-4 h-4 text-blue-500" />
                                <span>Apply Fungicide in 2 Days</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Leaf className="w-4 h-4 text-green-500" />
                                <span>Increase Irrigation Next Week</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4 text-amber-500" />
                                <span>Add Fertilizer Within 7 Days</span>
                            </div>
                        </div>

                        <Button className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium">
                            Get Your Next Advice
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
