"use client";

import { Sparkles, AlertTriangle, Bug, ChevronRight, Bell } from "lucide-react";

export function RiskCardsRow() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 mb-6 divide-y divide-gray-100">
            {/* Moderate Disease Risk */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Moderate Disease Risk</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Highlight Disease Alerts */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Highlight Disease Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        2 in trimest
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Moderate Pest Risk */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Bug className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Moderate Pest Risk</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Bell className="w-3 h-3" />
                        2 new alerts
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </div>
    );
}
