"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Leaf, Phone, Languages } from "lucide-react";
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
            if (isPhoneLogin) {
                setError("Phone login is not yet implemented. Please use email and password.");
                setIsLoading(false);
                return;
            }

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
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}
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
