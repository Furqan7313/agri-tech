"use client";

import { Smartphone, Sprout, MessageCircle } from "lucide-react";

export function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                        How It Works
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-start gap-12 max-w-5xl mx-auto relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-0.5 bg-emerald-100 -z-10"></div>

                    {/* Step 1 */}
                    <Step
                        icon={Smartphone}
                        step="1"
                        title="Register with your phone"
                        desc="Only takes 30 seconds."
                    />

                    {/* Step 2 */}
                    <Step
                        icon={Sprout}
                        step="2"
                        title="Tell us your crop & location"
                        desc="We personalize everything to your farm."
                    />

                    {/* Step 3 */}
                    <Step
                        icon={MessageCircle}
                        step="3"
                        title="Get daily insights on WhatsApp"
                        desc="Wake up to weather & crop alerts directly on your phone."
                    />
                </div>

                {/* Testimonial Section (Matching bottom of reference) */}
                <div className="max-w-5xl mx-auto mt-24 bg-slate-50 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 h-64 md:h-auto relative">
                        <img
                            src="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
                            alt="Happy Farmer"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 p-8 md:p-12">
                        <div className="text-emerald-500 text-6xl font-serif leading-none mb-4">“</div>
                        <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-6">
                            Last year, I saved my wheat crop from rust because ZaraiRadar warned me early.
                        </blockquote>
                        <cite className="not-italic font-bold text-slate-900 block">
                            — Ahmad, <span className="font-normal text-slate-500">Wheat Farmer, Sahiwal</span>
                        </cite>
                    </div>
                </div>

            </div>
        </section>
    );
}

function Step({ icon: Icon, title, desc, step }: any) {
    return (
        <div className="flex-1 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-10 h-10 text-emerald-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-emerald-800 shadow-sm border border-emerald-100 text-sm">
                    {step}
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 max-w-[200px]">{title}</h3>
            <p className="text-slate-500 leading-relaxed max-w-[250px]">{desc}</p>
        </div>
    )
}
