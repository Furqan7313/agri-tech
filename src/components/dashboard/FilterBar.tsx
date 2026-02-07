"use client";

import { useState, useEffect, useMemo } from "react";
import {
    ChevronDown,
    ChevronRight,
    MapPinned, // More detailed map icon
    Leaf,      // Organic leaf shape
    ScanLine,  // High-tech area feel
    Check,
    Search,
    LayoutGrid,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAgri } from "@/context/AgriContext";

// Data Constants
const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan"];

const DISTRICTS: Record<string, string[]> = {
    Punjab: ["Lahore", "Multan", "Faisalabad", "Gujranwala", "Rawalpindi", "Sargodha", "Bahawalpur", "Sialkot", "Sheikhupura", "Rahim Yar Khan"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas"],
    KPK: ["Peshawar", "Mardan", "Abbottabad", "Swat", "Dera Ismail Khan", "Kohat"],
    Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi", "Loralai"],
};

const CROPS = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Corn"];
const STAGES = ["Sowing", "Vegetative", "Flowering", "Harvest"];

const CROP_ICONS: Record<string, string> = {
    Wheat: "🌾", Cotton: "🌿", Corn: "🌽", Rice: "🍚", Sugarcane: "🎋", Maize: "🌽"
};

export function FilterBar() {
    const {
        district, setDistrict,
        crop, setCrop,
        province, setProvince,
        cropStage, setCropStage,
        farmSize, setFarmSize,
        isLoaded
    } = useAgri();

    // Local State
    const [local, setLocal] = useState({
        p: "", d: "", c: "", s: "", size: ""
    });

    const [districtSearch, setDistrictSearch] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Sync local state
    useEffect(() => {
        if (isLoaded) {
            setLocal({
                p: province || "Punjab",
                d: district || "Multan",
                c: crop || "Wheat",
                s: cropStage || "Vegetative",
                size: farmSize || ""
            });
        }
    }, [isLoaded, province, district, crop, cropStage, farmSize]);

    // Derived Data
    const availableDistricts = local.p ? DISTRICTS[local.p] || [] : [];
    const filteredDistricts = useMemo(() => {
        if (!districtSearch) return availableDistricts;
        return availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()));
    }, [availableDistricts, districtSearch]);

    // Handlers
    const updateLocal = (key: string, value: string) => {
        setLocal(prev => {
            const updates: any = { [key]: value };
            if (key === 'p') updates.d = DISTRICTS[value]?.[0] || "";
            return { ...prev, ...updates };
        });
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem('province', local.p);
            localStorage.setItem('district', local.d);
            localStorage.setItem('crop', local.c);
            localStorage.setItem('cropStage', local.s);
            localStorage.setItem('farmSize', local.size);
        }
        await new Promise(r => setTimeout(r, 600));
        window.location.reload();
    };

    return (
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl shadow-green-900/5 rounded-3xl p-3 mb-8">
            <div className="flex flex-col lg:flex-row gap-3">

                {/* 1. Location Block - TEAL GRADIENT ICON */}
                <div className="flex-1 bg-gradient-to-br from-teal-50/50 to-white rounded-2xl p-2 flex items-center gap-3 border border-teal-100/60 transition-all hover:shadow-lg hover:shadow-teal-100/50 group duration-300">

                    {/* Premium Icon Container */}
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg shadow-teal-500/30 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 ring-2 ring-white">
                        <MapPinned className="w-6 h-6 drop-shadow-md" />
                    </div>

                    <div className="flex gap-2 flex-1 min-w-0">
                        {/* Province Select */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex-1 text-left px-2 py-1 hover:bg-white/80 rounded-lg transition-colors min-w-0 group/btn">
                                    <p className="text-[10px] uppercase tracking-widest text-teal-600/70 font-bold mb-0.5">Region</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-800 truncate block">{local.p || "Select"}</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-teal-400 group-hover/btn:text-teal-600 shrink-0 ml-1 transition-colors" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 p-2 rounded-xl shadow-xl border-teal-100" align="start">
                                <DropdownMenuLabel className="text-xs font-bold text-teal-500 uppercase tracking-widest px-2 mb-1">Select Province</DropdownMenuLabel>
                                {PROVINCES.map(p => (
                                    <DropdownMenuItem
                                        key={p}
                                        onClick={() => updateLocal('p', p)}
                                        className={`rounded-lg mb-1 cursor-pointer font-medium py-2 ${local.p === p ? "bg-teal-50 text-teal-700" : "text-gray-600 focus:bg-teal-50"}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full mr-2 bg-teal-500 transition-opacity ${local.p === p ? 'opacity-100' : 'opacity-0'}`} />
                                        {p}
                                        {local.p === p && <Check className="w-4 h-4 ml-auto text-teal-600" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="w-px bg-teal-200/30 my-2" />

                        {/* District Select */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex-1 text-left px-2 py-1 hover:bg-white/80 rounded-lg transition-colors min-w-0 group/btn">
                                    <p className="text-[10px] uppercase tracking-widest text-teal-600/70 font-bold mb-0.5">District</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-800 truncate block">{local.d || "-"}</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-teal-400 group-hover/btn:text-teal-600 shrink-0 ml-1 transition-colors" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 p-2 max-h-[320px] flex flex-col rounded-xl shadow-xl border-teal-100" align="start">
                                <div className="px-2 pb-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-teal-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search..."
                                            value={districtSearch}
                                            onChange={(e) => setDistrictSearch(e.target.value)}
                                            className="h-9 pl-8 text-xs bg-teal-50/50 border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-500 rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar">
                                    <DropdownMenuLabel className="text-xs font-bold text-teal-500 uppercase tracking-widest px-2 mb-1">Select District</DropdownMenuLabel>
                                    {filteredDistricts.map(d => (
                                        <DropdownMenuItem
                                            key={d}
                                            onClick={() => updateLocal('d', d)}
                                            className={`rounded-lg mb-1 cursor-pointer font-medium py-2 ${local.d === d ? "bg-teal-50 text-teal-700" : "text-gray-600 focus:bg-teal-50"}`}
                                        >
                                            {d}
                                            {local.d === d && <Check className="w-4 h-4 ml-auto text-teal-600" />}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* 2. Crop Block - AMBER GRADIENT ICON */}
                <div className="flex-1 bg-gradient-to-br from-orange-50/50 to-white rounded-2xl p-2 flex items-center gap-3 border border-orange-100/60 transition-all hover:shadow-lg hover:shadow-orange-100/50 group duration-300">

                    {/* Premium Icon Container */}
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 ring-2 ring-white">
                        <Leaf className="w-6 h-6 drop-shadow-md fill-white/20" />
                    </div>

                    <div className="flex gap-2 flex-1 min-w-0">
                        {/* Crop Select */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex-1 text-left px-2 py-1 hover:bg-white/80 rounded-lg transition-colors min-w-0 group/btn">
                                    <p className="text-[10px] uppercase tracking-widest text-orange-600/70 font-bold mb-0.5">Crop</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-800 truncate block">
                                            <span className="mr-1.5">{CROP_ICONS[local.c]}</span>
                                            {local.c || "Select"}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-orange-600 shrink-0 ml-1 transition-colors" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 p-3 rounded-2xl shadow-xl border-orange-100" align="start">
                                <DropdownMenuLabel className="text-xs font-bold text-orange-500 uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
                                    <LayoutGrid className="w-3 h-3" /> Select Crop
                                </DropdownMenuLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {CROPS.map(c => (
                                        <DropdownMenuItem
                                            key={c}
                                            onClick={() => updateLocal('c', c)}
                                            className={`rounded-xl p-3 cursor-pointer border flex flex-col items-center gap-2 text-center transition-all duration-200 ${local.c === c ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 text-orange-800 shadow-md transform scale-[1.02]" : "bg-white border-gray-100 text-gray-600 hover:border-orange-200 hover:shadow-sm"}`}
                                        >
                                            <span className="text-3xl drop-shadow-sm filter saturate-150">{CROP_ICONS[c]}</span>
                                            <span className="font-bold text-xs tracking-wide">{c}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="w-px bg-orange-200/30 my-2" />

                        {/* Stage Select */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex-1 text-left px-2 py-1 hover:bg-white/80 rounded-lg transition-colors min-w-0 group/btn">
                                    <p className="text-[10px] uppercase tracking-widest text-orange-600/70 font-bold mb-0.5">Stage</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-800 truncate block">{local.s || "-"}</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-orange-600 shrink-0 ml-1 transition-colors" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 p-2 rounded-xl shadow-xl border-orange-100" align="start">
                                <DropdownMenuLabel className="text-xs font-bold text-orange-500 uppercase tracking-widest px-2 mb-1">Growth Stage</DropdownMenuLabel>
                                {STAGES.map(s => (
                                    <DropdownMenuItem
                                        key={s}
                                        onClick={() => updateLocal('s', s)}
                                        className={`rounded-lg mb-1 cursor-pointer font-medium py-2 ${local.s === s ? "bg-orange-50 text-orange-700" : "text-gray-600 focus:bg-orange-50/50"}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-orange-500 transition-opacity ${local.s === s ? 'opacity-100' : 'opacity-0'}`} />
                                        {s}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* 3. Area Block - BLUE GRADIENT ICON */}
                <div className="w-full lg:w-48 bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl p-2 flex items-center gap-3 border border-indigo-100/60 transition-all hover:shadow-lg hover:shadow-indigo-100/50 group duration-300">

                    {/* Premium Icon Container */}
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 ring-2 ring-white">
                        <ScanLine className="w-6 h-6 drop-shadow-md" />
                    </div>

                    <div className="flex-1 min-w-0 px-1">
                        <p className="text-[10px] uppercase tracking-widest text-indigo-600/70 font-bold mb-0.5 whitespace-nowrap">Size (Acres)</p>
                        <div className="flex items-center">
                            <Input
                                type="number"
                                value={local.size}
                                onChange={(e) => updateLocal('size', e.target.value)}
                                className="h-6 p-0 border-none shadow-none bg-transparent text-sm font-bold text-gray-900 focus-visible:ring-0 placeholder:text-gray-300"
                                placeholder="0"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Action Button - GRADIENT ANIMATED */}
                <Button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className={`
                        h-auto rounded-2xl px-6 min-w-[120px] font-bold text-sm shadow-xl transition-all duration-300
                        flex items-center justify-center gap-2
                        ${isUpdating
                            ? "bg-gray-100 text-gray-400 border border-gray-200 shadow-none cursor-default"
                            : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                        }
                    `}
                >
                    {isUpdating ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Syncing...</span>
                        </>
                    ) : (
                        <>
                            <span>Update</span>
                            <ChevronRight className="w-4 h-4" />
                        </>
                    )}
                </Button>

            </div>
        </div>
    );
}
