'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWheelStore } from '@/lib/store/wheelStore';

export default function LuckyMascot() {
    const { eliminationMode, segments } = useWheelStore();
    // Start with a basic state, could be 'idle' | 'spinning' | 'win' | 'sad'
    const [state, setState] = useState<'idle' | 'excited' | 'celebrate' | 'sad'>('idle');

    // Simple pure CSS/SVG Robot for now to avoid external assets dependency
    // In future this can be replaced by a Lottie or Rive animation

    return (
        <div className="fixed bottom-4 left-4 z-40 md:bottom-8 md:left-8 hidden md:block">
            <motion.div
                animate={state === 'idle' ? { y: [0, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative w-32 h-32"
            >
                {/* Robot Body */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <defs>
                        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#CBD5E1" />
                            <stop offset="50%" stopColor="#94A3B8" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                        <radialGradient id="eye" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#2563EB" />
                        </radialGradient>
                    </defs>

                    {/* Antenna */}
                    <motion.path
                        d="M100 60 L100 40"
                        stroke="#64748B"
                        strokeWidth="8"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ originX: "100px", originY: "60px" }}
                    />
                    <circle cx="100" cy="35" r="8" fill="#EF4444" className="animate-pulse" />

                    {/* Head */}
                    <rect x="50" y="60" width="100" height="80" rx="20" fill="url(#metal)" stroke="#334155" strokeWidth="4" />

                    {/* Face Screen */}
                    <rect x="60" y="75" width="80" height="50" rx="10" fill="#1E293B" />

                    {/* Eyes */}
                    <g className="eyes">
                        {state !== 'sad' ? (
                            <>
                                <motion.circle
                                    cx="85" cy="100" r="10" fill="url(#eye)"
                                    animate={state === 'idle' ? { scaleY: [1, 0.1, 1] } : {}}
                                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.2 }}
                                />
                                <motion.circle
                                    cx="115" cy="100" r="10" fill="url(#eye)"
                                    animate={state === 'idle' ? { scaleY: [1, 0.1, 1] } : {}}
                                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.2 }}
                                />
                            </>
                        ) : (
                            <>
                                <text x="80" y="105" fill="#3B82F6" fontSize="20" fontWeight="bold">X</text>
                                <text x="110" y="105" fill="#3B82F6" fontSize="20" fontWeight="bold">X</text>
                            </>
                        )}
                    </g>

                    {/* Chat Bubble (Contextual) */}
                    <foreignObject x="110" y="0" width="120" height="60">
                        <div className="bg-white p-2 rounded-lg rounded-bl-none text-[10px] font-bold text-gray-800 shadow-lg border-2 border-gray-200">
                            {eliminationMode ? "Elimination Mode!" : "Let's Spin!"}
                        </div>
                    </foreignObject>
                </svg>
            </motion.div>
        </div>
    );
}
