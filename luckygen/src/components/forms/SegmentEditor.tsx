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
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Customize Your Wheel</h2>

            {/* Add Segment Input */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newSegmentText}
                    onChange={(e) => setNewSegmentText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter option..."
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300"
                    maxLength={30}
                />
                <button
                    onClick={handleAddSegment}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-semibold transition-all duration-200 active:scale-95 shadow-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add
                </button>
            </div>

            {/* Segments List */}
            <div className="space-y-2">
                {segments.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">
                        Add at least 2 options to start spinning!
                    </p>
                ) : (
                    segments.map((segment, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            {/* Color Picker */}
                            <div className="relative group">
                                <input
                                    type="color"
                                    value={segment.color}
                                    onChange={(e) => updateSegment(index, { color: e.target.value })}
                                    className="w-10 h-10 rounded cursor-pointer opacity-0 absolute"
                                />
                                <div
                                    className="w-10 h-10 rounded border-2 border-white/50 cursor-pointer group-hover:scale-110 transition-transform flex items-center justify-center"
                                    style={{ backgroundColor: segment.color }}
                                >
                                    <Palette size={16} className="text-white/70" />
                                </div>
                            </div>

                            {/* Segment Text */}
                            <input
                                type="text"
                                value={segment.text}
                                onChange={(e) => updateSegment(index, { text: e.target.value })}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                                maxLength={30}
                            />

                            {/* Delete Button */}
                            <button
                                onClick={() => removeSegment(index)}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                                aria-label="Remove segment"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Segment Count */}
            {segments.length > 0 && (
                <p className="text-center text-sm text-gray-400 mt-4">
                    {segments.length} option{segments.length !== 1 ? 's' : ''} added
                </p>
            )}
        </div>
    );
}
