"use client";

import React, { useState, useEffect } from "react";

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    initialValue?: number;
    label?: string;
    onChange: (value: number) => void;
    formatValue?: (value: number) => string;
}

export function Slider({
    min,
    max,
    step = 1,
    initialValue,
    label,
    onChange,
    formatValue = (v) => v.toString(),
}: SliderProps) {
    const [value, setValue] = useState(initialValue || min);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const p = ((value - min) / (max - min)) * 100;
        setPercentage(p);
    }, [value, min, max]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gold-400">{label}</label>
                    <span className="text-sm font-bold text-gold-200">{formatValue(value)}</span>
                </div>
            )}
            <div className="relative h-2 w-full rounded-full bg-black-700">
                <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                    style={{ width: `${percentage}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div
                    className="absolute h-4 w-4 rounded-full bg-gold-100 shadow-[0_0_10px_rgba(251,191,36,0.5)] pointer-events-none transition-all transform -translate-y-1/4 -translate-x-1/2"
                    style={{ left: `${percentage}%`, top: '10%' }}
                />
            </div>
        </div>
    );
}
