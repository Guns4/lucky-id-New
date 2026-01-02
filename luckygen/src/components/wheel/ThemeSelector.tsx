'use client';

import { Sparkles, Diamond, Swords, Zap } from 'lucide-react';
import { useWheelStore, ThemeType } from '@/lib/store/wheelStore';

const THEMES = [
    {
        id: 'default' as ThemeType,
        name: 'Default',
        icon: Sparkles,
        gradient: 'from-purple-500 to-pink-500',
        description: 'Colorful & Fun',
    },
    {
        id: 'casino' as ThemeType,
        name: 'Casino',
        icon: Diamond,
        gradient: 'from-yellow-500 to-amber-600',
        description: 'Vegas Style',
    },
    {
        id: 'anime' as ThemeType,
        name: 'Anime',
        icon: Swords,
        gradient: 'from-pink-400 to-purple-600',
        description: 'Kawaii Vibes',
    },
    {
        id: 'dark' as ThemeType,
        name: 'Dark Cyber',
        icon: Zap,
        gradient: 'from-cyan-400 to-purple-600',
        description: 'Neon Glow',
    },
];

export default function ThemeSelector() {
    const { theme, setTheme } = useWheelStore();

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white">Choose Theme</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {THEMES.map((themeOption) => {
                    const Icon = themeOption.icon;
                    const isActive = theme === themeOption.id;

                    return (
                        <button
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id)}
                            className={`
                                relative p-4 rounded-xl transition-all duration-300
                                ${isActive
                                    ? 'bg-white/20 scale-105 ring-2 ring-white shadow-xl'
                                    : 'bg-white/5 hover:bg-white/10 hover:scale-102'
                                }
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}

                            {/* Icon with gradient */}
                            <div className={`
                                w-12 h-12 mx-auto mb-2 rounded-lg 
                                bg-gradient-to-br ${themeOption.gradient}
                                flex items-center justify-center
                                ${isActive ? 'animate-pulse' : ''}
                            `}>
                                <Icon size={24} className="text-white" />
                            </div>

                            {/* Theme Name */}
                            <p className="text-white font-semibold text-sm mb-1">
                                {themeOption.name}
                            </p>

                            {/* Description */}
                            <p className="text-gray-300 text-xs">
                                {themeOption.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
