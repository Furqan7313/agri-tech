"use client";

import {
    CloudLightning, Bug, Droplets, Coins,
    MapPin, ShieldCheck, Sprout, BarChart3,
    ArrowRight, Smartphone, MessageCircle, Quote,
    ScanLine, TrendingUp
} from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
    return (
        <section className="py-16 md:py-24 bg-[#F7F9F6]">
            <div className="container mx-auto px-4">

                {/* Trusted By Header */}
                <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#1F7A5A]/10 shadow-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#25D366]"></span>
                        <p className="text-[#1F2933] font-semibold text-sm tracking-wide uppercase">Trusted by 50,000+ Farmers & Experts</p>
                    </div>
                </div>

                {/* Comparison Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row mb-24 relative z-10">

                    {/* Left Side: The Problem (Uncertainty) */}
                    <div className="md:w-1/2 p-8 md:p-12 lg:p-16 relative overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/unhealthy-farm.png"
                                alt="Stormy farm field"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay: #0F3D2E at 70% */}
                            <div className="absolute inset-0 bg-[#0F3D2E]/70 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
                                Farming is <span className="text-[#9FD8C4]">Uncertain</span>
                            </h2>

                            <div className="space-y-8">
                                <ComparisonItem
                                    icon={CloudLightning}
                                    title="Sudden weather changes"
                                    desc="Loses, earlier, staggering."
                                    variant="problem"
                                />
                                <ComparisonItem
                                    icon={Bug}
                                    title="Pest & disease surprises"
                                    desc="Devastating now, act in time."
                                    variant="problem"
                                />
                                <ComparisonItem
                                    icon={Droplets}
                                    title="Guesswork irrigation"
                                    desc="See total running cost."
                                    variant="problem"
                                />
                                <ComparisonItem
                                    icon={Coins}
                                    title="Rising input costs"
                                    desc="Farmer's Control."
                                    variant="problem"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Solution (Clarity) */}
                    <div className="md:w-1/2 p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center">
                        {/* Background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/healthy-farm.png"
                                alt="Lush green farm"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay: #1F7A5A at 50% */}
                            <div className="absolute inset-0 bg-[#1F7A5A]/55 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1F7A5A]/60 to-[#1F7A5A]/40"></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
                                ZaraiRadar Brings <span className="text-[#D1FAE5]">Clarity</span>
                            </h2>

                            <div className="space-y-8">
                                <ComparisonItem
                                    icon={MapPin}
                                    title="Hyper-local forecasts"
                                    desc="Map pin, precise precip."
                                    variant="solution"
                                />
                                <ComparisonItem
                                    icon={ShieldCheck}
                                    title="Early disease alerts"
                                    desc="Smart irrigation connected."
                                    variant="solution"
                                />
                                <ComparisonItem
                                    icon={Sprout}
                                    title="Smart irrigation guidance"
                                    desc="Learn-right movement."
                                    variant="solution"
                                />
                                <ComparisonItem
                                    icon={BarChart3}
                                    title="Data-backed decisions"
                                    desc="Data-predicted, tested."
                                    variant="solution"
                                />
                            </div>

                            {/* Bottom Tagline */}
                            <div className="mt-12 pt-8 border-t border-white/20 text-center md:text-left">
                                <p className="font-medium text-[#ECFDF5] text-lg opacity-90">
                                    No sensors. No apps to learn. Just WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mb-24 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">How It Works</h2>
                        <p className="text-[#6B7280] max-w-2xl mx-auto text-lg">Simple steps to start farming smarter today.</p>
                    </div>

                    <div className="max-w-5xl mx-auto px-4 relative">
                        {/* Desktop Connecting Line */}
                        <div className="hidden md:block absolute top-[3rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[#1F7A5A]/20 to-transparent -z-10 border-t-2 border-dotted border-[#1F7A5A]/30"></div>

                        {/* Mobile Connecting Line */}
                        <div className="md:hidden absolute top-12 bottom-32 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#1F7A5A]/20 to-transparent -translate-x-1/2 -z-10 border-l-2 border-dotted border-[#1F7A5A]/30"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
                            <HowItWorksStep
                                number="1"
                                icon={Smartphone}
                                title="Register with your phone"
                                desc="Only takes 30 seconds."
                            />
                            <HowItWorksStep
                                number="2"
                                icon={Sprout}
                                title="Tell us your crop & location"
                                desc="We personalize everything to your farm."
                            />
                            <HowItWorksStep
                                number="3"
                                icon={MessageCircle}
                                title="Get daily insights on WhatsApp"
                                desc="Wake up to weather & crop alerts directly on your phone."
                            />
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="mb-24 max-w-6xl mx-auto px-4 md:px-0">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row">
                        {/* Image Side */}
                        <div className="md:w-5/12 relative h-72 md:h-auto min-h-[300px] overflow-hidden">
                            <img
                                src="/farmer-testimonial.png"
                                className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                alt="Smiling Farmer"
                            />
                        </div>

                        {/* Text Side - Clean White Background */}
                        <div className="md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center items-start text-left bg-white">
                            <Quote className="w-12 h-12 text-[#1F7A5A] mb-8 fill-current opacity-20" />
                            <p className="text-xl md:text-3xl text-[#1F2933] font-medium italic mb-10 leading-relaxed font-heading">
                                "Last year, I saved my wheat crop from rust because ZaraiRadar warned me early."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-[#1F7A5A] rounded-full"></div>
                                <div>
                                    <p className="font-bold text-[#1F2933] text-xl tracking-wide">— Ahmad</p>
                                    <p className="text-[#6B7280] text-sm font-medium mt-1">Wheat Farmer, Sahiwal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features Header */}
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#1F7A5A]/10 text-[#1F7A5A] font-semibold text-sm mb-4 tracking-wider uppercase">
                        Premium Features
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-[#1F2933] mb-6 font-heading">
                        Everything You Need to <br className="hidden md:block" /> <span className="text-[#1F7A5A]">Maximize Yields</span>
                    </h3>
                    <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
                        Our AI-powered tools replace guesswork with precision, protecting your crops from sowing to harvest.
                    </p>
                </div>

                {/* FEATURE GRID */}
                <div className="relative">
                    {/* Decorative Background Blur */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#1F7A5A]/5 via-transparent to-[#1F7A5A]/5 blur-3xl -z-10 rounded-full opacity-60"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 relative z-10">
                        <FeatureImageCard
                            image="/corn-disease.png"
                            badge="AI Powered"
                            icon={ScanLine}
                            title="Instant Disease Detection"
                            desc="Snap a photo of your crop to identify diseases instantly using our AI engine."
                        />
                        <FeatureImageCard
                            image="/smart-irrigation.png"
                            badge="IoT Sensors"
                            icon={Droplets}
                            title="Smart Irrigation"
                            desc="Know exactly when and how much to water based on soil moisture data."
                        />
                        <FeatureImageCard
                            image="/yield-maximization.png"
                            badge="Predictive Analytics"
                            icon={TrendingUp}
                            title="Yield Forecasting"
                            desc="Predict your harvest size and value weeks before you cut the crop."
                        />
                    </div>
                </div>



            </div>
        </section>
    );
}

