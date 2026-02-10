"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

export type District = string;
export type Crop = string;
export type Province = string;
export type CropStage = string;
export type FarmSize = string;
export type Language = 'en' | 'ur';

interface AgriState {
    district: District | null;
    crop: Crop | null;
    province: Province | null;
    cropStage: CropStage | null;
    farmSize: FarmSize | null;
    language: Language;
    irrigation_type: string | null;
    soil_type: string | null;
    setDistrict: (district: District) => void;
    setCrop: (crop: Crop) => void;
    setProvince: (province: Province) => void;
    setCropStage: (stage: CropStage) => void;
    setFarmSize: (size: FarmSize) => void;
    setLanguage: (lang: Language) => void;
    setIrrigationType: (irrigationType: string) => void;
    setSoilType: (soilType: string) => void;
    isSelectionComplete: boolean;
    isLoaded: boolean;
    dashboardData: any | null;
    isDashboardLoading: boolean;
    refreshDashboard: () => Promise<void>;
}

const AgriContext = createContext<AgriState | undefined>(undefined);

export function AgriProvider({ children }: { children: ReactNode }) {
    const [district, setDistrict] = useState<District | null>(null);
    const [crop, setCrop] = useState<Crop | null>(null);
    const [province, setProvince] = useState<Province | null>(null);
    const [cropStage, setCropStage] = useState<CropStage | null>(null);
    const [farmSize, setFarmSize] = useState<FarmSize | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [isLoaded, setIsLoaded] = useState(false);
    const [irrigation_type, setIrrigationType] = useState<string | null>(null);
    const [soil_type, setSoilType] = useState<string | null>(null);

    const [dashboardData, setDashboardData] = useState<any | null>(null);
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);

    // Fetch dashboard overview
    const refreshDashboard = useCallback(async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        setIsDashboardLoading(true);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout to handle slow weather/RAG calls

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/dashboard/overview`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                }
            );

            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                setDashboardData(data);

                // Sync profile fields back to context if they are null
                if (data.profile) {
                    if (!district) setDistrict(data.profile.district);
                    if (!crop) setCrop(data.profile.crop);
                    if (!province) setProvince(data.profile.province);
                    if (!cropStage) setCropStage(data.profile.stage);
                    if (!irrigation_type) setIrrigationType(data.profile.irrigation_type);
                    if (!soil_type) setSoilType(data.profile.soil_type);
                }
            } else if (res.status === 401) {
                // Token is invalid/expired
                console.warn("Session expired or invalid token. Redirecting to login...");
                localStorage.removeItem("access_token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_email");
                localStorage.removeItem("username");
                // Trigger a page reload or redirect if on a protected route
                if (window.location.pathname.startsWith('/dashboard')) {
                    window.location.href = '/login';
                }
            }
        } catch (error) {
            // Silently handle network errors - demo data will be used instead
            // Only log in development if explicitly needed for debugging
            if (process.env.NODE_ENV === 'development' && !(error instanceof TypeError)) {
                console.warn("Dashboard API unavailable, using demo data");
            }
        } finally {
            setIsDashboardLoading(false);
        }
    }, [district, crop, province, cropStage, irrigation_type, soil_type]);

    // Initial Load
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const d = localStorage.getItem('district');
            const c = localStorage.getItem('crop');
            const p = localStorage.getItem('province');
            const s = localStorage.getItem('cropStage');
            const f = localStorage.getItem('farmSize');
            const i = localStorage.getItem('irrigationType');
            const sl = localStorage.getItem('soilType');
            const l = localStorage.getItem('language') as Language;

            if (d) setDistrict(d);
            if (c) setCrop(c);
            if (p) setProvince(p);
            if (s) setCropStage(s);
            if (f) setFarmSize(f);
            if (i) setIrrigationType(i);
            if (sl) setSoilType(sl);
            if (l) setLanguage(l);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Fetch dashboard on load or token availability
    useEffect(() => {
        if (isLoaded) {
            refreshDashboard();
        }
    }, [isLoaded, refreshDashboard]);

    // Update localStorage when state changes
    useEffect(() => {
        if (!isLoaded) return;
        if (district) localStorage.setItem('district', district);
        if (crop) localStorage.setItem('crop', crop);
        if (province) localStorage.setItem('province', province);
        if (cropStage) localStorage.setItem('cropStage', cropStage);
        if (farmSize) localStorage.setItem('farmSize', farmSize);
        if (irrigation_type) localStorage.setItem('irrigationType', irrigation_type);
        if (soil_type) localStorage.setItem('soilType', soil_type);
        localStorage.setItem('language', language);
    }, [district, crop, province, cropStage, farmSize, irrigation_type, soil_type, language, isLoaded]);

    const isSelectionComplete = isLoaded && district !== null && crop !== null && province !== null && cropStage !== null && irrigation_type !== null && soil_type !== null;

    return (
        <AgriContext.Provider
            value={{
                district,
                crop,
                province,
                cropStage,
                farmSize,
                language,
                irrigation_type,
                soil_type,
                setDistrict,
                setCrop,
                setProvince,
                setCropStage,
                setFarmSize,
                setLanguage,
                setIrrigationType,
                setSoilType,
                isSelectionComplete,
                isLoaded,
                dashboardData,
                isDashboardLoading,
                refreshDashboard
            }}
        >
            {children}
        </AgriContext.Provider>
    );
}

export function useAgri() {
    const context = useContext(AgriContext);
    if (context === undefined) {
        throw new Error("useAgri must be used within an AgriProvider");
    }
    return context;
}
