'use client';

import { useState, useEffect } from 'react';
import Wheel from '@/components/wheel/Wheel';
import { useWheelStore } from '@/lib/store/wheelStore';
import { useThemes } from '@/hooks/useThemes';
import { applyThemeToSegments, getThemeConfig, ThemeConfig } from '@/lib/utils/themes';
import { Settings, Monitor, Maximize } from 'lucide-react';

export default function StreamerView() {
    const { segments, theme, eliminationMode, eliminateSegment } = useWheelStore();
    const { themes } = useThemes();
    const [bgColor, setBgColor] = useState<'transparent' | 'green' | 'blue'>('green');
    const [showControls, setShowControls] = useState(true);

    // Hydration check
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const currentThemeConfig = themes?.[theme] || themes?.['default'] || getThemeConfig('default');

    // Ensure we have a valid theme config for the wheel
    const activeThemeConfig: ThemeConfig = {
        name: currentThemeConfig?.name || 'Default',
        colors: currentThemeConfig?.colors || ['#FF0000', '#0000FF'],
        background: currentThemeConfig?.background || '',
        pointerColor: currentThemeConfig?.pointerColor || '#000000',
        centerColor: currentThemeConfig?.centerColor || '#FFFFFF',
        textColor: currentThemeConfig?.textColor || '#FFFFFF',
        backgroundImageUrl: currentThemeConfig?.backgroundImageUrl,
        pointerImageUrl: currentThemeConfig?.pointerImageUrl,
        centerButtonGradient: currentThemeConfig?.centerButtonGradient || 'from-white to-gray-200',
        centerButtonStyle: currentThemeConfig?.centerButtonStyle,
        winnerGradient: currentThemeConfig?.winnerGradient || 'from-yellow-400 to-yellow-600',
        outerRing: currentThemeConfig?.outerRing || '#333333'
    };

    const themedSegments = segments.map((s, i) => ({
        ...s,
        color: activeThemeConfig.colors[i % activeThemeConfig.colors.length]
    }));

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center relative transition-colors duration-300`}
            style={{
                backgroundColor: bgColor === 'green' ? '#00FF00' : bgColor === 'blue' ? '#0000FF' : 'transparent'
            }}
        >
            {/* Control Panel (Hidden when mouse idle could be added, but manual toggle is safer for OBS) */}
            {showControls && (
                <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-xl backdrop-blur-sm z-50 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold flex items-center gap-2"><Monitor size={16} /> OBS Controls</h2>
                        <button onClick={() => setShowControls(false)} className="text-gray-400 hover:text-white">
                            <Maximize size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 block mb-2">Background Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setBgColor('green')}
                                    className={`p-2 text-xs rounded border ${bgColor === 'green' ? 'border-green-500 bg-green-500/20' : 'border-gray-600'}`}
                                >
                                    Green
                                </button>
                                <button
                                    onClick={() => setBgColor('blue')}
                                    className={`p-2 text-xs rounded border ${bgColor === 'blue' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600'}`}
                                >
                                    Blue
                                </button>
                                <button
                                    onClick={() => setBgColor('transparent')}
                                    className={`p-2 text-xs rounded border ${bgColor === 'transparent' ? 'border-white bg-white/20' : 'border-gray-600'}`}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div className="text-xs text-gray-500">
                            <p>💡 Tip: In OBS, add a "Window Capture" or "Browser Source".</p>
                            <p>For Green/Blue, use "Chroma Key" filter.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Controls Button (only visible when controls hidden) */}
            {!showControls && (
                <button
                    onClick={() => setShowControls(true)}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all opacity-0 hover:opacity-100"
                >
                    <Settings size={20} />
                </button>
            )}

            {/* The Main Event */}
            <div className="scale-125 md:scale-150 transform transition-transform duration-500">
                <Wheel
                    segments={themedSegments}
                    theme={theme}
                    themeConfig={activeThemeConfig}
                    eliminationMode={eliminationMode}
                    onEliminate={(text) => eliminateSegment(text?.toString())}
                />
            </div>

            {/* Minimal Watermark (Optional, good for branding) */}
            <div className="absolute bottom-4 right-4 text-white/50 font-bold text-xl drop-shadow-md">
                LuckyGen.com
            </div>
        </div>
    );
}
