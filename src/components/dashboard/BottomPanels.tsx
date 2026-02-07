"use client";

import {
    AlertTriangle,
    Droplets,
    Thermometer,
    CheckCircle2,
    ChevronRight,
    Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgri } from "@/context/AgriContext";

export function BottomPanels() {
    const { crop, district } = useAgri();

    // Get disease alerts based on selected crop
    const getAlerts = () => {
        const alerts: Record<string, { name: string; severity: string; fields: string; action: string }[]> = {
            Wheat: [
                { name: "Wheat Leaf Rust", severity: "high", fields: "5 of 7 Fields", action: "Spray fungicide, monitor daily" },
                { name: "Stem Rust", severity: "medium", fields: "1 of 7 Fields", action: "Consider fungicide treatment" },
            ],
            Cotton: [
                { name: "Cotton Leaf Curl Virus", severity: "high", fields: "3 of 5 Fields", action: "Remove infected plants, spray pesticide" },
                { name: "Pink Bollworm", severity: "medium", fields: "2 of 5 Fields", action: "Apply pheromone traps" },
            ],
            Corn: [
                { name: "Corn Leaf Blight", severity: "high", fields: "5 of 7 Fields", action: "Spray fungicide, monitor daily" },
                { name: "Stem Rust", severity: "medium", fields: "1 of 7 Fields", action: "Consider fungicide treatment" },
            ],
            Rice: [
                { name: "Rice Blast", severity: "high", fields: "4 of 6 Fields", action: "Apply systemic fungicide" },
                { name: "Bacterial Leaf Blight", severity: "medium", fields: "2 of 6 Fields", action: "Improve drainage, apply copper spray" },
            ],
            default: [
                { name: "Leaf Blight", severity: "high", fields: "5 of 7 Fields", action: "Spray fungicide, monitor daily" },
                { name: "Stem Rust", severity: "medium", fields: "1 of 7 Fields", action: "Consider fungicide treatment" },
            ],
        };
        return alerts[crop || "default"] || alerts.default;
    };

    const alerts = getAlerts();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Disease Alerts Panel */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900">Disease Alerts</h3>
                    <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium">
                        {alerts.length} Alerts
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Alert Items */}
                <div className="divide-y divide-gray-100">
                    {alerts.map((alert, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 ${alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'} rounded-lg flex items-center justify-center mt-0.5 shrink-0`}>
                                    <AlertTriangle className={`w-4 h-4 ${alert.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900">{alert.name}</h4>
                                        <span className="text-xs text-gray-500 shrink-0">{district || "Multan"}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Fields • {alert.fields}
                                    </p>
                                    <p className="text-xs text-gray-600">{alert.action}</p>
                                    <p className="text-[11px] text-gray-400 mt-2">{index === 0 ? '2 hours ago' : '1 day ago'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium flex items-center justify-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Soil Conditions Panel */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden relative">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=60')`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-base font-semibold text-gray-900">Soil Conditions</h3>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Droplets className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Optimal (<span className="text-green-600 font-medium">75%</span>)
                                    </p>
                                    <p className="text-sm text-gray-500">Soil Temperature</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end">
                                    <Thermometer className="w-4 h-4 text-red-400" />
                                    <span className="text-lg font-bold text-gray-900">28°C</span>
                                </div>
                                <div className="flex items-center gap-1 justify-end text-sm text-gray-500">
                                    <Leaf className="w-3.5 h-3.5 text-green-500" />
                                    <span>PH-6.2</span>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-700">
                                Ideal conditions for {crop?.toLowerCase() || 'crop'} growth!
                            </span>
                        </div>

                        {/* CTA */}
                        <Button className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium">
                            Get Your Next Advice
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
