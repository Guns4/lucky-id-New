'use client';

import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Volume2, VolumeX, Trash2, Share2, Copy, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateWinner, getRotationForWinner } from '@/lib/utils/wheelPhysics';
import { getThemeConfig, ThemeType, ThemeConfig } from '@/lib/utils/themes';
import { getContrastColor } from '@/lib/utils/colors';
import Toast from '../shared/Toast';
import EmbedCodeModal from '../shared/EmbedCodeModal';
import { useWheelSound } from '@/hooks/useWheelSound';

export interface WheelSegment {
    text: string;
    color: string;
}

interface WheelProps {
    segments: WheelSegment[];
    theme?: string;
    themeConfig?: ThemeConfig;
    eliminationMode?: boolean;
    onSpinComplete?: (winner: string) => void;
    onEliminate?: (eliminatedText: string) => void;
    slug?: string;
    wheelTitle?: string;
    mode?: '2D' | '3D'; // New Prop for Mode
}

const Wheel = memo(({
    segments,
    theme = 'default',
    themeConfig: propThemeConfig,
    eliminationMode = false,
    onSpinComplete,
    onEliminate,
    slug,
    wheelTitle,
    mode = '2D'
}: WheelProps) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [embedModalOpen, setEmbedModalOpen] = useState(false);

    // Audio Hook
    const { playTick, playWin, enabled: soundEnabled, toggleSound } = useWheelSound();

    // Animation Controls
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    // Theme Configuration
    const themeConfig = useMemo(() =>
        propThemeConfig || getThemeConfig(theme as ThemeType) || getThemeConfig('default'),
        [propThemeConfig, theme]);

    const isUltimateWinner = segments.length === 1;
    const segmentCount = segments.length || 1;
    const segmentAngle = 360 / segmentCount;

    // Optimized Spin Logic
    const performSpin = async () => {
        if (isSpinning || segments.length === 0) return;
        setIsSpinning(true);
        setWinner(null);

        const winnerIndex = calculateWinner(segments.length);
        const targetRotation = getRotationForWinner(winnerIndex, segments.length) - segmentAngle;

        // Faster spin: More rotations in less time
        const fullSpins = 8 + Math.floor(Math.random() * 3); // 8-10 full spins
        const totalDegree = 360 * fullSpins + targetRotation;

        await controls.start({
            rotate: totalDegree,
            transition: {
                duration: 3.5, // Reduced from 5s for snappier feel
                ease: "circOut",
            }
        });

        const winningText = segments[winnerIndex].text;
        setWinner(winningText);
        playWin();
        triggerConfetti(isUltimateWinner);
        onSpinComplete?.(winningText);
        setIsSpinning(false);
    };

    // Ticking Sound Effect Listener
    useEffect(() => {
        const unsubscribe = rotation.on("change", (latest) => {
            const normalized = ((latest % 360) + 360) % 360;
            const index = Math.floor(normalized / (360 / segmentCount)) % segmentCount;
            // Debounce tick: only if index changes
            // We need a ref to store last index because this closure is stale? 
            // No, 'on' listener is persistent. We need a mutable ref.
        });
        return unsubscribe;
    }, [rotation, segmentCount]);

    // Ref for tick tracking
    const lastTickRef = React.useRef(-1);

    useEffect(() => {
        if (isSpinning) {
            const unsubscribe = rotation.on("change", (latest) => {
                const normalized = ((latest % 360) + 360) % 360;
                const index = Math.floor(normalized / (360 / segmentCount)) % segmentCount;
                if (index !== lastTickRef.current) {
                    playTick();
                    lastTickRef.current = index;
                }
            });
            return () => unsubscribe();
        }
    }, [isSpinning, rotation, segmentCount, playTick]);


    const triggerConfetti = (ultimate: boolean) => {
        if (ultimate) {
            const duration = 3000;
            const end = Date.now() + duration;
            const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493'];
            (function frame() {
                confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors });
                confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        } else {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    };

    // SVG Filters (Definitions)
    const renderFilters = () => (
        <defs>
            {/* Inner Shadow for Realistic Mode */}
            <filter id="inner-shadow">
                <feOffset dx="0" dy="0" />
                <feGaussianBlur stdDeviation="3" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>

            {/* Metallic Gold Gradient for Border */}
            <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="25%" stopColor="#FCF6BA" />
                <stop offset="50%" stopColor="#B38728" />
                <stop offset="75%" stopColor="#FBF5B7" />
                <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>

            {/* Glossy Overlay Gradient */}
            <linearGradient id="gloss-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50.1%" stopColor="rgba(0,0,0,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
            </linearGradient>

            {/* Drop Shadow */}
            <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="2" dy="4" result="offsetblur" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            {/* Controls */}
            <button
                onClick={toggleSound}
                className="absolute top-0 right-0 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors z-20 text-gray-700 font-bold"
                aria-label="Toggle sound"
            >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {eliminationMode && (
                <div className="absolute top-0 left-0 px-3 py-1 bg-red-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1 z-20 shadow-sm animate-pulse">
                    <Trash2 size={14} /> Elimination Mode
                </div>
            )}

            {/* Main Wheel Render */}
            <div className={`relative w-full max-w-md aspect-square transition-all duration-500 ${mode === '3D' ? 'scale-105' : ''}`}>

                {/* Pointer (Z-index high) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-5 z-30 filter drop-shadow-xl">
                    {themeConfig.pointerImageUrl ? (
                        <img src={themeConfig.pointerImageUrl} alt="Pointer" className="w-14 h-14 object-contain" />
                    ) : (
                        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[40px] border-l-transparent border-r-transparent"
                            style={{ borderTopColor: themeConfig.pointerColor }} />
                    )}
                </div>

                {/* The Rotating Wheel */}
                <motion.div
                    className="w-full h-full"
                    style={{ rotate: rotation }}
                    animate={controls}
                >
                    {/* SVG Wheel */}
                    <svg viewBox="-160 -160 320 320" className="w-full h-full" style={{ overflow: 'visible' }}>
                        {renderFilters()}

                        {/* Outer Glow/Border - Changes based on Mode */}
                        <circle
                            cx="0"
                            cy="0"
                            r="158"
                            fill={mode === '3D' ? 'url(#gold-border)' : themeConfig.outerRing}
                            stroke="rgba(0,0,0,0.1)"
                            strokeWidth={mode === '3D' ? 0 : 8}
                            filter={mode === '3D' ? 'url(#soft-shadow)' : ''}
                        />

                        {/* Wheel Background for empty/loading */}
                        <circle cx="0" cy="0" r="150" fill="#f3f4f6" />

                        {segments.length > 0 && segments.map((segment, i) => {
                            const angle = (360 / segmentCount);
                            const startAngle = (i * angle - 90) * (Math.PI / 180);
                            const endAngle = ((i + 1) * angle - 90) * (Math.PI / 180);
                            const largeArc = angle > 180 ? 1 : 0;
                            const r = 150;
                            const x1 = r * Math.cos(startAngle);
                            const y1 = r * Math.sin(startAngle);
                            const x2 = r * Math.cos(endAngle);
                            const y2 = r * Math.sin(endAngle);

                            // Text Math
                            const midAngle = i * angle + angle / 2;
                            const textR = r * 0.65;
                            const textX = textR * Math.cos((midAngle - 90) * Math.PI / 180);
                            const textY = textR * Math.sin((midAngle - 90) * Math.PI / 180);

                            return (
                                <g key={i}>
                                    {/* Segment Slice */}
                                    <path
                                        d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={segment.color}
                                        stroke={mode === '3D' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}
                                        strokeWidth="1"
                                        filter={mode === '3D' ? 'url(#inner-shadow)' : ''} // Depth in Realistic Mode
                                    />
                                    {/* Text */}
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill={getContrastColor(segment.color)}
                                        fontSize={Math.min(14, 200 / (segment.text.length + 1))}
                                        fontWeight="700"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                                        style={{
                                            textShadow: mode === '3D' ? '0 1px 1px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
                                            fontFamily: 'var(--font-heading)'
                                        }}
                                    >
                                        {segment.text.substring(0, 18) + (segment.text.length > 18 ? '...' : '')}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Realistic Gloss Overlay */}
                        {mode === '3D' && (
                            <circle cx="0" cy="0" r="150" fill="url(#gloss-overlay)" pointerEvents="none" />
                        )}

                        {/* Center Hub */}
                        <circle
                            cx="0"
                            cy="0"
                            r="28"
                            fill={mode === '3D' ? 'url(#gold-border)' : '#1f2937'}
                            stroke={mode === '3D' ? 'rgba(0,0,0,0.2)' : 'white'}
                            strokeWidth={mode === '3D' ? 1 : 4}
                            filter="url(#soft-shadow)"
                        />
                        <circle cx="0" cy="0" r="22" fill="#1f2937" />
                        <text x="0" y="0" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">LUCKY</text>
                    </svg>
                </motion.div>

                {/* Spin Button (Center Overlay) */}
                <button
                    onClick={performSpin}
                    disabled={isSpinning || segments.length === 0}
                    className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-16 h-16 rounded-full 
                        bg-gradient-to-br from-yellow-400 to-orange-500
                        hover:scale-110 active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg
                        transition-all z-40
                        flex items-center justify-center
                        border-4 border-white/20
                    `}
                >
                    <span className="text-white font-black text-xs tracking-wider">SPIN</span>
                </button>
            </div>

            {/* Winner Display Modal */}
            {winner && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center border-4 border-yellow-400"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">🎉 We have a winner!</h3>
                        <div className="bg-yellow-50 p-4 rounded-xl mb-6">
                            <p className="text-4xl font-black text-yellow-600 break-words">{winner}</p>
                        </div>

                        {/* Social Sharing */}
                        <div className="flex gap-2 justify-center mb-4">
                            <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                                <Share2 size={20} />
                            </button>
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                <Copy size={20} />
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setWinner(null);
                                if (eliminationMode && onEliminate) onEliminate(winner);
                            }}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
                        >
                            {eliminationMode ? 'Eliminate & Continue' : 'Close'}
                        </button>
                    </motion.div>
                </div>
            )}

            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
        </div>
    );
});

Wheel.displayName = 'Wheel';

export default Wheel;
