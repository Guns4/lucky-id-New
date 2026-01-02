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

export default function LandingPage() {
    const { segments, theme, eliminationMode, toggleEliminationMode, eliminateSegment } = useWheelStore();

    // Apply theme colors to segments
    const themedSegments = applyThemeToSegments(segments, theme);

    const handleEliminate = (text: string) => {
        eliminateSegment(text);
    };

    return (
        <main className={`min-h-screen bg-gradient-to-br ${applyThemeToSegments([], theme).length === 0 ? 'from-purple-900 via-blue-900 to-indigo-900' : ''} text-white transition-colors duration-500`}>
            {/* Top Ad Slot */}
            <TopLeaderboard />

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-8 md:py-16">
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
                    <ThemeSelector />
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
                <div className="my-12">
                    <Wheel
                        segments={themedSegments}
                        theme={theme}
                        eliminationMode={eliminationMode}
                        onEliminate={handleEliminate}
                    />
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

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2026 LuckyGen. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
