"use client";

import { Shield, CloudRain, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export function FeaturesSection() {
    const { language } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const features = [
        {
            icon: <Shield className="w-6 h-6 text-destructive" />,
            title: t('riskShield'),
            description: t('riskDesc')
        },
        {
            icon: <CloudRain className="w-6 h-6 text-blue-600" />,
            title: t('precisionClimate'),
            description: t('climateDesc')
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-green-600" />,
            title: t('aiAgronomist'),
            description: t('aiDesc')
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
            title: t('yieldMax'),
            description: t('yieldDesc')
        }
    ];

    return (
        <section className="py-24 bg-[#F8F9F1]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                        {t('intelligenceTitle')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('intelligenceDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader>
                                <div className="mb-4 w-12 h-12 rounded-lg bg-background border flex items-center justify-center shadow-sm">
                                    {feature.icon}
                                </div>
                                <CardTitle className="font-heading text-lg font-semibold text-foreground">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
