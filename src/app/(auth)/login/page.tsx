"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Phone, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";
import { apiClient } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const { isSelectionComplete, language, setLanguage, setDistrict, setCrop, setProvince, setCropStage, setFarmSize } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPhoneLogin, setIsPhoneLogin] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await apiClient.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Login failed");
            }

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_id", data.user.id || data.user.email);
            localStorage.setItem("user_email", data.user.email);
            localStorage.setItem("username", data.user.username);

            try {
                const profileResponse = await apiClient.get("/farmer-info");
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    const profile = profileData?.data;
                    if (profile) {
                        setDistrict(profile.district || "");
                        setProvince(profile.province || "");
                        setCrop(profile.crop || "");
                        setCropStage(profile.stage || "");
                        if (profile.area) setFarmSize(profile.area);
                    }
                    router.push("/dashboard");
                } else if (profileResponse.status === 404) {
                    router.push("/setup");
                } else {
                    const err = await profileResponse.json().catch(() => ({}));
                    throw new Error(err.detail || "Failed to load farmer profile");
                }
            } catch (profileError) {
                console.error("Profile load failed", profileError);
                router.push("/setup");
            }

        } catch (error: any) {
            console.error("Login failed", error);
            setError(error.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 lg:p-8" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Language Toggle */}
            <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 gap-2 bg-white border-gray-200 hover:bg-gray-100 text-gray-700"
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
            </Button>

            <Card className="w-full max-w-md border border-gray-100 shadow-lg rounded-xl bg-white">
                <CardHeader className="space-y-4 text-center pt-8 pb-4">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <Image
                            src="/logo-transparent.png"
                            alt="ZaraiRadar"
                            width={120}
                            height={120}
                            className="h-20 w-auto"
                        />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-800 font-heading">
                            {isPhoneLogin ? t('phoneLogin') : t('welcomeBack')}
                        </CardTitle>
                        <CardDescription className="text-gray-500 mt-1">
                            {isPhoneLogin
                                ? t('sendCodeToPhone')
                                : t('enterEmailToSignIn')
                            }
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                {error}
                            </div>
                        )}

                        {isPhoneLogin ? (
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">{t('phoneNumber')}</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t('enterPhone')}
                                        required
                                        className="pl-10 h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t('email')}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t('enterEmail')}
                                        required
                                        className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">{t('password')}</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20 pr-10"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button
                            className="w-full h-11 bg-[#1B4332] hover:bg-[#2D5A47] text-white font-medium rounded-lg transition-colors"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPhoneLogin ? t('sendVerificationCode') : t('signIn')}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-gray-400">
                                {t('orContinueWith')}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full h-11 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
                        disabled={isLoading}
                        onClick={() => setIsPhoneLogin(!isPhoneLogin)}
                    >
                        {isPhoneLogin ? t('emailAndPassword') : t('phoneOtp')}
                    </Button>
                </CardContent>

                <CardFooter className="pb-8 pt-2">
                    <p className="text-sm text-gray-500 text-center w-full">
                        {t('dontHaveAccount')}{" "}
                        <Link href="/signup" className="text-[#1B4332] hover:text-[#2D5A47] font-semibold hover:underline">
                            {t('signup')}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
