"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wheat, Settings, Sprout, Bell, Bug, BellOff, User, LogOut, Languages, ChevronDown } from "lucide-react";
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
    const { language, setLanguage } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "Profile");
    }, []);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "risk",
            title: "High Risk Disease Alert",
            desc: "Leaf Curl Virus detected in your area.",
            icon: Bug,
            color: "text-destructive",
            bg: "bg-destructive/10"
        },
        {
            id: 2,
            type: "weather",
            title: "Weather Update",
            desc: "Light rain expected tomorrow.",
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

    const handleSignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("username");
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-lg">
                            <Sprout className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-heading text-lg lg:text-xl font-bold text-primary hidden sm:block">
                            ZaraiRadar
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <DropdownMenu onOpenChange={handleOpenChange}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative cursor-pointer hover:bg-muted/50 rounded-full">
                                    <Bell className="w-5 h-5 text-muted-foreground" />
                                    {hasUnread && notifications.length > 0 && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-lg border-gray-100">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                                    <DropdownMenuLabel className="p-0 font-heading text-sm">{t('notifications')}</DropdownMenuLabel>
                                    {notifications.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 text-[10px] text-muted-foreground hover:text-destructive px-2"
                                            onClick={clearNotifications}
                                        >
                                            {t('clearAll')}
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
                                        <p className="text-sm">{t('noNotifications')}</p>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Language Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
                            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                            title={language === 'en' ? "Switch to Urdu" : "Switch to English"}
                        >
                            <Languages className="w-5 h-5" />
                        </Button>

                        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

                        {/* Profile dropdown: username, Settings, Log out */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2 pl-2 pr-3 h-9 rounded-full hover:bg-muted/50"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="font-medium text-sm text-foreground max-w-[120px] truncate hidden sm:inline">
                                        {username}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-gray-100">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-xs text-muted-foreground">{t('profile') || "Profile"}</p>
                                        <p className="font-semibold text-foreground truncate">{username}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => setIsEditOpen(true)}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    {t('settings') || t('editFarm') || "Settings"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {t('signOut') || "Log out"}
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
