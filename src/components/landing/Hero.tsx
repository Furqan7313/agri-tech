"use client";

import { Sprout, TrendingUp, Shield, BarChart3 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1B4332] to-[#2D6A4F] py-20 lg:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-[#52B788]/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#D4A373]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
                        <Sprout className="w-4 h-4 text-[#52B788]" />
                        <span className="text-white/90 text-sm font-medium">Powered by Agricultural Intelligence</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Data-Driven Agriculture
                        <span className="block text-[#52B788]">for Punjab</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Empowering farmers with real-time weather insights, disease alerts, and precision farming recommendations based on trusted data sources.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <StatCard icon={<BarChart3 className="w-5 h-5" />} value="98%" label="Accuracy Rate" />
                        <StatCard icon={<Shield className="w-5 h-5" />} value="24/7" label="Monitoring" />
                        <StatCard icon={<TrendingUp className="w-5 h-5" />} value="15%" label="Yield Increase" />
                        <StatCard icon={<Sprout className="w-5 h-5" />} value="3" label="Districts" />
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F9F1" />
                </svg>
            </div>
        </section>
    );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
            <div className="flex justify-center mb-2 text-[#52B788]">{icon}</div>
            <div className="text-2xl font-bold text-white font-heading">{value}</div>
            <div className="text-sm text-white/70">{label}</div>
        </div>
    );
}
