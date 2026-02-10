"use client";

import { useRouter } from "next/navigation";
import { Bell, HelpCircle, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardNav() {
    const router = useRouter();

    const navItems = [
        { label: "Dashboard", href: "/dashboard", active: true },
        { label: "My Farms", href: "/farms", active: false },
        { label: "Settings", href: "/settings", active: false },
    ];

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo & Nav */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push("/")}>
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-green-700">
                                Zarai<span className="text-green-600">Radar</span>
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => router.push(item.href)}
                                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${item.active
                                        ? "text-gray-900 border-b-2 border-green-600"
                                        : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                            <HelpCircle className="w-5 h-5" />
                        </Button>
                        <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm ml-2">
                            J
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
