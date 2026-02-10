"use client";

import React, { useEffect, useState } from "react";

interface RiskGaugeProps {
    score: number;
    size?: number;
}

export function RiskGauge({ score, size = 80 }: RiskGaugeProps) {
    const [offset, setOffset] = useState(0);
    const strokeWidth = size * 0.12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        // Animate the progress
        const progressOffset = circumference - (score / 100) * circumference;
        const timer = setTimeout(() => {
            setOffset(progressOffset);
        }, 100);
        return () => clearTimeout(timer);
    }, [score, circumference]);

    // Determine color based on score
    const getColor = () => {
        if (score > 80) return "#22C55E"; // green-500 (Optimal)
        if (score > 50) return "#F59E0B"; // amber-500 (Stable)
        return "#EF4444"; // red-500 (Unstable)
    };

    const color = getColor();

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB" // gray-200
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: offset,
                        transition: "stroke-dashoffset 1500ms cubic-bezier(0.4, 0, 0.2, 1)",
                        strokeLinecap: "round",
                    }}
                />
            </svg>
            {/* Centered Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-[#1B4332] leading-none">
                    {Math.round(score)}
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                    Health
                </span>
            </div>
        </div>
    );
}
