"use client";

import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function Footer() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);


    return (
        <footer className="bg-[#0F3D2E] text-white pt-24 pb-12 relative overflow-hidden font-sans">
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#1F7A5A]/30 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-[#1F7A5A]/20 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand & Approx 4 cols */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-gradient-to-br from-[#1F7A5A] to-[#0F3D2E] rounded-xl shadow-lg border border-[#34D399]/20">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-heading text-2xl font-bold tracking-tight text-white">ZaraiRadar</span>
                        </div>
                        <p className="text-emerald-100/70 text-base leading-relaxed max-w-sm mb-8">
                            {t('footerDesc') || "Empowering farmers with AI-driven insights for a sustainable and profitable future. Join the revolution in smart agriculture."}
                        </p>

                        <div className="flex gap-3">
                            <SocialIcon href="https://facebook.com" icon={<Facebook className="w-5 h-5" />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
                            <SocialIcon href="https://instagram.com" icon={<Instagram className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Quick Links - 3 cols */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-white text-lg mb-6">{t('platform')}</h4>
                        <ul className="space-y-4">
                            <FooterLink label={t('riskAssessment')} />
                            <FooterLink label={t('weatherUpdate')} />
                            <FooterLink label={t('seasonalGuidance')} />
                            <FooterLink label={t('consultExpert')} />
                        </ul>
                    </div>

                    {/* Contact & Newsletter - 4 cols */}
                    <div className="lg:col-span-4">
                        <h4 className="font-bold text-white text-lg mb-6">{t('contactUs')}</h4>
                        <ul className="space-y-5 mb-8">
                            <li className="flex items-start gap-4 text-emerald-100/80 group">
                                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#1F7A5A] transition-colors duration-300">
                                    <MapPin className="w-4 h-4 text-[#34D399] group-hover:text-white" />
                                </div>
                                <span className="text-sm leading-relaxed mt-1">{t('address')}</span>
                            </li>
                            <li className="flex items-center gap-4 text-emerald-100/80 group">
                                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#1F7A5A] transition-colors duration-300">
                                    <Phone className="w-4 h-4 text-[#34D399] group-hover:text-white" />
                                </div>
                                <span className="text-sm">+92 317 8807313</span>
                            </li>
                            <li className="flex items-center gap-4 text-emerald-100/80 group">
                                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#1F7A5A] transition-colors duration-300">
                                    <Mail className="w-4 h-4 text-[#34D399] group-hover:text-white" />
                                </div>
                                <span className="text-sm">support@zarairadar.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-emerald-100/40 text-sm font-medium">
                        © 2026 {t('rightsReserved')}
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-emerald-100/60 hover:text-[#34D399] text-sm transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="text-emerald-100/60 hover:text-[#34D399] text-sm transition-colors duration-300">Terms of Service</a>
                        <a href="#" className="text-emerald-100/60 hover:text-[#34D399] text-sm transition-colors duration-300">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#1F7A5A] hover:text-white border border-white/5 hover:border-[#34D399]/30 transition-all duration-300 text-emerald-100/70 hover:scale-110 shadow-sm"
        >
            {icon}
        </a>
    )
}

function FooterLink({ label }: { label: string }) {
    return (
        <li>
            <a href="#" className="text-emerald-100/70 hover:text-white transition-all duration-300 text-sm font-medium flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-[#34D399] group-hover:w-3 transition-all duration-300 rounded-full"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
            </a>
        </li>
    )
}
