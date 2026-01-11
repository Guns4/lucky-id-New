'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Clock, Trophy } from 'lucide-react';
import { useWheelStore } from '@/lib/store/wheelStore';
import { formatTimestamp } from '@/lib/utils/timeFormat';

export default function SpinHistory() {
    const { spinHistory, clearHistory } = useWheelStore();
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Update timestamps every 10 seconds for relative time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    if (spinHistory.length === 0) {
        return (
            <div className="w-full max-w-md mt-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border-2 border-gray-200">
                    <History className="w-12 h-12 mx-auto mb-3 text-gray-400" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No Spin History Yet</h3>
                    <p className="text-sm text-gray-500">
                        Start spinning the wheel to see your results here!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-700" strokeWidth={2} />
                    <h3 className="text-xl font-black text-gray-800">Spin History</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {spinHistory.length}
                    </span>
                </div>

                <button
                    onClick={clearHistory}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    title="Clear all history"
                >
                    <Trash2 size={16} />
                    <span>Clear</span>
                </button>
            </div>

            {/* History List */}
            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {spinHistory.map((entry, index) => {
                        const isRecent = index === 0; // Most recent entry

                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    duration: 0.4,
                                    delay: index * 0.05
                                }}
                                className={`
                                    relative overflow-hidden rounded-xl p-4 border-2 transition-all
                                    ${isRecent
                                        ? 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100 border-yellow-400 shadow-lg'
                                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                                    }
                                `}
                            >
                                {/* Glow effect for most recent */}
                                {isRecent && (
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-orange-200/30 to-yellow-200/30 blur-xl"
                                    />
                                )}

                                <div className="relative flex items-center justify-between">
                                    {/* Left: Prize info */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Icon */}
                                        <div className={`
                                            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                            ${isRecent
                                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md'
                                                : 'bg-gray-100'
                                            }
                                        `}>
                                            {isRecent ? (
                                                <Trophy className="w-5 h-5 text-white" strokeWidth={2.5} />
                                            ) : (
                                                <span className="text-lg font-bold text-gray-600">
                                                    #{spinHistory.length - index}
                                                </span>
                                            )}
                                        </div>

                                        {/* Prize name */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`
                                                font-bold truncate
                                                ${isRecent ? 'text-gray-900 text-lg' : 'text-gray-700 text-base'}
                                            `}>
                                                {entry.prizeName}
                                            </p>
                                            {isRecent && (
                                                <span className="inline-block px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded-full mt-1">
                                                    Latest Win! 🎉
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Timestamp */}
                                    <div className="flex-shrink-0 ml-3">
                                        <div className={`
                                            flex items-center gap-1 px-3 py-1.5 rounded-lg
                                            ${isRecent
                                                ? 'bg-white/70 backdrop-blur-sm'
                                                : 'bg-gray-50'
                                            }
                                        `}>
                                            <Clock className={`w-3.5 h-3.5 ${isRecent ? 'text-orange-600' : 'text-gray-500'}`} />
                                            <span className={`text-xs font-semibold whitespace-nowrap ${isRecent ? 'text-gray-800' : 'text-gray-600'}`}>
                                                {formatTimestamp(entry.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Showing X of 10 indicator */}
            {spinHistory.length > 0 && (
                <p className="text-center text-xs text-gray-500 mt-4">
                    Showing last {spinHistory.length} {spinHistory.length === 1 ? 'spin' : 'spins'}
                    {spinHistory.length === 10 && ' (maximum)'}
                </p>
            )}
        </div>
    );
}
