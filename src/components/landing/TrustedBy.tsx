"use client";

import { Building2, Landmark, Sprout, Wheat, Tractor, Leaf, Droplets, Sun, Globe } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function TrustedBy() {
    return (
        <section className="py-12 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 relative overflow-hidden border-b border-emerald-100/50 shadow-sm">
            {/* Subtle aesthetic background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500"></div>

            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm md:text-base font-bold text-emerald-800 uppercase tracking-[0.2em] font-sans">
                    Trusted by farmers & partners across Punjab
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-gradient">
                {/* The Scrolling Drawer */}
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] items-center gap-16 md:gap-24">
                    {/* ORIGINAL SET */}
                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Agriculture<br />Dept</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Landmark className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">University of<br />Agriculture</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Sprout className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Kisan<br />Cooperatives</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Wheat className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Punjab Seed<br />Corp</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Tractor className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Millat<br />Tractors</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Leaf className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">NARC<br />Islamabad</span>
                    </div>

                    {/* DUPLICATE SET FOR SCROLL */}
                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Building2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Agriculture<br />Dept</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Landmark className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">University of<br />Agriculture</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Sprout className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Kisan<br />Cooperatives</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Wheat className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Punjab Seed<br />Corp</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Tractor className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">Millat<br />Tractors</span>
                    </div>

                    <div className="flex items-center gap-3 group cursor-default select-none opacity-60 hover:opacity-100 transition-all duration-300">
                        <div className="p-2 rounded-full bg-white border border-emerald-100 shadow-sm">
                            <Leaf className="w-8 h-8 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg text-emerald-900 leading-tight">NARC<br />Islamabad</span>
                    </div>
                </div>

                {/* Left/Right Fade Masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-emerald-50 to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-emerald-50 to-transparent z-10"></div>
            </div>
        </section>
    );
}
