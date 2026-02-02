"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Leaf, Languages } from "lucide-react";
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
            <Card className="border-primary/20 shadow-lg w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Leaf className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">{t('createAccountTitle')}</CardTitle>
                    <CardDescription>
                        {t('createAccountSubtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t('fullName')}</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder={t('usernamePlaceholder')}
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
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
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('signup')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <div className="text-sm text-muted-foreground text-center">
                        {t('alreadyHaveAccount')}{" "}
                        <Link href="/login" className="text-primary hover:underline hover:text-primary/80 font-medium">
                            {t('signIn')}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
