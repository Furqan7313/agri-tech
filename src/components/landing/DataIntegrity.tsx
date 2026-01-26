"use client";

import { Shield, CheckCircle } from "lucide-react";

export function DataIntegrity() {
    return (
        <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-full px-4 py-2 mb-4">
                            <Shield className="w-4 h-4 text-[#1B4332]" />
                            <span className="text-[#1B4332] text-sm font-medium">Data Integrity</span>
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1B4332] mb-4">
                            Trusted Data Sources
                        </h2>
                        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                            Our recommendations are powered by verified, authoritative agricultural and meteorological data
                        </p>
                    </div>

                    {/* Source Logos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PMD Card */}
                        <div className="group p-6 lg:p-8 bg-[#F8F9F1] rounded-xl border border-[#E5E7EB] hover:border-[#1B4332]/30 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#1B4332] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-white font-heading font-bold text-lg">PMD</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading text-lg font-semibold text-[#1F2937] mb-2">
                                        Pakistan Meteorological Department
                                    </h3>
                                    <p className="text-[#6B7280] text-sm mb-4">
                                        Real-time weather forecasts, climate analysis, and seasonal predictions for accurate farming decisions.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <DataBadge>Weather Forecasts</DataBadge>
                                        <DataBadge>Climate Data</DataBadge>
                                        <DataBadge>Rainfall Analysis</DataBadge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAO Card */}
                        <div className="group p-6 lg:p-8 bg-[#F8F9F1] rounded-xl border border-[#E5E7EB] hover:border-[#D4A373]/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#D4A373] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-white font-heading font-bold text-lg">FAO</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading text-lg font-semibold text-[#1F2937] mb-2">
                                        Food and Agriculture Organization
                                    </h3>
                                    <p className="text-[#6B7280] text-sm mb-4">
                                        Global agricultural best practices, crop management guidelines, and food security insights.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <DataBadge>Crop Guidelines</DataBadge>
                                        <DataBadge>Soil Health</DataBadge>
                                        <DataBadge>Best Practices</DataBadge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-12">
                        <TrustIndicator icon={<CheckCircle className="w-5 h-5 text-[#52B788]" />} text="Verified Sources" />
                        <TrustIndicator icon={<CheckCircle className="w-5 h-5 text-[#52B788]" />} text="Updated Daily" />
                        <TrustIndicator icon={<CheckCircle className="w-5 h-5 text-[#52B788]" />} text="Localized Data" />
                        <TrustIndicator icon={<CheckCircle className="w-5 h-5 text-[#52B788]" />} text="Expert Reviewed" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function DataBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#1B4332] bg-[#1B4332]/10 rounded-full">
            {children}
        </span>
    );
}

function TrustIndicator({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-2 text-[#6B7280]">
            {icon}
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}
