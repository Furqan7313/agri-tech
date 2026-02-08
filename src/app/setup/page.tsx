"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ArrowLeft, Languages, MapPin, Leaf, Calendar, Droplets, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgri } from "@/context/AgriContext";
import { apiClient } from "@/lib/api";
import { getTranslation } from "@/lib/i18n";

const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan"];

const DISTRICTS: Record<string, string[]> = {
    Punjab: ["Lahore", "Multan", "Faisalabad", "Gujranwala", "Rawalpindi"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
    KPK: ["Peshawar", "Mardan", "Abbottabad", "Swat"],
    Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
};

const CROPS = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize"];
const STAGES = ["Sowing", "Vegetative", "Flowering", "Harvest"];
const IRRIGATION_TYPES = ["Canal", "Tube Well", "Rainfed"];
const SOIL_TYPES = ["Loamy", "Sandy", "Clay"];

// Urdu translations for setup page
const SETUP_TRANSLATIONS: Record<string, Record<string, string>> = {
    en: {
        tellUsAboutFarm: "Tell us about your farm",
        customizeDashboard: "We'll customize your dashboard with hyper-local weather and crop insights.",
        province: "Province",
        selectProvince: "Select Province",
        district: "District",
        selectDistrict: "Select District",
        primaryCrop: "Primary Crop",
        selectCrop: "Select Crop",
        currentStage: "Current Stage",
        selectStage: "Select Stage",
        farmSize: "Farm Size (acres)",
        enterArea: "Enter area in acres",
        phoneNumber: "Phone Number",
        cropStartDate: "Crop Start Date",
        soilType: "Soil Type",
        selectSoilType: "Select Soil Type",
        irrigationType: "Irrigation Type",
        selectIrrigationType: "Select Irrigation Type",
        completeSetup: "Complete Setup",
        locationInfo: "Location Information",
        cropInfo: "Crop Information",
        farmDetails: "Farm Details",
    },
    ur: {
        tellUsAboutFarm: "اپنے کھیت کے بارے میں بتائیں",
        customizeDashboard: "ہم آپ کے ڈیش بورڈ کو مقامی موسم اور فصل کی معلومات کے ساتھ حسب ضرورت بنائیں گے۔",
        province: "صوبہ",
        selectProvince: "صوبہ منتخب کریں",
        district: "ضلع",
        selectDistrict: "ضلع منتخب کریں",
        primaryCrop: "بنیادی فصل",
        selectCrop: "فصل منتخب کریں",
        currentStage: "موجودہ مرحلہ",
        selectStage: "مرحلہ منتخب کریں",
        farmSize: "کھیت کا رقبہ (ایکڑ)",
        enterArea: "ایکڑ میں رقبہ درج کریں",
        phoneNumber: "فون نمبر",
        cropStartDate: "فصل کی تاریخ شروع",
        soilType: "مٹی کی قسم",
        selectSoilType: "مٹی کی قسم منتخب کریں",
        irrigationType: "آبپاشی کی قسم",
        selectIrrigationType: "آبپاشی کی قسم منتخب کریں",
        completeSetup: "سیٹ اپ مکمل کریں",
        locationInfo: "مقام کی معلومات",
        cropInfo: "فصل کی معلومات",
        farmDetails: "کھیت کی تفصیلات",
    }
};

export default function ProfileSetupPage() {
    const router = useRouter();
    const { crop, province, district, cropStage, farmSize, soil_type, irrigation_type, setCrop, setProvince, setDistrict, setCropStage, setFarmSize, setSoilType, setIrrigationType, language, setLanguage } = useAgri();

    const t = (key: string) => SETUP_TRANSLATIONS[language]?.[key] || SETUP_TRANSLATIONS['en'][key] || key;
    const globalT = (key: any) => getTranslation(language, key);

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
            return;
        }

        setIsLoading(true);
        try {
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
                    }
                } catch (e) { }
                console.error("Profile setup failed:", errMsg);
                alert(errMsg);
                return;
            }

            setCrop(formData.crop);
            setProvince(formData.province);
            setDistrict(formData.district);
            setCropStage(formData.cropStage);
            setSoilType(formData.soilType);
            setIrrigationType(formData.irrigationType);
            if (formData.farmSize) setFarmSize(formData.farmSize);

            router.push("/dashboard");
        } catch (error: any) {
            let errMsg = error?.message || "Profile setup failed";
            console.error("Profile setup failed:", errMsg);
            alert(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.crop && formData.province && formData.district && formData.cropStage && formData.phone && formData.soilType && formData.irrigationType;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6 lg:px-8" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {/* Language Toggle */}
            <Button
                variant="outline"
                size="sm"
                className="fixed top-4 right-4 gap-2 bg-white border-gray-200 hover:bg-gray-100 text-gray-700 z-50"
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
            </Button>

            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-6 gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => router.push("/login")}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{globalT('back')}</span>
                </Button>

                <Card className="border border-gray-100 shadow-lg rounded-xl bg-white">
                    <CardHeader className="text-center space-y-4 pt-8 pb-6 border-b border-gray-100">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <Image
                                src="/logo-transparent.png"
                                alt="ZaraiRadar"
                                width={100}
                                height={100}
                                className="h-16 w-auto"
                            />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-800 font-heading">
                                {t('tellUsAboutFarm')}
                            </CardTitle>
                            <CardDescription className="text-gray-500 mt-2 max-w-md mx-auto">
                                {t('customizeDashboard')}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-8">
                        {/* Location Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                <MapPin className="w-5 h-5 text-[#1B4332]" />
                                <span>{t('locationInfo')}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('province')}</Label>
                                    <Select onValueChange={handleProvinceChange} value={formData.province}>
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectProvince')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PROVINCES.map((p) => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('district')}</Label>
                                    <Select
                                        disabled={!formData.province}
                                        onValueChange={(val) => setFormData({ ...formData, district: val })}
                                        value={formData.district}
                                    >
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectDistrict')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(formData.province ? DISTRICTS[formData.province] : []).map((d) => (
                                                <SelectItem key={d} value={d}>{d}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Crop Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Leaf className="w-5 h-5 text-[#1B4332]" />
                                <span>{t('cropInfo')}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('primaryCrop')}</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, crop: val })} value={formData.crop}>
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectCrop')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CROPS.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('currentStage')}</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, cropStage: val })} value={formData.cropStage}>
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectStage')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STAGES.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('cropStartDate')}</Label>
                                    <Input
                                        type="date"
                                        value={formData.cropStartDate}
                                        onChange={(e) => setFormData({ ...formData, cropStartDate: e.target.value })}
                                        className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('farmSize')}</Label>
                                    <Input
                                        type="number"
                                        placeholder={t('enterArea')}
                                        value={formData.farmSize}
                                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                                        className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Farm Details Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Mountain className="w-5 h-5 text-[#1B4332]" />
                                <span>{t('farmDetails')}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('phoneNumber')}</Label>
                                    <Input
                                        type="tel"
                                        placeholder="03XXXXXXXXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('soilType')}</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, soilType: val })} value={formData.soilType}>
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectSoilType')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SOIL_TYPES.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">{t('irrigationType')}</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, irrigationType: val })} value={formData.irrigationType}>
                                        <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-[#1B4332] focus:ring-[#1B4332]/20">
                                            <SelectValue placeholder={t('selectIrrigationType')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {IRRIGATION_TYPES.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-2 border-t border-gray-100">
                        <Button
                            className="w-full h-12 bg-[#1B4332] hover:bg-[#2D5A47] text-white font-semibold rounded-lg transition-colors text-base"
                            onClick={handleSubmit}
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {t('completeSetup')}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
