"use client";

import { Sprout, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#1B4332] text-white py-12 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-[#52B788]/20 rounded-lg">
                                <Sprout className="w-6 h-6 text-[#52B788]" />
                            </div>
                            <span className="font-heading text-xl font-bold">AgriTech Punjab</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
                            Empowering farmers across Punjab with data-driven agricultural insights.
                            Access real-time weather forecasts, crop recommendations, and precision farming tools.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Phone className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <MapPin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Weather Forecast
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Crop Advisory
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Soil Analysis
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    FAO Guidelines
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    PMD Reports
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Farmer Helpline
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-[#52B788] transition-colors text-sm">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm">
                        © 2026 AgriTech Punjab. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/50 hover:text-white/70 text-sm transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-white/50 hover:text-white/70 text-sm transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
