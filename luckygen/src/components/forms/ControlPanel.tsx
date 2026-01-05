'use client';

import { useState } from 'react';
import { Shuffle, ArrowDownAZ, Edit3, Settings2, Plus, Trash2, Palette } from 'lucide-react';
import { WheelSegment } from '@/lib/store/wheelStore';
import { ThemeType } from '@/lib/utils/themes';
import ThemeSelector from '@/components/wheel/ThemeSelector';
import { ThemeConfig } from '@/lib/utils/themes';
import { getRandomColor } from '@/lib/utils/colors';

interface ControlPanelProps {
    segments: WheelSegment[];
    setSegments: (segments: WheelSegment[]) => void;
    addSegment: (segment: WheelSegment) => void;
    removeSegment: (index: number) => void;
    updateSegment: (index: number, updates: Partial<WheelSegment>) => void;
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    eliminationMode: boolean;
    toggleEliminationMode: () => void;
    soundEnabled: boolean;
    toggleSound: () => void;
    themes?: Record<string, ThemeConfig>;
}

export default function ControlPanel({
    segments,
    setSegments,
    addSegment,
    removeSegment,
    updateSegment,
    theme,
    setTheme,
    eliminationMode,
    toggleEliminationMode,
    soundEnabled,
    toggleSound,
    themes,
}: ControlPanelProps) {
    const [activeTab, setActiveTab] = useState<'entries' | 'settings'>('entries');
    const [bulkText, setBulkText] = useState('');
    const [newSegmentText, setNewSegmentText] = useState('');

    // Sync bulk text with segments when switching to entries tab
    const handleTabChange = (tab: 'entries' | 'settings') => {
        if (tab === 'entries' && activeTab !== 'entries') {
            setBulkText(segments.map(s => s.text).join('\n'));
        }
        setActiveTab(tab);
    };

    // Update segments from bulk textarea
    const handleBulkUpdate = () => {
        const lines = bulkText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const newSegments = lines.map((text, index) => ({
            text,
            color: segments[index]?.color || getRandomColor(),
        }));

        setSegments(newSegments);
    };

    // Shuffle segments
    const handleShuffle = () => {
        const shuffled = [...segments].sort(() => Math.random() - 0.5);
        setSegments(shuffled);
        setBulkText(shuffled.map(s => s.text).join('\n'));
    };

    // Sort segments alphabetically
    const handleSort = () => {
        const sorted = [...segments].sort((a, b) => a.text.localeCompare(b.text));
        setSegments(sorted);
        setBulkText(sorted.map(s => s.text).join('\n'));
    };

    // Add single segment
    const handleAddSegment = () => {
        if (newSegmentText.trim()) {
            addSegment({
                text: newSegmentText.trim(),
                color: getRandomColor(),
            });
            setNewSegmentText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddSegment();
        }
    };

    return (
        <div className="h-full bg-white lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl font-bold">🎡</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Wheel Editor</h2>
                        <p className="text-sm text-gray-500">Customize your wheel</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => handleTabChange('entries')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'entries'
                                ? 'bg-white text-purple-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Edit3 size={18} />
                        <span>Entries</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('settings')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'settings'
                                ? 'bg-white text-purple-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Settings2 size={18} />
                        <span>Settings</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'entries' ? (
                    <div className="space-y-6">
                        {/* Bulk Input Section */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quick Add (one per line)
                            </label>
                            <textarea
                                value={bulkText}
                                onChange={(e) => setBulkText(e.target.value)}
                                onBlur={handleBulkUpdate}
                                placeholder="Pizza&#10;Burger&#10;Sushi&#10;Tacos"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-400 transition-all resize-none"
                                rows={5}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleShuffle}
                                    disabled={segments.length < 2}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                                >
                                    <Shuffle size={16} />
                                    Shuffle
                                </button>
                                <button
                                    onClick={handleSort}
                                    disabled={segments.length < 2}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                                >
                                    <ArrowDownAZ size={16} />
                                    Sort A-Z
                                </button>
                            </div>
                        </div>

                        {/* Single Add Section */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Add Single Entry
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSegmentText}
                                    onChange={(e) => setNewSegmentText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter option..."
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-400 transition-all"
                                    maxLength={30}
                                />
                                <button
                                    onClick={handleAddSegment}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2 text-white"
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Segments List */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Entries ({segments.length})
                            </label>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {segments.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <div className="text-4xl mb-2">🎯</div>
                                        <p className="text-sm">Add at least 2 options to start spinning!</p>
                                    </div>
                                ) : (
                                    segments.map((segment, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                                        >
                                            {/* Color Picker */}
                                            <div className="relative group">
                                                <input
                                                    type="color"
                                                    value={segment.color}
                                                    onChange={(e) => updateSegment(index, { color: e.target.value })}
                                                    className="w-10 h-10 rounded-lg cursor-pointer opacity-0 absolute"
                                                />
                                                <div
                                                    className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer group-hover:scale-110 transition-all flex items-center justify-center shadow-sm"
                                                    style={{ backgroundColor: segment.color }}
                                                >
                                                    <Palette size={16} className="text-white/90" strokeWidth={2.5} />
                                                </div>
                                            </div>

                                            {/* Segment Text */}
                                            <input
                                                type="text"
                                                value={segment.text}
                                                onChange={(e) => updateSegment(index, { text: e.target.value })}
                                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-900 transition-all"
                                                maxLength={30}
                                            />

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => removeSegment(index)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-500 hover:text-red-600"
                                                aria-label="Remove segment"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Theme Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Wheel Theme
                            </label>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                                <ThemeSelector themes={themes} />
                            </div>
                        </div>

                        {/* Elimination Mode Toggle */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Game Options
                            </label>
                            <label className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🔥</span>
                                    <div>
                                        <div className="font-semibold text-gray-900">Elimination Mode</div>
                                        <div className="text-sm text-gray-500">Remove winner after spin</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={eliminationMode}
                                    onChange={toggleEliminationMode}
                                    className="w-12 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-purple-500 before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-6 before:shadow-md"
                                />
                            </label>
                        </div>

                        {/* Sound Toggle */}
                        <div>
                            <label className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🔊</span>
                                    <div>
                                        <div className="font-semibold text-gray-900">Sound Effects</div>
                                        <div className="text-sm text-gray-500">Enable spin sounds</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={soundEnabled}
                                    onChange={toggleSound}
                                    className="w-12 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-purple-500 before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-6 before:shadow-md"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
