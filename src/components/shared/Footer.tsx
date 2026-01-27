"use client";

import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function Footer() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    return (
        <footer className="bg-[#064e3b] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Sprout className="w-6 h-6 text-[#4ade80]" />
                            </div>
                            <span className="font-heading text-2xl font-bold">ZaraiRadar</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
                            {t('footerDesc')}
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">{t('platform')}</h4>
                        <ul className="space-y-4">
                            <FooterLink label={t('riskAssessment')} />
                            <FooterLink label={t('weatherUpdate')} />
                            <FooterLink label={t('seasonalGuidance')} />
                            <FooterLink label={t('consultExpert')} />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">{t('contactUs')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>{t('address')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>+92 300 1234567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>support@zarairadar.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 {t('rightsReserved')}
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#4ade80] hover:text-[#0f172a] transition-all duration-300 text-gray-400">
            {icon}
        </a>
    )
}

function FooterLink({ label }: { label: string }) {
    return (
        <li>
            <a href="#" className="text-gray-400 hover:text-[#4ade80] transition-colors text-sm font-medium">
                {label}
            </a>
        </li>
    )
}
