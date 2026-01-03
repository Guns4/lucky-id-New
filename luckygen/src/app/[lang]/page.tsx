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
            className={`min-h-screen text-white transition-colors duration-500 bg-cover bg-center relative ${!bgParams ? 'bg-gradient-to-br ' + bgClasses : ''}`}
            style={bgParams ? { backgroundImage: bgParams } : {}}
        >
            {/* Animated Background Gradient Overlay */}
            {!bgParams && (
                <div className="fixed inset-0 opacity-50 pointer-events-none">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70" style={{ animationDelay: '4s' }}></div>
                </div>
            )}

            {/* Top Ad Slot */}
            <TopLeaderboard />

            {/* Sticky Header / Nav with Glassmorphism */}
            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <img src="/logo.png" alt="LuckyGen Logo" className="relative w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-2xl" />
                        </div>
                        <span className="font-bold text-xl md:text-2xl tracking-tight hidden sm:block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse-glow">
                            LuckyGen
                        </span>
                    </div>
                    <AuthButton />
                </div>
            </div>

            {/* Hero Section with Enhanced Styling */}
            <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                <div className="text-center mb-10 md:mb-16 animate-slide-up">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
                        Spin the Wheel,<br className="md:hidden" /> Make a Decision ✨
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
                        Can&apos;t decide? Let fate choose! Create custom wheels, spin, and share with friends.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <div className="glass-card px-6 py-3 rounded-full text-sm md:text-base font-semibold">
                            🎯 100% Free
                        </div>
                        <div className="glass-card px-6 py-3 rounded-full text-sm md:text-base font-semibold">
                            ⚡ Instant Results
                        </div>
                        <div className="glass-card px-6 py-3 rounded-full text-sm md:text-base font-semibold">
                            🎨 Customizable
                        </div>
                    </div>
                </div>

                {/* Preset Templates with Enhanced Style */}
                <div className="mb-10 animate-slide-up stagger-1">
                    <PresetTemplates />
                </div>

                {/* Theme Selector with Animation */}
                <div className="my-10 animate-slide-up stagger-2">
                    <ThemeSelector themes={themes} />
                </div>

                {/* Elimination Mode Toggle with Better Design */}
                <div className="flex justify-center mb-10 animate-slide-up stagger-3">
                    <label className="glass-card-hover glass-card flex items-center gap-4 px-8 py-4 rounded-2xl cursor-pointer shadow-xl">
                        <input
                            type="checkbox"
                            checked={eliminationMode}
                            onChange={toggleEliminationMode}
                            className="w-6 h-6 rounded-lg cursor-pointer accent-purple-600"
                        />
                        <span className="font-bold text-base md:text-lg">
                            🔥 Elimination Mode <span className="text-gray-300 font-normal text-sm">(Remove winner after spin)</span>
                        </span>
                    </label>
                </div>

                {/* Main Wheel Section with Enhanced Styling */}
                <div className="my-12 flex flex-col items-center animate-scale-in">
                    {/* 3D Toggle with Modern Design */}
                    <div className="mb-8 flex gap-2 glass-card p-2 rounded-2xl backdrop-blur-sm shadow-2xl">
                        <button
                            onClick={() => setIs3D(false)}
                            className={`px-6 py-3 rounded-xl transition-all font-bold ${!is3D
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg scale-105'
                                    : 'hover:bg-white/10 text-gray-300'
                                }`}
                        >
                            2D Classic
                        </button>
                        <button
                            onClick={() => setIs3D(true)}
                            className={`px-6 py-3 rounded-xl transition-all font-bold ${is3D
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg scale-105'
                                    : 'hover:bg-white/10 text-gray-300'
                                }`}
                        >
                            3D Immersive
                        </button>
                    </div>

                    {/* Wheel Container with Decorative Elements */}
                    <div className="relative">
                        {/* Glow Effect Behind Wheel */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                        {/* Wheel Component */}
                        <div className="relative z-10">
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
                    </div>
                </div>

                {/* Segment Editor with Glass Effect */}
                <div className="animate-slide-up stagger-4">
                    <SegmentEditor />
                </div>

                {/* Share Button with Better Design */}
                <div className="flex justify-center mt-10 animate-slide-up stagger-5">
                    <ShareButton />
                </div>
            </section>

            {/* In-Content Ad */}
            <InContentAd />

            {/* Description for SEO with Better Styling */}
            <section className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        How to Use the Wheel
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                            LuckyGen is a free, easy-to-use decision-making tool. Simply add your options,
                            customize colors, and spin the wheel to let randomness decide for you!
                        </p>
                        <h3 className="text-3xl font-bold mt-12 mb-6 text-purple-300">Popular Uses:</h3>
                        <ul className="grid md:grid-cols-2 gap-4 text-gray-200 text-lg">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🍕</span>
                                <span>Decide what to eat for lunch or dinner</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎁</span>
                                <span>Pick a random winner for giveaways</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎮</span>
                                <span>Choose truth or dare questions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✅</span>
                                <span>Make yes/no decisions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🔢</span>
                                <span>Random number generation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🤝</span>
                                <span>Team building activities</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Modern Footer with Multiple Columns */}
            <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg mt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="LuckyGen Logo" className="w-10 h-10 object-contain" />
                                <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    LuckyGen
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                                The ultimate random decision maker. Spin the wheel and let fate decide!
                                Perfect for games, giveaways, and everyday choices.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="glass-card-hover glass-card p-3 rounded-lg">
                                    <span className="text-xl">🐦</span>
                                </a>
                                <a href="#" className="glass-card-hover glass-card p-3 rounded-lg">
                                    <span className="text-xl">📱</span>
                                </a>
                                <a href="#" className="glass-card-hover glass-card p-3 rounded-lg">
                                    <span className="text-xl">📧</span>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-purple-300">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/en/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                <li><a href="/en/explore" className="text-gray-400 hover:text-white transition-colors">Explore Wheels</a></li>
                                <li><a href="/en/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                                <li>
                                    <a href="/stream-view" target="_blank" className="text-green-400 hover:text-green-300 flex items-center gap-2 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                        Streamer Mode
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-purple-300">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="/en/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="/en/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/10 pt-8 text-center">
                        <p className="text-gray-400">
                            &copy; 2026 LuckyGen. All rights reserved. Made with ❤️ for decision makers everywhere.
                        </p>
                    </div>
                </div>
            </footer>

            {/* AI Mascot */}
            <LuckyMascot />
        </main>
    );
}
