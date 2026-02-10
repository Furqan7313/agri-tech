"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff, User, LogOut, Languages, ChevronDown, Bug, Wheat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAgri } from "@/context/AgriContext";
import { EditDashboardSheet } from "./EditDashboardSheet";
import { getTranslation } from "@/lib/i18n";


export function DashboardHeader() {
    const router = useRouter();
    const { language, setLanguage, dashboardData } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "");
    }, []);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "risk",
            title: language === 'ur' ? "اعلیٰ خطرہ بیماری الرٹ" : "High Risk Disease Alert",
            desc: language === 'ur' ? "آپ کے علاقے میں لیف کرل وائرس پایا گیا۔" : "Leaf Curl Virus detected in your area.",
            icon: Bug,
            color: "text-destructive",
            bg: "bg-destructive/10"
        },
        {
            id: 2,
            type: "weather",
            title: language === 'ur' ? "موسم کی تازہ کاری" : "Weather Update",
            desc: language === 'ur' ? "کل ہلکی بارش متوقع ہے۔" : "Light rain expected tomorrow.",
            icon: Wheat,
            color: "text-secondary",
            bg: "bg-secondary/10"
        }
    ]);

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setHasUnread(false);
        }
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ur' : 'en');
    };

    const handleSignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("username");
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-[#1B4332] shadow-lg" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo Only */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/zr_logo.png"
                            alt="ZaraiRadar"
                            className="h-25 lg:h-30 w-auto transition-transform hover:scale-105"
                        />
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle with Text */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="h-9 px-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors gap-2"
                        >
                            <Languages className="h-4 w-4" />
                            <span className="text-sm font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
                        </Button>

                        {/* Notifications */}
                        <DropdownMenu onOpenChange={handleOpenChange}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative cursor-pointer hover:bg-white/10 rounded-full text-white/80 hover:text-white">
                                    <Bell className="w-5 h-5" />
                                    {hasUnread && notifications.length > 0 && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-lg border-gray-100">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                                    <DropdownMenuLabel className="p-0 font-heading text-sm">
                                        {language === 'ur' ? 'نوٹیفیکیشنز' : 'Notifications'}
                                    </DropdownMenuLabel>
                                    {notifications.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 text-[10px] text-muted-foreground hover:text-destructive px-2"
                                            onClick={clearNotifications}
                                        >
                                            {language === 'ur' ? 'سب صاف کریں' : 'Clear all'}
                                        </Button>
                                    )}
                                </div>

                                {notifications.length > 0 ? (
                                    <div className="py-2">
                                        {notifications.map((n) => (
                                            <DropdownMenuItem key={n.id} className="cursor-pointer px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 mx-1 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 ${n.bg} rounded-full mt-0.5 shrink-0`}>
                                                        <n.icon className={`w-4 h-4 ${n.color}`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900 mb-0.5">{n.title}</p>
                                                        <p className="text-xs text-gray-500 leading-snug">{n.desc}</p>
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                        <BellOff className="w-8 h-8 mb-3 opacity-20" />
                                        <p className="text-sm">{language === 'ur' ? 'کوئی نوٹیفیکیشن نہیں' : 'No notifications'}</p>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Profile dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2 pl-2 pr-3 h-9 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium text-sm max-w-[100px] truncate hidden sm:inline">
                                        {dashboardData?.profile?.username || username || (language === 'ur' ? 'فعال کسان' : 'Active Farmer')}
                                    </span>
                                    <ChevronDown className="w-4 h-4 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-gray-100">
                                <DropdownMenuItem
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {language === 'ur' ? 'سائن آؤٹ' : 'Sign out'}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <EditDashboardSheet open={isEditOpen} onOpenChange={setIsEditOpen} />
        </header>
    );
}
