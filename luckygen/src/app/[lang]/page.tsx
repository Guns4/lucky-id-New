'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
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
            <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
                {/* Top Leaderboard Ad - High Visibility */}
                <TopLeaderboardAd slotId="1234567890" refreshTrigger={spinCount} />

                {/* Main Split Screen Layout */}
                <div className="flex-1 flex flex-col lg:flex-row">
                    {/* Left Sidebar - Control Panel */}
                    {!isFullscreen && (
                        <aside className="w-full lg:w-[35%] lg:max-w-md order-2 lg:order-1 shadow-xl">
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
                    <main className={`flex-1 relative bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 order-1 lg:order-2 transition-all duration-300 ${isFullscreen ? 'w-full' : ''}`}>
                        {/* Fullscreen Toggle Button */}
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="absolute top-6 right-6 z-50 hidden lg:flex items-center gap-2 px-5 py-3 backdrop-blur-md bg-white/80 hover:bg-white/90 text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border border-gray-200/50"
                            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                            {isFullscreen ? (
                                <>
                                    <Minimize2 size={18} />
                                    <span className="text-sm">Exit Fullscreen</span>
                                </>
                            ) : (
                                <>
                                    <Maximize2 size={18} />
                                    <span className="text-sm">Fullscreen</span>
                                </>
                            )}
                        </button>

                        {/* Sticky Header - Mobile Only */}
                        <div className="lg:hidden sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
                            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 transition-transform duration-300 hover:scale-105">
                                        <img
                                            src="/ageinfo-logo.png"
                                            alt="LuckyGen Logo"
                                            className="w-full h-full object-cover shadow-lg rounded-full"
                                        />
                                    </div>
                                    <span className="font-bold text-xl text-gray-900">LuckyGen</span>
                                </div>
                            </div>
                        </div>

                        {/* Wheel Container */}
                        <div className="flex flex-col items-center justify-center min-h-[50vh] lg:min-h-screen p-4 lg:p-8">
                            {/* 3D Toggle */}
                            <div className="mb-6 flex gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-200">
                                <button
                                    onClick={() => setIs3D(false)}
                                    className={`px-6 py-3 rounded-xl transition-all font-bold text-sm ${!is3D
                                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md scale-105'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    2D Classic
                                </button>
                                <button
                                    onClick={() => setIs3D(true)}
                                    className={`px-6 py-3 rounded-xl transition-all font-bold text-sm ${is3D
                                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md scale-105'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Realistic
                                </button>
                            </div>

                            {/* Wheel Component */}
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                                {/* Wheel */}
                                <div className="relative z-10">
                                    <Wheel
                                        segments={themedSegments}
                                        theme={theme}
                                        themeConfig={currentThemeConfig}
                                        eliminationMode={eliminationMode}
                                        onEliminate={handleEliminate}
                                        onSpinComplete={handleSpinComplete}
                                        mode={is3D ? '3D' : '2D'}
                                    />
                                </div>
                            </div>

                            {/* Segment Count Info */}
                            {segments.length > 0 && (
                                <div className="mt-6 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
                                    <span className="text-gray-700 font-semibold">
                                        🎯 {segments.length} option{segments.length !== 1 ? 's' : ''} ready
                                    </span>
                                </div>
                            )}

                            {/* The Money Spot - Rectangle Ad Below Wheel */}
                            <MediumRectangleAd slotId="0987654321" refreshTrigger={spinCount} />
                        </div>

                        {/* Ad Unit - Fixed Bottom on Desktop, Below Wheel on Mobile */}
                        <div className="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 mt-8 lg:mt-0">
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
