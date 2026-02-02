"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sprout, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgri } from "@/context/AgriContext";
import { apiClient } from "@/lib/api";

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
    const { setCrop, setProvince, setDistrict, setCropStage, setFarmSize } = useAgri();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        crop: "",
        province: "",
        district: "",
        farmSize: "",
        cropStage: "",
        phone: "",
    });

    const handleProvinceChange = (value: string) => {
        setFormData({ ...formData, province: value, district: "" });
    };

    const handleSubmit = async () => {
        if (!formData.crop || !formData.province || !formData.district || !formData.cropStage || !formData.phone) {
            return; // Basic validation
        }

        setIsLoading(true);
        try {
            const response = await apiClient.post("/farmer-info", {
                province: formData.province,
                district: formData.district,
                crop: formData.crop,
                phone: formData.phone,
                stage: formData.cropStage,
                area: formData.farmSize || "Not specified",
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Failed to save profile");
            }

            // Update Context (which will sync to localStorage automatically)
            setCrop(formData.crop);
            setProvince(formData.province);
            setDistrict(formData.district);
            setCropStage(formData.cropStage);
            if (formData.farmSize) setFarmSize(formData.farmSize);

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Profile setup failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.crop && formData.province && formData.district && formData.cropStage && formData.phone;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0FDFA] to-[#E6F4D0] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="relative max-w-xl w-full border-primary/10 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in-up">
                <CardHeader className="text-center space-y-2 pb-2">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0 top-0 -ml-2 -mt-2 md:-ml-4 md:-mt-4 hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => router.push("/login")}
                        >
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg ring-4 ring-white flex items-center justify-center mb-4">
                            <Sprout className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground font-heading tracking-tight">
                        Tell us about your farm
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground/80 max-w-sm mx-auto">
                        We'll customize your dashboard with hyper-local weather and crop insights.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {/* Province & District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Province</Label>
                            <Select onValueChange={handleProvinceChange} value={formData.province}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
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
                            <Label className="text-sm font-medium text-gray-700">District</Label>
                            <Select
                                disabled={!formData.province}
                                onValueChange={(val) => setFormData({ ...formData, district: val })}
                                value={formData.district}
                            >
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Primary Crop</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, crop: val })} value={formData.crop}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
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
                            <Label className="text-sm font-medium text-gray-700">Current Stage</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, cropStage: val })} value={formData.cropStage}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
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

                    {/* Farm Size & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Farm Size <span className="text-muted-foreground font-normal opacity-70">(Optional)</span></Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, farmSize: val })} value={formData.farmSize}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
                                    <SelectValue placeholder="Select Farm Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SIZES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="03XXXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="pt-2 pb-8">
                    <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-md font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl"
                        onClick={handleSubmit}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        Complete Setup
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
