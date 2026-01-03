'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Palette } from 'lucide-react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { getRandomColor } from '@/lib/utils/colors';

export default function SegmentEditor() {
    const { segments, addSegment, removeSegment, updateSegment } = useWheelStore();
    const [newSegmentText, setNewSegmentText] = useState('');

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
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Customize Your Wheel
            </h2>

            {/* Add Segment Input */}
            <div className="flex gap-3 mb-8">
                <div className="flex-1 relative group">
                    <input
                        type="text"
                        value={newSegmentText}
                        onChange={(e) => setNewSegmentText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter option..."
                        className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all font-medium"
                        maxLength={30}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none"></div>
                </div>
                <button
                    onClick={handleAddSegment}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-lg hover:shadow-2xl flex items-center gap-2 text-white"
                >
                    <Plus size={22} strokeWidth={3} />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            {/* Segments List */}
            <div className="space-y-3">
                {segments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎡</div>
                        <p className="text-gray-400 text-lg font-medium">
                            Add at least 2 options to start spinning!
                        </p>
                    </div>
                ) : (
                    segments.map((segment, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-4 p-4 glass-card-hover glass-card rounded-xl animate-slide-up stagger-${Math.min(index + 1, 5)}`}
                        >
                            {/* Color Picker */}
                            <div className="relative group">
                                <input
                                    type="color"
                                    value={segment.color}
                                    onChange={(e) => updateSegment(index, { color: e.target.value })}
                                    className="w-12 h-12 rounded-lg cursor-pointer opacity-0 absolute"
                                />
                                <div
                                    className="w-12 h-12 rounded-lg border-3 border-white/50 cursor-pointer group-hover:scale-110 transition-all flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: segment.color, boxShadow: `0 4px 12px ${segment.color}40` }}
                                >
                                    <Palette size={18} className="text-white/90" strokeWidth={2.5} />
                                </div>
                            </div>

                            {/* Segment Text */}
                            <input
                                type="text"
                                value={segment.text}
                                onChange={(e) => updateSegment(index, { text: e.target.value })}
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 text-white font-medium transition-all"
                                maxLength={30}
                            />

                            {/* Delete Button */}
                            <button
                                onClick={() => removeSegment(index)}
                                className="p-3 hover:bg-red-500/20 rounded-lg transition-all text-red-400 hover:text-red-300 hover:scale-110 active:scale-95"
                                aria-label="Remove segment"
                            >
                                <Trash2 size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Segment Count */}
            {segments.length > 0 && (
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full">
                        <span className="text-2xl">🎯</span>
                        <span className="text-white font-bold">
                            {segments.length} option{segments.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-gray-400">ready to spin!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
