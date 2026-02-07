"use client";

import { Phone, Mail, MapPin, Facebook, Twitter, MessageCircle } from "lucide-react";

export function DashboardFooter() {
    return (
        <footer className="bg-[#1B3D2F] text-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Contact Info */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
                        <span className="font-semibold text-white">Contact Us</span>

                        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+92.300 1234567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>info@zarairadar.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Lahore, Pakistan</span>
                            </div>
                        </div>
                    </div>

                    {/* Social & Links */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                            >
                                <Facebook className="w-4 h-4 text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center hover:bg-sky-600 transition-colors"
                            >
                                <Twitter className="w-4 h-4 text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 text-white" />
                            </a>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">About</a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="hover:text-white transition-colors">FAQ</a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
