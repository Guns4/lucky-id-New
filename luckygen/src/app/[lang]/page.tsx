'use client';

import { useState } from 'react';
import Image from 'next/image';
import WheelClient from '@/components/wheel/WheelClient'; // Dynamic import with ssr:false
import ControlPanel from '@/components/forms/ControlPanel';
import InContentAd from '@/components/ads/InContentAd';
import AdUnit, { TopLeaderboardAd, MediumRectangleAd } from '@/components/ads/AdUnit';
import AdBlockModal from '@/components/ads/AdBlockModal';
import { useWheelStore } from '@/lib/store/wheelStore';
import { useThemes } from '@/hooks/useThemes';

import { Maximize2, Minimize2 } from 'lucide-react';
import Navigation from '@/components/shared/Navigation';

export default function LandingPage() {
    const {
        segments,
        theme,
        eliminationMode,
        soundEnabled,
        setTheme,
        toggleEliminationMode,
        toggleSound,
        eliminateSegment,
        setSegments,
        addSegment,
        removeSegment,
        updateSegment,
    } = useWheelStore();

    const [is3D, setIs3D] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [spinCount, setSpinCount] = useState(0); // Tracks spins for ad refresh
    const { themes, themeKeys } = useThemes();

    // Get current theme config
    const currentThemeConfig = themes?.[theme] || themes?.['default'];

    // Apply theme colors to segments
    const activeColors = currentThemeConfig?.colors || ['#FF0000', '#0000FF'];
    const themedSegments = segments.map((s, i) => ({
        ...s,
        color: activeColors[i % activeColors.length]
    }));

    const handleEliminate = (text: string) => {
        eliminateSegment(text);
    };

    const handleSpinComplete = (winner: string) => {
        // Increment spin count to trigger ad refresh
        setSpinCount(prev => prev + 1);
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-[#0a0f1e] flex flex-col overflow-hidden">
                {/* Top Leaderboard Ad - High Visibility */}
                <TopLeaderboardAd slotId="1234567890" refreshTrigger={spinCount} />

                {/* Main Split Screen Layout */}
                <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
                    {/* Left Sidebar - Control Panel */}
                    {!isFullscreen && (
                        <aside className="w-full lg:w-[400px] xl:w-[450px] order-2 lg:order-1 flex-shrink-0 border-r border-white/10 glass-panel z-10">
                            <ControlPanel
                                segments={segments}
                                setSegments={setSegments}
                                addSegment={addSegment}
                                removeSegment={removeSegment}
                                updateSegment={updateSegment}
                                theme={theme}
                                setTheme={setTheme}
                                eliminationMode={eliminationMode}
                                toggleEliminationMode={toggleEliminationMode}
                                soundEnabled={soundEnabled}
                                toggleSound={toggleSound}
                                themes={themes}
                            />
                        </aside>
                    )}

                    {/* Right Stage - Wheel Display */}
                    <main className={`flex-1 relative order-1 lg:order-2 transition-all duration-300 ${isFullscreen ? 'w-full' : ''} flex flex-col`}>
                        {/* Background Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent pointer-events-none" />

                        {/* Fullscreen Toggle Button */}
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="absolute top-6 right-6 z-50 hidden lg:flex items-center gap-2 px-4 py-2 glass-button text-white/90 rounded-full text-sm font-medium hover:text-white"
                            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            <span className="hidden xl:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
                        </button>

                        {/* Sticky Header - Mobile Only */}
                        <div className="lg:hidden sticky top-0 z-40 glass-panel border-b border-white/10">
                            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src="/icon-192x192.png"
                                            alt="LuckyGen Logo"
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain rounded-full ring-2 ring-purple-500/50"
                                            priority
                                        />
                                    </div>
                                    <span className="font-bold text-lg text-white tracking-tight">LuckyGen</span>
                                </div>
                            </div>
                        </div>

                        {/* Wheel Container */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 overflow-y-auto">

                            {/* 3D Toggle */}
                            <div className="mb-8 flex p-1 glass-panel rounded-full relative z-20">
                                <button
                                    onClick={() => setIs3D(false)}
                                    className={`px-6 py-2 rounded-full transition-all font-medium text-sm ${!is3D
                                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Classic 2D
                                </button>
                                <button
                                    onClick={() => setIs3D(true)}
                                    className={`px-6 py-2 rounded-full transition-all font-medium text-sm ${is3D
                                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Realistic 3D
                                </button>
                            </div>

                            {/* Wheel Component - Client Side Only */}
                            <div className="relative z-10 scale-90 lg:scale-100 transition-transform">
                                {/* Glow Effect behind wheel */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>

                                <WheelClient
                                    segments={themedSegments}
                                    theme={theme}
                                    themeConfig={currentThemeConfig}
                                    eliminationMode={eliminationMode}
                                    onEliminate={handleEliminate}
                                    onSpinComplete={handleSpinComplete}
                                    mode={is3D ? '3D' : '2D'}
                                />
                            </div>

                            {/* Segment Count Info */}
                            {segments.length > 0 && (
                                <div className="mt-8 px-5 py-2 glass-panel rounded-full border border-white/5">
                                    <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        {segments.length} active options
                                    </span>
                                </div>
                            )}

                            {/* The Money Spot - Rectangle Ad Below Wheel */}
                            <div className="mt-8 opacity-80 hover:opacity-100 transition-opacity">
                                <MediumRectangleAd slotId="0987654321" refreshTrigger={spinCount} />
                            </div>
                        </div>

                        {/* Ad Unit - Fixed Bottom on Desktop, Below Wheel on Mobile */}
                        <div className="w-full glass-panel border-t border-white/5 p-2 bg-black/20">
                            <InContentAd />
                        </div>
                    </main>
                </div>

                {/* AdBlock Detection Modal */}
                <AdBlockModal />
            </div>
        </>
    );
}
