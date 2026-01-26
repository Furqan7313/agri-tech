"use client";

import { useRouter } from "next/navigation";
import { MapPin, Wheat, Settings, Sprout, Bell, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { District, Crop } from "@/context/AgriContext";

interface DashboardHeaderProps {
    district: District;
    crop: Crop;
}

export function DashboardHeader({ district, crop }: DashboardHeaderProps) {
    const router = useRouter();

    const handleChange = () => {
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#1B4332] rounded-lg">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-heading text-lg lg:text-xl font-bold text-[#1B4332] hidden sm:block">
                            AgriTech Punjab
                        </span>
                    </div>

                    {/* Scope Anchor */}
                    <div className="flex items-center gap-2 bg-[#F8F9F1] rounded-xl px-3 lg:px-4 py-2 border border-[#E5E7EB]">
                        <div className="flex items-center gap-4 lg:gap-6">
                            {/* Location */}
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#1B4332]" />
                                <div className="hidden sm:block">
                                    <span className="text-xs text-[#6B7280]">Location</span>
                                    <p className="text-sm font-medium text-[#1F2937]">{district}</p>
                                </div>
                                <span className="sm:hidden text-sm font-medium text-[#1F2937]">{district}</span>
                            </div>

                            <div className="w-px h-8 bg-[#E5E7EB]" />

                            {/* Crop */}
                            <div className="flex items-center gap-2">
                                <Wheat className="w-4 h-4 text-[#D4A373]" />
                                <div className="hidden sm:block">
                                    <span className="text-xs text-[#6B7280]">Crop</span>
                                    <p className="text-sm font-medium text-[#1F2937]">{crop}</p>
                                </div>
                                <span className="sm:hidden text-sm font-medium text-[#1F2937]">{crop}</span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleChange}
                            className="ml-2 text-[#1B4332] hover:text-[#2D6A4F] hover:bg-[#1B4332]/5"
                        >
                            <Settings className="w-4 h-4 lg:mr-1" />
                            <span className="hidden lg:inline">Change</span>
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                                    <Bell className="w-5 h-5 text-[#6B7280]" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-start gap-2">
                                        <div className="p-1 bg-red-100 rounded-full mt-1">
                                            <Bug className="w-3 h-3 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">High Risk Disease Alert</p>
                                            <p className="text-xs text-gray-500">Leaf Curl Virus detected in your area.</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-start gap-2">
                                        <div className="p-1 bg-yellow-100 rounded-full mt-1">
                                            <Wheat className="w-3 h-3 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Weather Update</p>
                                            <p className="text-xs text-gray-500">Light rain expected tomorrow.</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
