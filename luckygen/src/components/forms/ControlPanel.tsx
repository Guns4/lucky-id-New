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
        <div className="h-full bg-white lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto font-sans">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative w-10 h-10 transition-transform duration-300 hover:scale-105">
                        <img
                            src="/ageinfo-logo.png"
                            alt="Wheel Editor Logo"
                            className="w-full h-full object-cover shadow-lg rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Wheel Editor</h2>
                        <p className="text-sm text-gray-500">Customize your wheel</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('entries')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'entries'
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Edit3 size={18} />
                        <span>Entries</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
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
                        {/* Toolbar Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleShuffle}
                                disabled={segments.length < 2}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-all border border-blue-200"
                            >
                                <Shuffle size={14} />
                                Shuffle
                            </button>
                            <button
                                onClick={handleSort}
                                disabled={segments.length < 2}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-all border border-purple-200"
                            >
                                <ArrowDownAZ size={14} />
                                Sort A-Z
                            </button>
                            <button
                                onClick={toggleBulkEdit}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all border ${showBulkEdit
                                    ? 'bg-gray-800 text-white border-gray-800'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'}`}
                            >
                                <Edit3 size={14} />
                                {showBulkEdit ? 'Done' : 'Bulk Edit'}
                            </button>
                        </div>

                        {/* Bulk Edit Section (Collapsible) */}
                        {showBulkEdit && (
                            <div className="animate-in slide-in-from-top-2 duration-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Paste list (one per line)
                                </label>
                                <textarea
                                    value={bulkText}
                                    onChange={(e) => setBulkText(e.target.value)}
                                    placeholder="Pizza&#10;Burger&#10;Sushi&#10;Tacos"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-400 transition-all resize-none font-mono text-sm"
                                    rows={6}
                                />
                                <button
                                    onClick={handleBulkUpdate}
                                    className="w-full mt-2 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-colors"
                                >
                                    Update Wheel
                                </button>
                            </div>
                        )}

                        {/* Add Single Entry */}
                        <div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSegmentText}
                                    onChange={(e) => setNewSegmentText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type & Enter to add..."
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-400 transition-all shadow-sm"
                                    maxLength={30}
                                />
                                <button
                                    onClick={handleAddSegment}
                                    className="px-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center text-white"
                                >
                                    <Plus size={24} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Segments Grid */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-semibold text-gray-700">
                                    Entries ({segments.length})
                                </label>
                                <span className="text-xs text-gray-400">Click color to change</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-1">
                                {segments.length === 0 ? (
                                    <div className="col-span-2 text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400">
                                        <div className="text-4xl mb-2">🎯</div>
                                        <p className="text-sm font-medium">No items yet</p>
                                        <p className="text-xs mt-1">Add items or use Bulk Edit</p>
                                    </div>
                                ) : (
                                    segments.map((segment, index) => {
                                        const textColor = getContrastColor(segment.color);
                                        return (
                                            <div
                                                key={index} // Note: using index as key is acceptable here as shuffle rebuilds array
                                                className="group flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-purple-200 transition-all"
                                                style={{ borderLeftWidth: '4px', borderLeftColor: segment.color }}
                                            >
                                                {/* Color Picker (Compact - Hidden) */}
                                                <div className="relative shrink-0">
                                                    <input
                                                        type="color"
                                                        value={segment.color}
                                                        onChange={(e) => updateSegment(index, { color: e.target.value })}
                                                        className="w-5 h-5 opacity-0 absolute inset-0 z-10 cursor-pointer"
                                                    />
                                                    <div
                                                        className="w-5 h-5 rounded-full border border-gray-200 shadow-inner"
                                                        style={{ backgroundColor: segment.color }}
                                                    />
                                                </div>

                                                {/* Segment Text - Debounced */}
                                                <DebouncedInput
                                                    value={segment.text}
                                                    onChange={(val) => updateSegment(index, { text: val })}
                                                    className="flex-1 min-w-0 bg-transparent py-1 text-sm font-medium text-gray-700 focus:outline-none focus:text-purple-600 truncate"
                                                    maxLength={30}
                                                />

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => removeSegment(index)}
                                                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shrink-0"
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
                    <div className="space-y-6">
                        {/* Theme Selector - Wrapped for contrast */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Wheel Theme
                            </label>
                            <div className="bg-slate-900 p-4 rounded-xl shadow-inner">
                                <ThemeSelector themes={themes} />
                            </div>
                        </div>

                        {/* Game Options */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Game Options
                            </label>

                            <label className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all border border-gray-100">
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

                            <label className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all border border-gray-100">
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
