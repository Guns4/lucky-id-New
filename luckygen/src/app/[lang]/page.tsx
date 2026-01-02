'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import SegmentEditor from '@/components/forms/SegmentEditor';
import PresetTemplates from '@/components/forms/PresetTemplates';
import ThemeSelector from '@/components/wheel/ThemeSelector';
import TopLeaderboard from '@/components/ads/TopLeaderboard';
import InContentAd from '@/components/ads/InContentAd';
import ShareButton from '@/components/shared/ShareButton';
import { useWheelStore } from '@/lib/store/wheelStore';
import { applyThemeToSegments } from '@/lib/utils/themes';

import { useThemes } from '@/hooks/useThemes';
import AuthButton from '@/components/auth/AuthButton';
import LuckyMascot from '@/components/mascot/LuckyMascot';
import Wheel3D from '@/components/wheel/Wheel3D';

export default function LandingPage() {
    const { segments, theme, eliminationMode, toggleEliminationMode, eliminateSegment } = useWheelStore();
    const [is3D, setIs3D] = useState(false);
    const { themes, themeKeys } = useThemes();

    // Get current theme config - look up in dynamic themes, fallback to static defaults handled by useThemes or getThemeConfig
    const currentThemeConfig = themes?.[theme] || themes?.['default'];

    // Apply theme colors to segments
    // We need to use valid ThemeType or string for applyThemeToSegments, but checking if we can pass custom logic?
    // applyThemeToSegments uses getThemeConfig internally. We should probably update it or just rely on Wheel to render colors?
    // Actually, applyThemeToSegments modifies state segments color. We should probably just pass the raw segments to Wheel and let Wheel choose colors?
    // BUT Wheel expects segments to have colors.
    // For now, let's keep applyThemeToSegments usage but note that it might not pick up dynamic colors unless we update utils.
    // However, since useThemes returns themes merged with defaults, we can reuse that map.
    // Ideally applyThemeToSegments should accept a themeConfig object, not just type string.
    // For this step, I'll stick to 'theme' string, assuming `getThemeConfig` won't find dynamic themes unless `THEME_CONFIGS` is mutable or updated.
    // Wait, dynamic themes only exist in `useThemes` hook state. `getThemeConfig` in `utils/themes.ts` accesses the static `THEME_CONFIGS`.
    // So static function won't see dynamic themes.
    // FIX: Update applyThemeToSegments to accept themeConfig object optionally or we rely on Wheel to color them if passed colors are empty.

    // Actually, `applyThemeToSegments` logic is simple: map index to colors.
    // Let's do it locally here or update the util function?
    // Doing it locally is safer for now to avoid widespread refactor.
    const activeColors = currentThemeConfig?.colors || ['#FF0000', '#0000FF'];
    const themedSegments = segments.map((s, i) => ({
        ...s,
        color: activeColors[i % activeColors.length]
    }));

    const handleEliminate = (text: string) => {
        eliminateSegment(text);
    };

    const bgParams = currentThemeConfig?.backgroundImageUrl
        ? `url('${currentThemeConfig.backgroundImageUrl}')`
        : '';
    const bgClasses = currentThemeConfig?.background || 'from-purple-900 via-blue-900 to-indigo-900';

    return (
        <main
            className={`min-h-screen text-white transition-colors duration-500 bg-cover bg-center ${!bgParams ? 'bg-gradient-to-br ' + bgClasses : ''}`}
            style={bgParams ? { backgroundImage: bgParams } : {}}
        >
            {/* Top Ad Slot */}
            <TopLeaderboard />

            {/* Header / Nav */}
            <div className="container mx-auto px-4 py-4 flex justify-end">
                <AuthButton />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-4 md:py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        Spin the Wheel, Make a Decision
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Can&apos;t decide? Let fate choose! Create custom wheels, spin, and share with friends.
                    </p>
                </div>

                {/* Preset Templates */}
                <PresetTemplates />

                {/* Theme Selector */}
                <div className="my-8">
                    <ThemeSelector themes={themes} />
                </div>

                {/* Elimination Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <label className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-xl cursor-pointer hover:bg-white/15 transition-colors">
                        <input
                            type="checkbox"
                            checked={eliminationMode}
                            onChange={toggleEliminationMode}
                            className="w-5 h-5 rounded cursor-pointer"
                        />
                        <span className="font-semibold">
                            🔥 Elimination Mode (Remove Winner After Spin)
                        </span>
                    </label>
                </div>

                {/* Main Wheel */}
                <div className="my-12 flex flex-col items-center">
                    {/* 3D Toggle */}
                    <div className="mb-6 flex gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
                        <button
                            onClick={() => setIs3D(false)}
                            className={`px-4 py-2 rounded-md transition-all ${!is3D ? 'bg-purple-600 shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            2D Classic
                        </button>
                        <button
                            onClick={() => setIs3D(true)}
                            className={`px-4 py-2 rounded-md transition-all ${is3D ? 'bg-purple-600 shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            3D Immersive
                        </button>
                    </div>

                    {is3D ? (
                        <Wheel3D
                            segments={themedSegments}
                            themeConfig={currentThemeConfig}
                        />
                    ) : (
                        <Wheel
                            segments={themedSegments}
                            theme={theme}
                            themeConfig={currentThemeConfig}
                            eliminationMode={eliminationMode}
                            onEliminate={handleEliminate}
                        />
                    )}
                </div>

                {/* Segment Editor */}
                <SegmentEditor />

                {/* Share Button */}
                <div className="flex justify-center mt-8">
                    <ShareButton />
                </div>
            </section>

            {/* In-Content Ad */}
            <InContentAd />

            {/* Description for SEO */}
            <section className="container mx-auto px-4 py-12 max-w-4xl">
                <h2 className="text-3xl font-bold mb-6">How to Use the Wheel</h2>
                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                        LuckyGen is a free, easy-to-use decision-making tool. Simply add your options,
                        customize colors, and spin the wheel to let randomness decide for you!
                    </p>
                    <h3 className="text-2xl font-semibold mt-8 mb-4">Popular Uses:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Decide what to eat for lunch or dinner</li>
                        <li>Pick a random winner for giveaways</li>
                        <li>Choose truth or dare questions</li>
                        <li>Make yes/no decisions</li>
                        <li>Random number generation</li>
                        <li>Team building activities</li>
                    </ul>
                </div>
            </section>

            {/* Luck Gen Footer */}
            <footer className="border-t border-white/10 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2026 LuckyGen. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="/stream-view" target="_blank" className="text-sm text-green-400 hover:text-green-300 flex items-center justify-center gap-1 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                            Open Streamer Mode (OBS)
                        </a>
                    </div>
                </div>
            </footer>

            {/* AI Mascot */}
            <LuckyMascot />
        </main>
    );
}
