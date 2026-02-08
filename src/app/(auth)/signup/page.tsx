"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useAgri } from "@/context/AgriContext";
import { getTranslation } from "@/lib/i18n";
import { apiClient } from "@/lib/api";

export default function SignupPage() {
    const router = useRouter();
    const { language, setLanguage } = useAgri();
    const t = (key: any) => getTranslation(language, key);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await apiClient.post("/auth/signup", {
                username: formData.name,
                email: formData.email,
                password: formData.password,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Signup failed");
            }

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_id", data.user.id || data.user.email);
            localStorage.setItem("user_email", data.user.email);
            localStorage.setItem("username", data.user.username);

            router.push("/setup");
        } catch (error: any) {
            console.error("Signup failed", error);
            setError(error.message || "Failed to create account. Please try again.");
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
                            {t('createAccountTitle')}
                        </CardTitle>
                        <CardDescription className="text-gray-500 mt-1">
                            {t('createAccountSubtitle')}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">{t('fullName')}</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder={t('usernamePlaceholder')}
                                required
                                className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

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

                        <Button
                            className="w-full h-11 bg-[#1B4332] hover:bg-[#2D5A47] text-white font-medium rounded-lg transition-colors"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('signup')}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="pb-8 pt-4">
                    <p className="text-sm text-gray-500 text-center w-full">
                        {t('alreadyHaveAccount')}{" "}
                        <Link href="/login" className="text-[#1B4332] hover:text-[#2D5A47] font-semibold hover:underline">
                            {t('signIn')}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
