'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Achievement } from '@/hooks/useAchievements';

interface AchievementToastProps {
    achievement: Achievement | null;
    onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
    if (!achievement) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] max-w-md w-full mx-4"
            >
                <div className="relative bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 p-1 rounded-2xl shadow-2xl">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-2xl blur-xl opacity-75 animate-pulse" />

                    <div className="relative bg-white rounded-xl p-6">
                        {/* Close button */}
                        <button
                            onClick={onDismiss}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Dismiss"
                        >
                            <X size={18} className="text-gray-500" />
                        </button>

                        {/* Content */}
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce">
                                {achievement.icon}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Trophy className="text-yellow-600" size={20} />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Achievement Unlocked!
                                    </h3>
                                </div>
                                <p className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-1">
                                    {achievement.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {achievement.description}
                                </p>

                                {/* Special message for Pro theme unlock */}
                                {achievement.id === 'pro' && (
                                    <div className="mt-3 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                                        <p className="text-xs font-semibold text-purple-700">
                                            🎨 Premium theme unlocked! Check the theme selector.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Progress bar animation */}
                        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Confetti effect */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 1,
                                x: '50%',
                                y: '50%',
                                scale: 0
                            }}
                            animate={{
                                opacity: 0,
                                x: `${50 + (Math.random() - 0.5) * 200}%`,
                                y: `${50 + (Math.random() - 0.5) * 200}%`,
                                scale: 1
                            }}
                            transition={{
                                duration: 1,
                                delay: i * 0.05,
                                ease: 'easeOut'
                            }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#FFD700', '#FFA500', '#FF6347', '#FF1493'][i % 4]
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
