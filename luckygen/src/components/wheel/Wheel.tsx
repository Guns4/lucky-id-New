'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { calculateWinner, getRotationForWinner } from '@/lib/utils/wheelPhysics';
import Confetti from './Confetti';

export interface WheelSegment {
    text: string;
    color: string;
}

interface WheelProps {
    segments: WheelSegment[];
    onSpinComplete?: (winner: string) => void;
}

export default function Wheel({ segments, onSpinComplete }: WheelProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);

    const controls = useAnimation();
    const spinAudioRef = useRef<HTMLAudioElement | null>(null);
    const winAudioRef = useRef<HTMLAudioElement | null>(null);

    const handleSpin = useCallback(async () => {
        if (isSpinning || segments.length === 0) return;

        setIsSpinning(true);
        setWinner(null);
        setShowConfetti(false);

        // Play spin sound
        if (soundEnabled && spinAudioRef.current) {
            spinAudioRef.current.currentTime = 0;
            spinAudioRef.current.play().catch(() => { });
        }

        // Calculate winner deterministically
        const winnerIndex = calculateWinner(segments.length);
        const targetRotation = getRotationForWinner(winnerIndex, segments.length);

        // Animate rotation (3-5 full spins + target position)
        const fullSpins = 3 + Math.random() * 2;
        const totalRotation = 360 * fullSpins + targetRotation;

        await controls.start({
            rotate: totalRotation,
            transition: {
                duration: 4,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for natural slowdown
            },
        });

        // Announce winner
        const winningSegment = segments[winnerIndex];
        setWinner(winningSegment.text);
        setShowConfetti(true);

        if (soundEnabled && winAudioRef.current) {
            winAudioRef.current.play().catch(() => { });
        }

        onSpinComplete?.(winningSegment.text);
        setIsSpinning(false);

        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
    }, [isSpinning, segments, soundEnabled, controls, onSpinComplete]);

    const segmentAngle = 360 / (segments.length || 1);
    const radius = 150; // SVG radius

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            {/* Sound Toggle */}
            <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                aria-label="Toggle sound"
            >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Wheel Container */}
            <div className="relative w-full max-w-md aspect-square">
                {/* Fixed pointer at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500" />
                </div>

                {/* Spinning Wheel SVG */}
                <motion.svg
                    viewBox="-160 -160 320 320"
                    className="w-full h-full drop-shadow-2xl"
                    animate={controls}
                    initial={{ rotate: 0 }}
                >
                    {/* Outer ring */}
                    <circle
                        cx="0"
                        cy="0"
                        r={radius + 5}
                        fill="white"
                        className="drop-shadow-lg"
                    />

                    {/* Segments */}
                    {segments.length > 0 ? (
                        segments.map((segment, index) => {
                            const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
                            const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

                            const x1 = radius * Math.cos(startAngle);
                            const y1 = radius * Math.sin(startAngle);
                            const x2 = radius * Math.cos(endAngle);
                            const y2 = radius * Math.sin(endAngle);

                            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                            const pathData = [
                                `M 0 0`,
                                `L ${x1} ${y1}`,
                                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                `Z`,
                            ].join(' ');

                            // Text position (middle of segment)
                            const textAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
                            const textRadius = radius * 0.7;
                            const textX = textRadius * Math.cos(textAngle);
                            const textY = textRadius * Math.sin(textAngle);
                            const textRotation = index * segmentAngle + segmentAngle / 2;

                            return (
                                <g key={index}>
                                    <path d={pathData} fill={segment.color} stroke="white" strokeWidth="2" />
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill="white"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${textRotation} ${textX} ${textY})`}
                                        className="pointer-events-none select-none"
                                        style={{ textShadow: '0 0 3px rgba(0,0,0,0.5)' }}
                                    >
                                        {segment.text.length > 12 ? segment.text.substring(0, 12) + '...' : segment.text}
                                    </text>
                                </g>
                            );
                        })
                    ) : (
                        <circle cx="0" cy="0" r={radius} fill="#e5e7eb" />
                    )}

                    {/* Center button */}
                    <circle cx="0" cy="0" r="25" fill="#1f2937" stroke="white" strokeWidth="3" />
                    <text
                        x="0"
                        y="0"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                    >
                        SPIN
                    </text>
                </motion.svg>

                {/* Spin Button Overlay */}
                <button
                    onClick={handleSpin}
                    disabled={isSpinning || segments.length === 0}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all duration-200 active:scale-95 font-bold text-white text-lg"
                    aria-label="Spin the wheel"
                >
                    {isSpinning ? '...' : 'SPIN'}
                </button>
            </div>

            {/* Winner Display */}
            {winner && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl"
                >
                    <p className="text-white text-center text-2xl font-bold">🎉 {winner} 🎉</p>
                </motion.div>
            )}

            {/* Confetti */}
            {showConfetti && <Confetti />}

            {/* Audio Elements */}
            <audio ref={spinAudioRef} src="/sounds/spin.mp3" preload="auto" />
            <audio ref={winAudioRef} src="/sounds/win.mp3" preload="auto" />
        </div>
    );
}
