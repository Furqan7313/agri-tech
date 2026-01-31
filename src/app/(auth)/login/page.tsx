"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Leaf, Phone, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuthService } from "@/lib/auth";

import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";

export default function LoginPage() {
    const router = useRouter();
    const { isSelectionComplete, language, setLanguage, setDistrict, setCrop, setProvince, setCropStage, setFarmSize } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPhoneLogin, setIsPhoneLogin] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mock Login (Simulate API delay)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // For phone login, we'll just simulate a successful OTP verification flow
            const user = await mockAuthService.login(
                isPhoneLogin ? "demo@agritech.com" : formData.email,
                "password" // Mock password or real one
            );

            localStorage.setItem("user_id", user.user_id);

            // SIMULATE DATA SYNC: 
            // In a real app, we would fetch user profile here.
            // For this mock, if the user doesn't have local data, we'll ASSUME they are a returning user 
            // and populate with default mock data so they don't hit the Setup screen again.
            // This fixes the "Setup Loop" on new devices/browsers.

            const hasLocalProfile = localStorage.getItem("district");

            if (!hasLocalProfile) {
                // Simulate fetching profile from "Cloud"
                const mockProfile = {
                    district: "Lahore",
                    province: "Punjab",
                    crop: "Wheat",
                    cropStage: "Vegetative",
                    farmSize: "Medium (5-25 acres)"
                };

                // Update Context (which updates localStorage)
                setDistrict(mockProfile.district);
                setProvince(mockProfile.province);
                setCrop(mockProfile.crop);
                setCropStage(mockProfile.cropStage);
                setFarmSize(mockProfile.farmSize);

                // Allow a small tick for context to propagate if needed, though setters are usually fast enough relative to routing
                // We'll trust the setters.
            }

            // Navigate to Dashboard
            router.push("/dashboard");

        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                title={language === 'en' ? "Switch to Urdu" : "Switch to English"}
            >
                <Languages className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Card className="border-primary/20 shadow-lg animate-fade-in-up w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Leaf className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                        {isPhoneLogin ? t('phoneLogin') : t('welcomeBack')}
                    </CardTitle>
                    <CardDescription>
                        {isPhoneLogin
                            ? t('sendCodeToPhone')
                            : t('enterEmailToSignIn')
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {isPhoneLogin ? (
                            <div className="grid gap-2">
                                <Label htmlFor="phone">{t('phoneNumber')}</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t('enterPhone')}
                                        required
                                        className="pl-9"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">{t('email')}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t('enterEmail')}
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">{t('password')}</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPhoneLogin ? t('sendVerificationCode') : t('signIn')}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                {t('orContinueWith')}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        disabled={isLoading}
                        onClick={() => setIsPhoneLogin(!isPhoneLogin)}
                    >
                        {isPhoneLogin ? t('emailAndPassword') : t('phoneOtp')}
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <div className="text-sm text-muted-foreground text-center">
                        {t('dontHaveAccount')}{" "}
                        <Link href="/signup" className="text-primary hover:underline hover:text-primary/80 font-medium">
                            {t('signup')}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
