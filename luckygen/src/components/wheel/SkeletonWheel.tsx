'use client';

import { motion } from 'framer-motion';

export default function SkeletonWheel() {
    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            {/* Skeleton Wheel Container */}
            <div className="relative w-full max-w-md aspect-square">
                {/* Pointer Skeleton */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-gray-300 animate-pulse" />
                </div>

                {/* Main Wheel Skeleton */}
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl relative overflow-hidden"
                >
                    {/* Animated shimmer effect */}
                    <motion.div
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />

                    {/* Segment dividers */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-1 bg-gray-400/50"
                            style={{
                                height: '50%',
                                transform: `rotate(${i * 45}deg) translateX(-50%)`,
                                transformOrigin: 'top center'
                            }}
                        />
                    ))}
                </motion.div>

                {/* Center Button Skeleton */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gray-300 shadow-xl flex items-center justify-center animate-pulse">
                    <div className="w-12 h-3 bg-gray-400 rounded-full" />
                </div>
            </div>

            {/* Loading text */}
            <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <p className="text-white/70 font-semibold ml-2">Loading wheel...</p>
            </div>
        </div>
    );
}
