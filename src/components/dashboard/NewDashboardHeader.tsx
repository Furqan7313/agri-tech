"use client";

import { Bell, ChevronDown, Languages, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function NewDashboardHeader() {
    const { language, setLanguage } = useAgri();
    const router = useRouter();
    const t = (key: any) => getTranslation(language, key);

    const [username, setUsername] = useState<string>("User");
    const [notifications, setNotifications] = useState([
        { id: 1, title: language === 'ur' ? "🌧️ کل بارش متوقع ہے" : "🌧️ Rain expected tomorrow", time: language === 'ur' ? "2 گھنٹے پہلے" : "2h ago", unread: true },
        { id: 2, title: language === 'ur' ? "🌾 آبپاشی کا بہترین وقت" : "🌾 Optimal irrigation time", time: language === 'ur' ? "5 گھنٹے پہلے" : "5h ago", unread: true },
        { id: 3, title: language === 'ur' ? "✨ نئی فصل کی معلومات" : "✨ New crop insights available", time: language === 'ur' ? "1 دن پہلے" : "1d ago", unread: false },
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUsername(localStorage.getItem("username") || (language === 'ur' ? "کسان" : "Farmer"));
        }
    }, [language]);

    const handleSignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("district");
        localStorage.removeItem("crop");
        localStorage.removeItem("province");
        localStorage.removeItem("cropStage");
        localStorage.removeItem("farmSize");
        localStorage.removeItem("irrigationType");
        localStorage.removeItem("soilType");
        router.push("/login");
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ur' : 'en');
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="sticky top-0 z-50 w-full bg-[#1B4332] shadow-md" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Only */}
                    <Link href="/dashboard" className="flex items-center">
                        <img
                            src="/logo-transparent.png"
                            alt="ZaraiRadar"
                            className="h-12 w-auto"
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

                        {/* Notification Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative h-9 w-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <Bell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-72 rounded-lg border border-gray-100 shadow-xl bg-white p-1.5">
                                <div className="px-3 py-2 mb-1 bg-green-50 rounded-lg">
                                    <p className="font-heading font-semibold text-gray-800 text-sm">
                                        {t('notifications')}
                                    </p>
                                </div>
                                <DropdownMenuSeparator className="bg-gray-100" />
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={`rounded-lg p-2.5 cursor-pointer transition-colors ${notification.unread ? 'bg-green-50/50 hover:bg-green-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-start gap-2.5 w-full">
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-700">{notification.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{notification.time}</p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-9 px-2.5 rounded-lg text-white hover:bg-white/10 transition-colors gap-2"
                                >
                                    <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-white/60" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-lg border border-gray-100 shadow-xl bg-white p-1.5">
                                <div className="px-3 py-2 mb-1 bg-amber-50 rounded-lg">
                                    <p className="font-heading font-semibold text-gray-800 text-sm">{username}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        {language === 'ur' ? 'فعال کسان' : 'Active Farmer'}
                                    </p>
                                </div>
                                <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="rounded-lg p-2.5 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t('signOut')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
