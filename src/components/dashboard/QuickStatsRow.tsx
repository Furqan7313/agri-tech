"use client";

import { Sun, AlertTriangle, Droplets, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickStatsRow() {
    return (
        <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Weather Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Weather</p>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Sun className="w-7 h-7 text-amber-500" />
                        </div>
                        <div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-gray-900">34</span>
                                <span className="text-lg text-gray-500">°C</span>
                            </div>
                            <p className="text-sm text-gray-500">Sunny</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span>🌡️ 34°C</span>
                        <span>☁️ 24°C</span>
                    </div>
                </div>

                {/* Crop Risk Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Crop Risk</p>
                            <p className="text-base font-semibold text-amber-600">Moderate Risk</p>
                            <p className="text-xs text-gray-500">Disease & Pests</p>
                        </div>
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-md">
                            60% Risk
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                </div>

                {/* Disease Alerts Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Disease Alerts</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-red-600">2</span>
                                <span className="text-sm text-gray-500">Alerts</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 h-8 text-xs text-gray-600 hover:text-green-600 px-0"
                    >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>

                {/* Soil Moisture Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Soil Moisture</p>
                            <div className="flex items-baseline">
                                <Droplets className="w-6 h-6 text-green-500 mr-1" />
                                <span className="text-3xl font-bold text-green-600">75</span>
                                <span className="text-lg text-gray-500">%</span>
                            </div>
                            <p className="text-sm text-gray-500">Moisture</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md">
                            <span>🌱</span> in mm
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}
