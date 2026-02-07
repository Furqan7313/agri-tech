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
const IRRIGATION_TYPES = ["Canal", "Tube Well", "Rainfed"];
const SOIL_TYPES = ["Loamy", "Sandy", "Clay"];

export default function ProfileSetupPage() {
    const router = useRouter();
    const { crop, province, district, cropStage, farmSize, soil_type, irrigation_type, setCrop, setProvince, setDistrict, setCropStage, setFarmSize, setSoilType, setIrrigationType } = useAgri();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        crop: crop || "",
        province: province || "",
        district: district || "",
        farmSize: farmSize || "",
        cropStage: cropStage || "",
        phone: "",
        cropStartDate: "",
        soilType: soil_type || "",
        irrigationType: irrigation_type || "",
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
            // Calculate days_after_sowing on frontend
            let daysAfterSowing = 0;
            if (formData.cropStartDate) {
                try {
                    const startDate = new Date(formData.cropStartDate);
                    const today = new Date();
                    const diffTime = today.getTime() - startDate.getTime();
                    daysAfterSowing = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                } catch (e) {
                    daysAfterSowing = 0;
                }
            }
            const response = await apiClient.post("/farmer-info", {
                province: formData.province,
                district: formData.district,
                crop: formData.crop,
                phone: formData.phone,
                stage: formData.cropStage,
                area: formData.farmSize || "Not specified",
                crop_start_date: formData.cropStartDate || null,
                soil_type: formData.soilType || "Not specified",
                irrigation_type: formData.irrigationType || "Not specified",
                days_after_sowing: daysAfterSowing,
            });

            if (!response.ok) {
                let errMsg = "Failed to save profile";
                try {
                    const err = await response.json();
                    if (err && (err.detail || err.error)) {
                        errMsg = err.detail || err.error;
                    } else if (typeof err === "string") {
                        errMsg = err;
                    } else if (Array.isArray(err)) {
                        errMsg = err.map((e) => e.detail || e.error || JSON.stringify(e)).join(", ");
                    }
                } catch (e) {
                    // ignore JSON parse error
                }
                console.error("Profile setup failed:", errMsg);
                alert(errMsg);
                return;
            }

            // Update Context (which will sync to localStorage automatically)
            setCrop(formData.crop);
            setProvince(formData.province);
            setDistrict(formData.district);
            setCropStage(formData.cropStage);
            setSoilType(formData.soilType);
            setIrrigationType(formData.irrigationType);

            if (formData.farmSize) setFarmSize(formData.farmSize);

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error: any) {
            let errMsg = error?.message || "Profile setup failed";
            if (typeof error === "object" && error !== null && "message" in error) {
                errMsg = error.message;
            }
            console.error("Profile setup failed:", errMsg);
            alert(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.crop && formData.province && formData.district && formData.cropStage && formData.phone && formData.soilType && formData.irrigationType;

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

                    {/* Farm Size, Phone, Crop Start Date, Soil Type, Irrigation Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Farm Size </Label>
                            <Input
                                type="number"
                                placeholder="Enter the area in acres (e.g., 10)"
                                value={formData.farmSize}
                                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                                className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all"
                            />
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Crop Start Date</Label>
                            <Input
                                type="date"
                                value={formData.cropStartDate}
                                onChange={(e) => setFormData({ ...formData, cropStartDate: e.target.value })}
                                className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Soil Type</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, soilType: val })} value={formData.soilType}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
                                    <SelectValue placeholder="Select Soil Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SOIL_TYPES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Irrigation Type</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, irrigationType: val })} value={formData.irrigationType}>
                                <SelectTrigger className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all">
                                    <SelectValue placeholder="Select Irrigation Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {IRRIGATION_TYPES.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
