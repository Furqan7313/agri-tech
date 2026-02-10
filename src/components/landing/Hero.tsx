"use client";

import * as React from "react";
import { Menu, Globe, Shield, Activity, TrendingUp, MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

// Hero-specific translations
const HERO_TEXT = {
    en: {
        heroTitle1: "AI-Powered Farming",
        heroTitle2: "for Punjab's Fields",
        heroSubtitle: "Real-time weather, disease alerts, and crop guidance—tailored to your land.",
        getStartedFree: "Get Started Free",
        accuracy: "Accuracy",
        monitoring: "Monitoring",
        higherYield: "Higher Yield",
        districts: "Districts",
    },
    ur: {
        heroTitle1: "AI سے چلنے والی کاشتکاری",
        heroTitle2: "پنجاب کے کھیتوں کے لیے",
        heroSubtitle: "حقیقی وقت میں موسم، بیماری کے الرٹ، اور فصل کی رہنمائی—آپ کی زمین کے مطابق۔",
        getStartedFree: "مفت شروع کریں",
        accuracy: "درستگی",
        monitoring: "نگرانی",
        higherYield: "زیادہ پیداوار",
        districts: "اضلاع",
    }
};

export function Hero() {
    const { language, setLanguage, dashboardData } = useAgri();
    const t = (key: any) => getTranslation(language, key);
    const ht = (key: keyof typeof HERO_TEXT.en) => HERO_TEXT[language]?.[key] || HERO_TEXT['en'][key];

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        const token = localStorage.getItem("access_token");
        const storedUsername = localStorage.getItem("username");
        setIsAuthenticated(!!token);
        setUsername(dashboardData?.profile?.username || storedUsername || "");
    }, [dashboardData]);

    const handleSignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("username");
        window.location.reload();
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col" dir={language === 'ur' ? 'rtl' : 'ltr'}>
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
                    <img src="/logo.png" alt="ZaraiRadar" className="h-20 sm:h-24 md:h-32 w-auto" />
                </div>

                {/* Desktop Nav Right */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-emerald-600/50 flex items-center justify-center border border-emerald-400/30">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>{username || (language === 'ur' ? 'ڈیش بورڈ' : 'Dashboard')}</span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/10 hover:text-emerald-400 gap-2 font-medium"
                                onClick={handleSignOut}
                            >
                                <LogOut className="w-4 h-4" />
                                {language === 'ur' ? 'سائن آؤٹ' : 'Sign out'}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-white font-medium hover:text-emerald-400 transition-colors">
                                {t("login")}
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-md font-bold transition-all shadow-md">
                                    {t("signup")}
                                </Button>
                            </Link>
                        </>
                    )}
                    <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-2 px-4 py-2 font-bold shadow-md transition-all"
                        onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">{language === "en" ? "اردو" : "English"}</span>
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
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div className="font-semibold text-emerald-900">
                                                {username || (language === 'ur' ? 'فعال کسان' : 'Active Farmer')}
                                            </div>
                                        </div>
                                        <Link href="/dashboard">
                                            <Button className="w-full bg-emerald-600 text-white justify-start gap-3">
                                                <Activity className="w-5 h-5" />
                                                {language === 'ur' ? 'ڈیش بورڈ پر جائیں' : 'Go to Dashboard'}
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-3 text-destructive border-destructive/20"
                                            onClick={handleSignOut}
                                        >
                                            <LogOut className="w-5 h-5" />
                                            {language === 'ur' ? 'سائن آؤٹ' : 'Sign out'}
                                        </Button>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                                <Button
                                    variant="outline"
                                    className="justify-start text-lg gap-2"
                                    onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                                >
                                    <Globe className="w-5 h-5" />
                                    {language === "en" ? "اردو" : "English"}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-32 relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                    {ht('heroTitle1')}
                    <br />
                    <span className="text-emerald-400">{ht('heroTitle2')}</span>
                </h1>

                {/* Separator Line */}
                <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/50 to-transparent my-6"></div>

                <p className="max-w-3xl text-lg sm:text-xl text-white/90 font-medium drop-shadow-md mb-10">
                    {ht('heroSubtitle')}
                </p>

                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-7 text-xl rounded-md shadow-2xl transition-transform hover:scale-105"
                    >
                        {isAuthenticated
                            ? (language === 'ur' ? 'ڈیش بورڈ پر جائیں' : 'Go to Dashboard')
                            : ht('getStartedFree')}
                    </Button>
                </Link>
            </div>

            {/* Stats Cards - Bottom */}
            {/* <div className="absolute bottom-10 w-full px-4 z-20">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard icon={Shield} value="98%" label={ht('accuracy')} />
                    <StatCard icon={Activity} value="24/7" label={ht('monitoring')} />
                    <StatCard icon={TrendingUp} value="30%" label={ht('higherYield')} />
                    <StatCard icon={MapPin} value="25+" label={ht('districts')} />
                </div>
            </div> */}
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