function ComparisonItem({ icon: Icon, title, desc, variant = "problem" }: any) {
    const isProblem = variant === "problem";

    // Problem: Icons #9FD8C4, Text White/Grey
    // Solution: Icons White, Text White/Mint

    const iconColor = isProblem ? "text-[#9FD8C4]" : "text-white";
    const titleColor = "text-white";
    const descColor = isProblem ? "text-[#E5E7EB]" : "text-[#ECFDF5]";
    const bgClass = isProblem ? "bg-white/10" : "bg-white/20";

    return (
        <div className="flex items-start gap-4 group">
            <div className={`p-3 rounded-full transition-colors ${bgClass} backdrop-blur-sm border border-white/10`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
                <h3 className={`font-bold text-lg ${titleColor}`}>{title}</h3>
                <p className={`text-sm ${descColor} font-medium`}>{desc}</p>
            </div>
        </div>
    )
}

function HowItWorksStep({ number, icon: Icon, title, desc }: any) {
    return (
        <div className="flex flex-col items-center text-center group relative">
            <div className="relative mb-8">
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-white shadow-xl shadow-[#1F7A5A]/5 border border-[#1F7A5A]/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-[#1F7A5A]" />
                </div>
                {/* Number Badge */}
                <div className="absolute top-0 right-0 bg-[#25D366] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md z-20 border-2 border-white transform group-hover:rotate-12 transition-transform duration-300">
                    {number}
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full hover:shadow-md transition-all duration-300 relative group-hover:-translate-y-1">
                <h4 className="font-bold text-xl text-[#1F2933] mb-2">{title}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs mx-auto">
                    {desc}
                </p>
            </div>
        </div>
    )
}

function FeatureImageCard({ image, title, desc, icon: Icon, badge }: any) {
    return (
        <Link href="/dashboard" className="block h-full">
            <div className="group h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(31,122,90,0.1)] hover:border-[#1F7A5A]/20 transition-all duration-500 cursor-pointer flex flex-col">
                <div className="h-60 overflow-hidden relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2933]/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                    {/* Glass Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-semibold tracking-wide shadow-sm">
                        {badge}
                    </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative">
                    {/* Floating Icon on overlap */}
                    <div className="absolute -top-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-[#1F7A5A]" />
                    </div>

                    <div className="mt-6">
                        <h4 className="text-xl font-bold text-[#1F2933] mb-3 group-hover:text-[#1F7A5A] transition-colors duration-300">
                            {title}
                        </h4>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow">
                            {desc}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-[#1F7A5A] font-bold text-sm tracking-wide group-hover:gap-3 transition-all duration-300">
                        <span>Explore Feature</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
