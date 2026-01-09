'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Plus, Trash2, Shuffle, ArrowDownAZ, Edit3, Settings2, Palette } from 'lucide-react';
import { WheelSegment } from '@/lib/store/wheelStore';
import { ThemeType, ThemeConfig } from '@/lib/utils/themes';
import ThemeSelector from '@/components/wheel/ThemeSelector';
import { getRandomColor, getContrastColor } from '@/lib/utils/colors';

interface ControlPanelProps {
    segments: WheelSegment[];
    setSegments: (segments: WheelSegment[]) => void;
    addSegment: (segment: WheelSegment) => void;
    removeSegment: (index: number) => void;
    updateSegment: (index: number, updates: Partial<WheelSegment>) => void;
    theme: string;
    setTheme: (theme: string) => void;
    eliminationMode: boolean;
    toggleEliminationMode: () => void;
    soundEnabled: boolean;
    toggleSound: () => void;
    themes: Record<string, ThemeConfig>;
}

// Optimized Input Component to prevent re-renders on every keystroke
const DebouncedInput = memo(({
    value,
    onChange,
    placeholder,
    maxLength,
    className,
    style
}: {
    value: string,
    onChange: (val: string) => void,
    placeholder?: string,
    maxLength?: number,
    className?: string,
    style?: React.CSSProperties
}) => {
    const [localValue, setLocalValue] = useState(value);

    // Sync from parent if moved/shuffled
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    // Commit on blur
    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    // Commit on Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    return (
        <input
            type="text"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            className={className}
            style={style}
        />
    );
});

