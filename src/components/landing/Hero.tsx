"use client";

import * as React from "react";
import { Menu, Globe, Shield, Activity, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function Hero() {
    const { language, setLanguage } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/final-bg.png?t=99"
                    alt="Agriculture Background"
                    className="w-full h-full object-cover object-bottom"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Navbar */}
            <nav className="absolute top-0 w-full flex items-center justify-between px-6 py-1 z-50">
                {/* Logo Left */}
                <div className="flex items-center">
                    <img src="/logo-transparent.png" alt="ZaraiRadar" className="h-20 sm:h-24 md:h-32 w-auto" />
                </div>

                {/* Desktop Nav Right */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/login" className="text-white font-medium hover:text-emerald-400 transition-colors">
                        {t("login")}
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-md font-bold transition-all shadow-md">
                            {t("signup")}
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 rounded-full"
                        onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                    >
                        <Globe className="w-6 h-6" />
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="w-7 h-7" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-4 mt-8">
                                <Link href="/login">
                                    <Button variant="ghost" className="w-full justify-start text-lg">
                                        {t("login")}
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="w-full bg-emerald-600 text-white">
                                        {t("signup")}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="justify-start text-lg"
                                    onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                                >
                                    <Globe className="mr-2" />
                                    {language === "en" ? "Urdu" : "English"}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-32 relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                    AI-Powered Farming
                    <br />
                    <span className="text-emerald-400">for Punjab’s Fields</span>
                </h1>

                {/* Separator Line */}
                <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/50 to-transparent my-6"></div>

                <p className="max-w-3xl text-lg sm:text-xl text-white/90 font-medium drop-shadow-md mb-10">
                    Real-time weather, disease alerts, and crop guidance—tailored to your land.
                </p>

                <Link href="/signup">
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-7 text-xl rounded-md shadow-2xl transition-transform hover:scale-105"
                    >
                        Get Started Free
                    </Button>
                </Link>
            </div>

            {/* Stats Cards - Bottom */}
            <div className="absolute bottom-10 w-full px-4 z-20">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard icon={Shield} value="98%" label="Accuracy" />
                    <StatCard icon={Activity} value="24/7" label="Monitoring" />
                    <StatCard icon={TrendingUp} value="30%" label="Higher Yield" />
                    <StatCard icon={MapPin} value="25+" label="Districts" />
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon: Icon, value, label }: any) {
    return (
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 text-left border border-white/10 shadow-lg group hover:bg-black/60 transition-colors">
            <div className="p-2 sm:p-3 bg-white/10 rounded-full">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
                <div className="text-xs sm:text-sm text-white/80">{label}</div>
            </div>
        </div>
    );
}
