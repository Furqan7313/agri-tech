"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
    setDistrict: (district: District) => void;
    setCrop: (crop: Crop) => void;
    setProvince: (province: Province) => void;
    setCropStage: (stage: CropStage) => void;
    setFarmSize: (size: FarmSize) => void;
    setLanguage: (lang: Language) => void;
    isSelectionComplete: boolean;
    isLoaded: boolean;
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

    // Load from localStorage on mount (client-only so we never block forever)
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            setDistrict(localStorage.getItem('district'));
            setCrop(localStorage.getItem('crop'));
            setProvince(localStorage.getItem('province'));
            setCropStage(localStorage.getItem('cropStage'));
            setFarmSize(localStorage.getItem('farmSize'));

            const savedLang = localStorage.getItem('language') as Language;
            if (savedLang) setLanguage(savedLang);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Update localStorage when state changes
    React.useEffect(() => {
        if (!isLoaded) return;
        if (district) localStorage.setItem('district', district);
        if (crop) localStorage.setItem('crop', crop);
        if (province) localStorage.setItem('province', province);
        if (cropStage) localStorage.setItem('cropStage', cropStage);
        if (farmSize) localStorage.setItem('farmSize', farmSize);
        localStorage.setItem('language', language);
    }, [district, crop, province, cropStage, farmSize, language, isLoaded]);

    const isSelectionComplete = isLoaded && district !== null && crop !== null && province !== null && cropStage !== null;

    return (
        <AgriContext.Provider
            value={{
                district,
                crop,
                province,
                cropStage,
                farmSize,
                language,
                setDistrict,
                setCrop,
                setProvince,
                setCropStage,
                setFarmSize,
                setLanguage,
                isSelectionComplete,
                isLoaded,
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