DebouncedInput.displayName = 'DebouncedInput';

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
    const [showBulkEdit, setShowBulkEdit] = useState(false);

    // Sync bulk text with segments when opening bulk edit
    const toggleBulkEdit = useCallback(() => {
        if (!showBulkEdit) {
            setBulkText(segments.map(s => s.text).join('\n'));
        }
        setShowBulkEdit(prev => !prev);
    }, [segments, showBulkEdit]);

    // Update segments from bulk textarea
    const handleBulkUpdate = useCallback(() => {
        const lines = bulkText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const newSegments = lines.map((text, index) => ({
            text,
            color: segments[index]?.color || getRandomColor(),
        }));

        setSegments(newSegments);
        setShowBulkEdit(false);
    }, [bulkText, segments, setSegments]);

    // Shuffle segments
    const handleShuffle = useCallback(() => {
        const shuffled = [...segments].sort(() => Math.random() - 0.5);
        setSegments(shuffled);
    }, [segments, setSegments]);

    // Sort segments alphabetically
    const handleSort = useCallback(() => {
        const sorted = [...segments].sort((a, b) => a.text.localeCompare(b.text));
        setSegments(sorted);
    }, [segments, setSegments]);

    // Add single segment
    const handleAddSegment = useCallback(() => {
        if (newSegmentText.trim()) {
            addSegment({
                text: newSegmentText.trim(),
                color: getRandomColor(),
            });
            setNewSegmentText('');
        }
    }, [newSegmentText, addSegment]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddSegment();
        }
    };

    return (
        <div className="h-full flex flex-col font-sans text-gray-100">
            <div className="p-6 border-b border-white/10 glass-panel shadow-none rounded-none">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-12 h-12 transition-transform duration-300 hover:scale-105 ring-2 ring-purple-500/50 rounded-full">
                        <img
                            src="/ageinfo-logo.png"
                            alt="Wheel Editor Logo"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Wheel Editor</h2>
                        <p className="text-xs text-gray-400 font-mono mt-1">v2.4.0 PRO</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex p-1 rounded-xl bg-black/20 border border-white/5 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('entries')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'entries'
                            ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Edit3 size={16} />
                        <span>Entries</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'settings'
                            ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Settings2 size={16} />
                        <span>Settings</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {activeTab === 'entries' ? (
                    <div className="space-y-6">
                        {/* Toolbar Actions */}
                        <div className="grid grid-cols-3 gap-2 px-2 pt-2">
                            <button
                                onClick={handleShuffle}
                                disabled={segments.length < 2}
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-30 rounded-lg text-xs font-medium transition-all group border border-white/5"
                            >
                                <Shuffle size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                Shuffle
                            </button>
                            <button
                                onClick={handleSort}
                                disabled={segments.length < 2}
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-30 rounded-lg text-xs font-medium transition-all group border border-white/5"
                            >
                                <ArrowDownAZ size={14} />
                                A-Z
                            </button>
                            <button
                                onClick={toggleBulkEdit}
                                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${showBulkEdit
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border-white/5'}`}
                            >
                                <Edit3 size={14} />
                                {showBulkEdit ? 'Done' : 'Bulk'}
                            </button>
                        </div>

                        {/* Bulk Edit Section (Collapsible) */}
                        {showBulkEdit && (
                            <div className="animate-in slide-in-from-top-2 duration-300 px-2">
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                    Quick Import
                                </label>
                                <textarea
                                    value={bulkText}
                                    onChange={(e) => setBulkText(e.target.value)}
                                    placeholder="Pizza&#10;Burger&#10;Sushi"
                                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-gray-200 placeholder-gray-600 transition-all resize-none font-mono text-xs leading-relaxed"
                                    rows={8}
                                />
                                <button
                                    onClick={handleBulkUpdate}
                                    className="w-full mt-3 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 text-sm"
                                >
                                    Update Wheel Data
                                </button>
                            </div>
                        )}

                        {/* Add Single Entry */}
                        <div className="px-2">
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={newSegmentText}
                                    onChange={(e) => setNewSegmentText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add new entry..."
                                    className="flex-1 pl-4 pr-3 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-gray-200 placeholder-gray-600 transition-all font-medium"
                                    maxLength={30}
                                />
                                <button
                                    onClick={handleAddSegment}
                                    className="w-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl text-white shadow-lg transition-all active:scale-95"
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Segments Grid */}
                        <div className="px-2 pb-4">
                            <div className="flex justify-between items-center mb-3 px-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Entries List ({segments.length})
                                </label>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                {segments.length === 0 ? (
                                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                                        <div className="text-4xl mb-3 opacity-50">🎯</div>
                                        <p className="text-sm font-medium text-gray-400">Wheel is empty</p>
                                        <p className="text-xs text-gray-500 mt-1">Add items to start spinning</p>
                                    </div>
                                ) : (
                                    segments.map((segment, index) => {
                                        // Calculate brightness for contrast
                                        return (
                                            <div
                                                key={index}
                                                className="group flex items-center gap-3 p-2 pr-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200"
                                            >
                                                {/* Color Picker Indicator */}
                                                <div className="relative shrink-0 group/color cursor-pointer">
                                                    <input
                                                        type="color"
                                                        value={segment.color}
                                                        onChange={(e) => updateSegment(index, { color: e.target.value })}
                                                        className="w-8 h-8 opacity-0 absolute inset-0 z-10 cursor-pointer"
                                                    />
                                                    <div
                                                        className="w-8 h-8 rounded-lg shadow-inner ring-1 ring-white/10 transition-transform group-active/color:scale-90"
                                                        style={{ backgroundColor: segment.color }}
                                                    />
                                                </div>

                                                {/* Segment Text - Debounced */}
                                                <DebouncedInput
                                                    value={segment.text}
                                                    onChange={(val) => updateSegment(index, { text: val })}
                                                    className="flex-1 min-w-0 bg-transparent py-1 text-sm font-medium text-gray-200 focus:outline-none focus:text-purple-400 placeholder-gray-600"
                                                    maxLength={30}
                                                />

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => removeSegment(index)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                    aria-label="Remove segment"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 px-4 pt-2">
                        {/* Theme Selector - Wrapped for contrast */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                Visual Theme
                            </label>
                            <div className="bg-black/40 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
                                <ThemeSelector themes={themes} />
                            </div>
                        </div>

                        {/* Game Options */}
                        <div className="space-y-3">
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                Mechanics
                            </label>

                            <label className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all border border-white/5 hover:border-white/10 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                        <span className="text-xl">🔥</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-200">Elimination Mode</div>
                                        <div className="text-xs text-gray-500">Remove winner after spin</div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={eliminationMode}
                                        onChange={toggleEliminationMode}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </div>
                            </label>

                            <label className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all border border-white/5 hover:border-white/10 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                                        <span className="text-xl">🔊</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-200">Sound Effects</div>
                                        <div className="text-xs text-gray-500">Immersive audio feedback</div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={soundEnabled}
                                        onChange={toggleSound}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
