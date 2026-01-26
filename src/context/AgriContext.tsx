"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type District = "Multan" | "Jhelum" | "Khanewal";
export type Crop = "Wheat" | "Cotton";

interface AgriState {
    district: District | null;
    crop: Crop | null;
    setDistrict: (district: District) => void;
    setCrop: (crop: Crop) => void;
    isSelectionComplete: boolean;
}

const AgriContext = createContext<AgriState | undefined>(undefined);

export function AgriProvider({ children }: { children: ReactNode }) {
    const [district, setDistrict] = useState<District | null>(null);
    const [crop, setCrop] = useState<Crop | null>(null);

    const isSelectionComplete = district !== null && crop !== null;

    return (
        <AgriContext.Provider
            value={{
                district,
                crop,
                setDistrict,
                setCrop,
                isSelectionComplete,
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
