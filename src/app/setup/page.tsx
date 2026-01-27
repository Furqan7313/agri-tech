"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sprout, MapPin, Ruler, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAuthService } from "@/lib/auth";

const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan"];

const DISTRICTS: Record<string, string[]> = {
    Punjab: ["Lahore", "Multan", "Faisalabad", "Gujranwala", "Rawalpindi"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
    KPK: ["Peshawar", "Mardan", "Abbottabad", "Swat"],
    Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
};

const CROPS = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize"];
const STAGES = ["Sowing", "Vegetative", "Flowering", "Harvest"];
const SIZES = ["Small (< 5 acres)", "Medium (5-25 acres)", "Large (> 25 acres)"];

export default function ProfileSetupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        crop: "",
        province: "",
        district: "",
        farmSize: "",
        cropStage: "",
    });

    const handleProvinceChange = (value: string) => {
        setFormData({ ...formData, province: value, district: "" });
    };

    const handleSubmit = async () => {
        if (!formData.crop || !formData.province || !formData.district || !formData.cropStage) {
            return; // Basic validation
        }

        setIsLoading(true);
        try {
            await mockAuthService.saveProfile({ ...formData, user_id: localStorage.getItem("user_id") });

            // Save to localStorage for Context hydration
            localStorage.setItem('crop', formData.crop);
            localStorage.setItem('province', formData.province);
            localStorage.setItem('district', formData.district);
            localStorage.setItem('cropStage', formData.cropStage);
            if (formData.farmSize) localStorage.setItem('farmSize', formData.farmSize);

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Profile setup failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.crop && formData.province && formData.district && formData.cropStage;

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <Card className="max-w-xl w-full border-primary/20 shadow-lg animate-fade-in-up">
                <CardHeader className="text-center space-y-2">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0 top-0 -ml-2 -mt-2 md:-ml-4 md:-mt-4"
                            onClick={() => router.push("/dashboard")}
                        >
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                            <Sprout className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground font-heading">
                        Tell us about your farm
                    </CardTitle>
                    <CardDescription>
                        We'll customize your dashboard based on these details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Province & District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Province</Label>
                            <Select onValueChange={handleProvinceChange} value={formData.province}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROVINCES.map((p) => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>District</Label>
                            <Select
                                disabled={!formData.province}
                                onValueChange={(val) => setFormData({ ...formData, district: val })}
                                value={formData.district}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(formData.province ? DISTRICTS[formData.province] : []).map((d) => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Crop & Stage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Primary Crop</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, crop: val })} value={formData.crop}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CROPS.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Current Stage</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, cropStage: val })} value={formData.cropStage}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STAGES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Farm Size */}
                    <div className="space-y-2">
                        <Label>Farm Size <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, farmSize: val })} value={formData.farmSize}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Farm Size" />
                            </SelectTrigger>
                            <SelectContent>
                                {SIZES.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-md"
                        onClick={handleSubmit}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Setup
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
