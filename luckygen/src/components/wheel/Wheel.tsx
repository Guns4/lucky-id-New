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
import { useWheelStore } from '@/lib/store/wheelStore';

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
    const [pointerKick, setPointerKick] = useState(false); // Ticker animation state

    // Audio Hook
    const { playTick, playWin, playSpinLoop, stopSpinLoop, enabled: soundEnabled, toggleSound } = useWheelSound();

    // History tracking
    const { addToHistory } = useWheelStore();

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

    // Professional Spin Logic with Perfect Synchronization
    const performSpin = async () => {
        if (isSpinning || segments.length === 0) return;
        setIsSpinning(true);
        setWinner(null);

        // Calculate winner index BEFORE starting (DETERMINISTIC)
        const winnerIndex = calculateWinner(segments.length);
        const targetRotation = getRotationForWinner(winnerIndex, segments.length) - segmentAngle;

        // Professional spin configuration - OPTIMIZED FOR MAXIMUM SUSPENSE
        const fullSpins = 5 + Math.floor(Math.random() * 4); // 5-8 full spins for perfect balance
        const totalDegree = 360 * fullSpins + targetRotation;
        const spinDuration = 8; // ⏱️ 8 seconds - Perfect for building anticipation!

        try {
            // 🎵 Start the background music IMMEDIATELY when spin starts
            playSpinLoop();

            // 🎡 Animate the wheel with professional easing - SLOW and DRAMATIC
            await controls.start({
                rotate: totalDegree,
                transition: {
                    duration: spinDuration,
                    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier - Realistic slow-down effect
                }
            });

            // ⏹️ EXACTLY when spin stops - stop the music with fade-out
            stopSpinLoop();

            // ⏱️ DRAMATIC PAUSE (500ms) - Build maximum tension before reveal!
            await new Promise(resolve => setTimeout(resolve, 500));

            // 🏆 Get the winner - THIS MUST MATCH THE FINAL POSITION
            const winningText = segments[winnerIndex].text;

            // 📢 Show winner notification FIRST (synchronously)
            setWinner(winningText);

            // 📊 Log to history with timestamp
            addToHistory(winningText);

            // 🎉 Then trigger all celebration effects together
            playWin();
            triggerConfetti(isUltimateWinner);
            onSpinComplete?.(winningText);

        } catch (error) {
            console.error('Spin error:', error);
            stopSpinLoop(); // Ensure music stops even on error
        } finally {
            setIsSpinning(false);
        }
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

                    // Trigger pointer kick animation
                    setPointerKick(true);
                    setTimeout(() => setPointerKick(false), 100); // Quick kick animation
                }
            });
            return () => unsubscribe();
        }
    }, [isSpinning, rotation, segmentCount, playTick]);


    // ESC key to close winner modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && winner) {
                setWinner(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [winner]);


    const triggerConfetti = (ultimate: boolean) => {
        if (ultimate) {
            // ULTIMATE WINNER - Mega confetti celebration!
            const duration = 5000; // 5 seconds of glory!
            const end = Date.now() + duration;
            const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00FF00', '#00FFFF'];

            (function frame() {
                // Left side cannon
                confetti({
                    particleCount: 10,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0, y: 0.8 },
                    colors,
                    ticks: 300,
                    gravity: 1.2
                });
                // Right side cannon
                confetti({
                    particleCount: 10,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1, y: 0.8 },
                    colors,
                    ticks: 300,
                    gravity: 1.2
                });

                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        } else {
            // REGULAR WIN - Enhanced celebration
            const count = 200; // More particles
            const defaults = {
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00FF00'],
                ticks: 200,
                gravity: 1
            };

            // Multi-burst effect
            function fire(particleRatio: number, opts: any) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            // Burst 1: Wide spread
            fire(0.25, { spread: 26, startVelocity: 55 });
            // Burst 2: Medium spread
            fire(0.2, { spread: 60 });
            // Burst 3: Focused burst
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            // Burst 4: Wide finale
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            // Burst 5: Final sparkle
            fire(0.1, { spread: 120, startVelocity: 45 });
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

            {/* Glossy Overlay Gradient for entire wheel */}
            <linearGradient id="gloss-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50.1%" stopColor="rgba(0,0,0,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
            </linearGradient>

            {/* Segment Gradient Overlay - Makes segments look 3D instead of flat */}
            <radialGradient id="segment-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </radialGradient>

            {/* Metallic Center Cap Gradient */}
            <radialGradient id="center-cap-metallic" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="30%" stopColor="#FFA500" />
                <stop offset="60%" stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#DAA520" />
            </radialGradient>

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
            {/* 🔊 Sound Control - Floating Toggle Button */}
            <button
                onClick={toggleSound}
                className="absolute top-4 right-4 p-3 rounded-full bg-gradient-to-br from-white/90 to-white/70 hover:from-white hover:to-white/90 backdrop-blur-md transition-all duration-300 z-30 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 group"
                aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
                title={soundEnabled ? "Click to mute" : "Click to unmute"}
            >
                {soundEnabled ? (
                    <Volume2
                        size={24}
                        className="text-blue-600 transition-colors"
                        strokeWidth={2.5}
                    />
                ) : (
                    <VolumeX
                        size={24}
                        className="text-gray-400 transition-colors"
                        strokeWidth={2.5}
                    />
                )}

                {/* Tooltip indicator */}
                <span className="absolute -bottom-8 right-0 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {soundEnabled ? "Sound ON" : "Sound OFF"}
                </span>
            </button>

            {eliminationMode && (
                <div className="absolute top-0 left-0 px-3 py-1 bg-red-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1 z-20 shadow-sm animate-pulse">
                    <Trash2 size={14} /> Elimination Mode
                </div>
            )}

            {/* Main Wheel Render - Enhanced with Depth & Shadows */}
            <div
                className={`relative w-full max-w-md aspect-square transition-all duration-500 ${mode === '3D' ? 'scale-105' : ''}`}
                style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                }}
            >

                {/* Animated Pointer/Ticker (Z-index high) */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -mt-5 z-30 filter drop-shadow-xl transition-transform duration-100"
                    style={{
                        transform: `translateX(-50%) ${pointerKick ? 'rotate(8deg) scale(1.1)' : 'rotate(0deg) scale(1)'}`,
                        transformOrigin: 'center bottom',
                    }}
                >
                    {themeConfig.pointerImageUrl ? (
                        <img src={themeConfig.pointerImageUrl} alt="Pointer" className="w-14 h-14 object-contain" />
                    ) : (
                        <div className="relative">
                            {/* Pointer Shadow for depth */}
                            <div
                                className="absolute w-0 h-0 border-l-[15px] border-r-[15px] border-t-[40px] border-l-transparent border-r-transparent opacity-20 blur-sm"
                                style={{
                                    borderTopColor: '#000',
                                    transform: 'translate(2px, 3px)'
                                }}
                            />
                            {/* Main Pointer with gradient */}
                            <div
                                className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[40px] border-l-transparent border-r-transparent relative"
                                style={{
                                    borderTopColor: themeConfig.pointerColor,
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                }}
                            >
                                {/* Inner highlight for 3D effect */}
                                <div
                                    className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-t-[20px] border-l-transparent border-r-transparent"
                                    style={{
                                        borderTopColor: 'rgba(255,255,255,0.4)',
                                        top: '-40px',
                                        left: '-6px'
                                    }}
                                />
                            </div>
                        </div>
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

                        {/* Outer Ring/Border - Enhanced with Heavy Glow */}
                        <circle
                            cx="0"
                            cy="0"
                            r="158"
                            fill={mode === '3D' ? 'url(#gold-border)' : themeConfig.outerRing}
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth={mode === '3D' ? 2 : 6}
                            filter="url(#soft-shadow)"
                            style={{
                                filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.5)) drop-shadow(0 0 24px rgba(0,0,0,0.3))'
                            }}
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
                                    {/* Base Segment Slice */}
                                    <path
                                        d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={segment.color}
                                        stroke={mode === '3D' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)'}
                                        strokeWidth="1.5"
                                        filter={mode === '3D' ? 'url(#inner-shadow)' : ''} // Depth in Realistic Mode
                                    />
                                    {/* Gradient Overlay for 3D Effect - prevents flat look */}
                                    <path
                                        d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill="url(#segment-gradient)"
                                        pointerEvents="none"
                                        opacity="0.6"
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
                                            textShadow: mode === '3D' ? '0 2px 4px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.2)',
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

                        {/* Metallic Center Cap - Multi-layered for Realism */}
                        {/* Outer shadow layer */}
                        <circle
                            cx="0"
                            cy="0"
                            r="32"
                            fill="rgba(0,0,0,0.15)"
                            filter="blur(4px)"
                        />
                        {/* Main metallic cap */}
                        <circle
                            cx="0"
                            cy="0"
                            r="28"
                            fill={mode === '3D' ? 'url(#center-cap-metallic)' : 'url(#gold-border)'}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="2"
                            filter="url(#soft-shadow)"
                        />
                        {/* Inner dark circle for depth */}
                        <circle
                            cx="0"
                            cy="0"
                            r="22"
                            fill="#1f2937"
                            stroke="rgba(255,215,0,0.3)"
                            strokeWidth="1"
                        />
                        {/* Highlight ring for shimmer */}
                        <circle
                            cx="0"
                            cy="0"
                            r="26"
                            fill="none"
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="1"
                            opacity="0.5"
                        />
                        {/* Center text */}
                        <text
                            x="0"
                            y="0"
                            fill="white"
                            fontSize="10"
                            fontWeight="900"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                                letterSpacing: '0.5px'
                            }}
                        >
                            LUCKY
                        </text>
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

            {/* 🎉 WINNER DISPLAY MODAL - UPGRADED SPECTACULAR EXPERIENCE */}
            {winner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Enhanced Backdrop with 5px blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40"
                        style={{ backdropFilter: 'blur(5px)' }}
                        onClick={() => setWinner(null)} // Click backdrop to close
                    />

                    {/* Winner Modal Card - POP Animation (0.8 → 1.0) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                            bounce: 0.3,
                        }}
                        className="relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl shadow-2xl px-8 py-10 max-w-lg w-full text-center border-4 border-yellow-400 overflow-hidden"
                    >
                        {/* Decorative background patterns */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <div className="absolute top-4 left-4 text-9xl">🎉</div>
                            <div className="absolute bottom-4 right-4 text-9xl">🎊</div>
                        </div>

                        {/* Celebration Header */}
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mb-6"
                        >
                            <div className="text-6xl mb-2">🎊</div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">
                                {isUltimateWinner ? '👑 ULTIMATE WINNER! 👑' : '🎉 Congratulations! 🎉'}
                            </h2>
                            <p className="text-lg text-gray-600 font-semibold">
                                {isUltimateWinner ? 'The last one standing!' : 'You\'ve won a prize!'}
                            </p>
                        </motion.div>

                        {/* 🏆 Winner Prize Display Box */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                            className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 p-8 rounded-2xl mb-8 shadow-xl"
                        >
                            {/* Shine effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-2xl" />

                            <p className="relative text-5xl md:text-6xl font-black text-white break-words drop-shadow-2xl leading-tight">
                                {winner}
                            </p>
                        </motion.div>

                        {/* Action Buttons Section */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            {/* Primary: Claim Prize Button */}
                            <button
                                onClick={() => {
                                    // Handle claim prize action
                                    setWinner(null);
                                    if (eliminationMode && onEliminate) onEliminate(winner);
                                }}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                            >
                                <span className="text-2xl">🎁</span>
                                <span>{eliminationMode ? 'Eliminate & Continue' : 'Claim Prize'}</span>
                            </button>

                            {/* Secondary: Spin Again Button */}
                            {!eliminationMode && (
                                <button
                                    onClick={() => {
                                        setWinner(null);
                                        // Optionally trigger another spin
                                        // performSpin();
                                    }}
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="text-2xl">🎯</span>
                                    <span>Spin Again</span>
                                </button>
                            )}

                            {/* Tertiary: Share Buttons */}
                            <div className="flex gap-3 justify-center pt-2">
                                <button
                                    className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all hover:scale-110 shadow-md"
                                    title="Share"
                                >
                                    <Share2 size={22} />
                                </button>
                                <button
                                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all hover:scale-110 shadow-md"
                                    title="Copy"
                                >
                                    <Copy size={22} />
                                </button>
                            </div>

                            {/* Close text hint */}
                            <p className="text-sm text-gray-500 mt-4">
                                Press ESC or click outside to close
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
        </div>
    );
});

Wheel.displayName = 'Wheel';

export default Wheel;
