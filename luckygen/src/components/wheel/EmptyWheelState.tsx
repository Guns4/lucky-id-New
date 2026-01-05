'use client';

import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

interface EmptyWheelStateProps {
    onAddItems?: () => void;
}

export default function EmptyWheelState({ onAddItems }: EmptyWheelStateProps) {
    return (
        <div className="relative flex flex-col items-center justify-center p-8 min-h-[500px]">
            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
                />
            </div>

            {/* Empty wheel illustration */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10"
            >
                {/* Main circle */}
                <div className="relative w-48 h-48 rounded-full border-8 border-dashed border-white/30 flex items-center justify-center">
                    {/* Sparkle decorations */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            className="absolute"
                            style={{
                                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Sparkles className="text-yellow-400" size={16} />
                        </motion.div>
                    ))}

                    {/* Center icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                        <Plus className="text-white" size={32} strokeWidth={3} />
                    </div>
                </div>
            </motion.div>

            {/* Text content */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-10 text-center mt-8 max-w-md"
            >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    The Wheel is Empty! 🎡
                </h3>
                <p className="text-white/70 text-base mb-6 leading-relaxed">
                    Add some lucky items to get started. The more options you add, the more exciting the spin!
                </p>

                {/* CTA Button */}
                {onAddItems && (
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAddItems}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-xl transition-all duration-200"
                    >
                        <Plus size={20} />
                        Add Your First Item
                    </motion.button>
                )}
            </motion.div>

            {/* Helpful tips */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
            >
                {[
                    { icon: '🎯', text: 'Add 2+ items' },
                    { icon: '✏️', text: 'Customize colors' },
                    { icon: '🎲', text: 'Start spinning!' }
                ].map((tip, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                        <span className="text-2xl">{tip.icon}</span>
                        <span className="text-white/80 text-sm font-medium">{tip.text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
