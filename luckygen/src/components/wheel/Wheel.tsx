'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation, animate, useMotionValue, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Trash2, Share2, Copy, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateWinner, getRotationForWinner } from '@/lib/utils/wheelPhysics';
import { getThemeConfig, ThemeType, ThemeConfig } from '@/lib/utils/themes';
import Toast from '../shared/Toast';
import EmbedCodeModal from '../shared/EmbedCodeModal';
import { useWheelStore } from '@/lib/store/wheelStore';
import { useWheelSound } from '@/hooks/useWheelSound';

export interface WheelSegment {
    text: string;
    color: string;
}

interface WheelProps {
    segments: WheelSegment[];
    theme?: string; // Changed from ThemeType to allow string keys
    themeConfig?: ThemeConfig; // Direct config override
    eliminationMode?: boolean;
    onSpinComplete?: (winner: string) => void;
    onEliminate?: (eliminatedText: string) => void;
    slug?: string; // Optional slug for embed code
    wheelTitle?: string; // Optional title for embed modal
}

export default function Wheel({
    segments,
    theme = 'default',
    themeConfig: propThemeConfig,
    eliminationMode = false,
    onSpinComplete,
    onEliminate,
    slug,
    wheelTitle
}: WheelProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [embedModalOpen, setEmbedModalOpen] = useState(false);

    // Synthesized audio hook (no MP3 files needed!)
    const { playTick, playWin, enabled: soundEnabled, toggleSound } = useWheelSound();

    // Framer Motion values for imperative animation
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    // Use passed config or fallback to static lookup (for backward compat)
    // Cast theme to ThemeType for getThemeConfig if it matches known keys, otherwise usage might fail without themeConfig
    const themeConfig = propThemeConfig || getThemeConfig(theme as ThemeType) || getThemeConfig('default');
    const isUltimateWinner = segments.length === 1;

    const handleSpin = useCallback(async () => {
        if (isSpinning || segments.length === 0) return;

        setIsSpinning(true);
        // Play spin sound logic handled by animation ticks
        setWinner(null);

        // Calculate winner deterministically
        const winnerIndex = calculateWinner(segments.length);
        const segmentAngle = 360 / (segments.length || 1);
        // Calibrate: subtract one segment angle to fix visual offset (user reported off-by-one mismatch)
        const targetRotation = getRotationForWinner(winnerIndex, segments.length) - segmentAngle;

        const fullSpins = 3 + Math.random() * 2;
        const totalRotation = 360 * fullSpins + targetRotation;

        // Track which segment is at the pointer to sync tick sounds perfectly
        let lastSegmentIndex = -1;
        const segmentCount = segments.length || 1;

        await animate(rotation, totalRotation, {
            duration: 4,
            ease: [0.25, 0.1, 0.25, 1], // Custom easing for natural slowdown
            onUpdate: (latest) => {
                // Calculate which segment is currently at the pointer (top of wheel)
                // Normalize rotation to 0-360 range
                const normalizedRotation = ((latest % 360) + 360) % 360;
                // The pointer is at the top (0°), segments start from -90° offset
                // Calculate which segment index is at the pointer
                const currentSegmentIndex = Math.floor(normalizedRotation / (360 / segmentCount)) % segmentCount;

                // Play tick only when a NEW segment reaches the pointer
                if (currentSegmentIndex !== lastSegmentIndex) {
                    playTick(); // Synthesized sound + haptic feedback
                    lastSegmentIndex = currentSegmentIndex;
                }
            },
            onComplete: () => {
                // Ensure final rotation is set
                rotation.set(totalRotation % 360);
            }
        });

        // Announce winner
        const winningSegment = segments[winnerIndex];
        setWinner(winningSegment.text);

        // Trigger confetti with canvas-confetti library
        if (isUltimateWinner) {
            // Ultimate winner - Epic confetti burst!
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493'];

            (function frame() {
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        } else {
            // Normal win - Standard confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        playWin(); // Synthesized fanfare + haptic feedback

        onSpinComplete?.(winningSegment.text);
        setIsSpinning(false);
    }, [isSpinning, segments, playTick, playWin, controls, onSpinComplete]);

    // Handle elimination when winner modal is closed
    const handleCloseWinner = () => {
        if (eliminationMode && winner && segments.length > 1) {
            // Eliminate the winner
            onEliminate?.(winner);
            setToastMessage(`${winner} eliminated! ${segments.length - 1} left.`);
            setShowToast(true);
        }
        setWinner(null);
    };

    // Social sharing functions
    const generateShareMessage = () => {
        if (!winner) return '';
        const url = typeof window !== 'undefined' ? window.location.href : '';
        return `I just got ${winner} on LuckyGen! 🎰 Can you beat my luck? Try here: ${url}`;
    };

    const handleShareWhatsApp = () => {
        const message = generateShareMessage();
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const handleShareTwitter = () => {
        const message = generateShareMessage();
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    };

    const handleCopyToClipboard = async () => {
        const message = generateShareMessage();
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(message);
                setToastMessage('Copied to clipboard! 📋');
                setShowToast(true);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = message;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setToastMessage('Copied to clipboard! 📋');
                setShowToast(true);
            }
        } catch (err) {
            setToastMessage('Failed to copy to clipboard');
            setShowToast(true);
        }
    };

    const segmentAngle = 360 / (segments.length || 1);
    const radius = 150; // SVG radius

    // Render pointer based on theme
    const renderPointer = () => {
        // Dynamic image pointer (Highest Priority)
        if (themeConfig.pointerImageUrl) {
            return (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none -mt-4">
                    <img
                        src={themeConfig.pointerImageUrl}
                        alt="Pointer"
                        className="w-16 h-16 object-contain drop-shadow-xl filter"
                    />
                </div>
            );
        }

        // Legacy/Built-in text themes
        switch (theme) {
            case 'casino':
                return (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                        <div
                            className="w-8 h-8 rotate-45"
                            style={{ backgroundColor: themeConfig.pointerColor }}
                        />
                    </div>
                );
            case 'anime':
                return (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                        <svg width="30" height="40" viewBox="0 0 30 40">
                            <path
                                d="M15 0 L18 30 L15 40 L12 30 Z"
                                fill={themeConfig.pointerColor}
                                stroke="black"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                );
            case 'dark':
                return (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                        <div
                            className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent"
                            style={{
                                borderTopColor: themeConfig.pointerColor,
                                filter: 'drop-shadow(0 0 10px currentColor)'
                            }}
                        />
                    </div>
                );
            default:
                return (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                        <div
                            className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent"
                            style={{ borderTopColor: themeConfig.pointerColor }}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            {/* Sound Toggle */}
            <button
                onClick={toggleSound}
                className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                aria-label="Toggle sound"
            >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Elimination Mode Indicator */}
            {eliminationMode && (
                <div className="absolute top-0 left-0 px-3 py-1 bg-red-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1 z-10">
                    <Trash2 size={14} />
                    Elimination Mode
                </div>
            )}

            {/* Wheel Container */}
            <div className="relative w-full max-w-md aspect-square">
                {/* Themed pointer */}
                {renderPointer()}

                {/* Spinning Wheel SVG */}
                <motion.svg
                    viewBox="-160 -160 320 320"
                    className="w-full h-full drop-shadow-2xl"
                    style={{ rotate: rotation }}
                >
                    {/* Outer ring */}
                    <circle
                        cx="0"
                        cy="0"
                        r={radius + 5}
                        fill={themeConfig.outerRing}
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
                    className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-20 h-20 rounded-full 
                        bg-gradient-to-br ${themeConfig.centerButtonGradient}
                        hover:scale-110
                        disabled:opacity-50 disabled:cursor-not-allowed 
                        shadow-xl transition-all duration-200 active:scale-95 
                        font-bold text-white text-lg
                    `}
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
                    className={`mt-6 p-6 bg-gradient-to-r ${themeConfig.winnerGradient} rounded-2xl shadow-2xl max-w-md w-full`}
                >
                    <p className="text-white text-center text-2xl font-bold mb-4">
                        {isUltimateWinner ? '👑 ULTIMATE WINNER! 👑' : '🎉 Winner! 🎉'}
                    </p>
                    <p className="text-white text-center text-3xl font-bold mb-6">
                        {winner}
                    </p>

                    {/* Social Sharing Buttons */}
                    <div className="mb-4 space-y-2">
                        <p className="text-white/80 text-center text-sm font-medium mb-2">Share your result:</p>
                        <div className="flex gap-2 justify-center">
                            {/* WhatsApp Share */}
                            <button
                                onClick={handleShareWhatsApp}
                                className="flex-1 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5C] rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                title="Share on WhatsApp"
                            >
                                <Share2 size={18} />
                                <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            {/* Twitter Share */}
                            <button
                                onClick={handleShareTwitter}
                                className="flex-1 px-4 py-3 bg-[#1DA1F2] hover:bg-[#1A8CD8] rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                title="Share on Twitter"
                            >
                                <Share2 size={18} />
                                <span className="hidden sm:inline">Twitter</span>
                            </button>

                            {/* Copy to Clipboard */}
                            <button
                                onClick={handleCopyToClipboard}
                                className="flex-1 px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                title="Copy to clipboard"
                            >
                                <Copy size={18} />
                                <span className="hidden sm:inline">Copy</span>
                            </button>
                        </div>

                        {/* Embed Code Button - Only show if slug is provided */}
                        {slug && (
                            <button
                                onClick={() => setEmbedModalOpen(true)}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                title="Get Embed Code"
                            >
                                <Code size={18} />
                                <span>Get Embed Code</span>
                            </button>
                        )}
                    </div>

                    {/* Close/Elimination Button */}
                    <button
                        onClick={handleCloseWinner}
                        className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
                    >
                        {eliminationMode && segments.length > 1 ? 'Eliminate & Continue' : 'Close'}
                    </button>
                </motion.div>
            )}

            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                show={showToast}
                onClose={() => setShowToast(false)}
                type="success"
            />

            {/* Embed Code Modal */}
            {slug && wheelTitle && (
                <EmbedCodeModal
                    isOpen={embedModalOpen}
                    onClose={() => setEmbedModalOpen(false)}
                    slug={slug}
                    title={wheelTitle}
                />
            )}

        </div>
    );
}
