'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Sparkles, RotateCw, Trash2, Plus } from 'lucide-react';
import { useWheelStore, WheelSegment } from '@/lib/store/wheelStore';
import { getWheelColors } from '@/lib/utils/colorPalette';

export default function WheelEditor() {
    const { segments, setSegments } = useWheelStore();
    const [bulkText, setBulkText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    // Parse text input and update wheel
    const handleUpdateWheel = () => {
        // Split by newlines and filter empty lines
        const lines = bulkText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            alert('Please enter at least one item (one per line)');
            return;
        }

        // Generate vibrant color palette
        const colors = getWheelColors(lines.length);

        // Create segments with auto-assigned colors
        const newSegments: WheelSegment[] = lines.map((text, index) => ({
            text,
            color: colors[index % colors.length], // Cycle colors if more lines than colors
        }));

        // Update wheel
        setSegments(newSegments);

        // Success feedback
        alert(`✅ Wheel updated with ${newSegments.length} segments!`);
    };

    // Load current segments into textarea
    const loadCurrentSegments = () => {
        const text = segments.map(seg => seg.text).join('\n');
        setBulkText(text);
        setIsExpanded(true);
    };

    // Clear textarea
    const clearText = () => {
        setBulkText('');
    };

    // Add example segments
    const addExamples = () => {
        const examples = [
            'Grand Prize 🏆',
            'Gold Medal 🥇',
            'Silver Medal 🥈',
            'Bronze Medal 🥉',
            'Lucky Star ⭐',
            'Super Prize 🎁',
            'Bonus Round 🎯',
            'Jackpot 💰'
        ];
        setBulkText(examples.join('\n'));
    };

    return (
        <div className="w-full max-w-2xl mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    <h3 className="text-xl font-black text-gray-800">Wheel Editor</h3>
                    {segments.length > 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                            {segments.length} segments
                        </span>
                    )}
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                    <Edit3 size={16} />
                    <span>{isExpanded ? 'Hide Editor' : 'Edit Wheel'}</span>
                </button>
            </div>

            {/* Editor Panel */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg"
                >
                    {/* Instructions */}
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                            <Sparkles size={16} className="text-blue-600" />
                            Enter items one per line. Colors will be auto-assigned!
                        </p>
                    </div>

                    {/* Bulk Input Textarea */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Wheel Items (one per line):
                        </label>
                        <textarea
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            placeholder="Prize 1&#10;Prize 2&#10;Prize 3&#10;Prize 4&#10;..."
                            className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono text-sm resize-none"
                            style={{ lineHeight: '1.8' }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Current: {bulkText.split('\n').filter(l => l.trim()).length} items
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={handleUpdateWheel}
                            disabled={!bulkText.trim()}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <RotateCw size={20} />
                            <span>Update Wheel</span>
                        </button>

                        <button
                            onClick={clearText}
                            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
                            title="Clear text"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={loadCurrentSegments}
                            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-all"
                        >
                            <Plus size={16} />
                            Load Current
                        </button>

                        <button
                            onClick={addExamples}
                            className="flex items-center gap-1 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-all"
                        >
                            <Sparkles size={16} />
                            Add Examples
                        </button>
                    </div>

                    {/* Preview */}
                    {bulkText.trim() && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs font-bold text-gray-600 mb-2">Preview Colors:</p>
                            <div className="flex flex-wrap gap-2">
                                {bulkText
                                    .split('\n')
                                    .filter(l => l.trim())
                                    .slice(0, 20) // Show max 20 preview
                                    .map((line, index) => {
                                        const colors = getWheelColors(bulkText.split('\n').filter(l => l.trim()).length);
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                                                style={{ backgroundColor: colors[index % colors.length] }}
                                            >
                                                <span className="truncate max-w-[150px]">{line.trim()}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                            {bulkText.split('\n').filter(l => l.trim()).length > 20 && (
                                <p className="text-xs text-gray-500 mt-2">
                                    ... and {bulkText.split('\n').filter(l => l.trim()).length - 20} more
                                </p>
                            )}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
