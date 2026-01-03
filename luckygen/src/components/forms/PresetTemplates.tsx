'use client';

import React from 'react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { resetColorIndex } from '@/lib/utils/colors';

const presets = [
    {
        title: 'Yes/No',
        icon: '✅',
        segments: [
            { text: 'Yes', color: '#4ECDC4' },
            { text: 'No', color: '#FF6B6B' },
        ],
    },
    {
        title: 'What to Eat?',
        icon: '🍕',
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
        icon: '🔢',
        segments: Array.from({ length: 10 }, (_, i) => ({
            text: `${(i + 1) * 10}`,
            color: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A8E6CF', '#FF8B94', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'][i],
        })),
    },
    {
        title: 'Truth or Dare',
        icon: '🎮',
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
        <div className="flex flex-wrap gap-4 justify-center">
            {presets.map((preset) => (
                <button
                    key={preset.title}
                    onClick={() => handlePresetClick(preset)}
                    className="group relative glass-card-hover glass-card px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3 border border-white/20"
                >
                    {/* Icon with Glow Effect */}
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                        {preset.icon}
                    </span>

                    {/* Text */}
                    <span className="text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {preset.title}
                    </span>

                    {/* Background Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none"></div>
                </button>
            ))}
        </div>
    );
}
