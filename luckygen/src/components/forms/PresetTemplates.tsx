'use client';

import React from 'react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { resetColorIndex } from '@/lib/utils/colors';

const presets = [
    {
        title: 'Yes/No',
        segments: [
            { text: 'Yes', color: '#4ECDC4' },
            { text: 'No', color: '#FF6B6B' },
        ],
    },
    {
        title: 'What to Eat?',
        segments: [
            { text: 'Pizza', color: '#FF6B6B' },
            { text: 'Sushi', color: '#4ECDC4' },
            { text: 'Burger', color: '#FFD93D' },
            { text: 'Pasta', color: '#6C5CE7' },
            { text: 'Salad', color: '#A8E6CF' },
        ],
    },
    {
        title: 'Random 1-100',
        segments: Array.from({ length: 10 }, (_, i) => ({
            text: `${(i + 1) * 10}`,
            color: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A8E6CF', '#FF8B94', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'][i],
        })),
    },
    {
        title: 'Truth or Dare',
        segments: [
            { text: 'Truth', color: '#45B7D1' },
            { text: 'Dare', color: '#FF8B94' },
        ],
    },
];

export default function PresetTemplates() {
    const { setSegments, setTitle } = useWheelStore();

    const handlePresetClick = (preset: typeof presets[0]) => {
        resetColorIndex();
        setSegments(preset.segments);
        setTitle(preset.title);
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
            {presets.map((preset) => (
                <button
                    key={preset.title}
                    onClick={() => handlePresetClick(preset)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md"
                >
                    {preset.title}
                </button>
            ))}
        </div>
    );
}
