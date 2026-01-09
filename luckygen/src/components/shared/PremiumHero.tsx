'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Play, Users } from 'lucide-react';
import Link from 'next/link';

interface Stat {
    value: string;
    label: string;
    icon: React.ElementType;
}

const stats: Stat[] = [
    { value: '1M+', label: 'Happy Users', icon: Users },
    { value: '50M+', label: 'Spins Made', icon: Play },
    { value: '4.9/5', label: 'User Rating', icon: Star },
];

export default function PremiumHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-4">
            {/* Advanced Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Gradients */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"
                    />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Content */}
            <div className="container-premium relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <span className="badge-premium text-xs sm:text-sm">
                            🏆 #1 Professional Wheel Spinner
                        </span>
                    </motion.div>

                    {/* Main Heading with Gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                    >
                        <span className="text-gradient-rainbow">Make Decisions</span>
                        <br />
                        <span className="text-white">The Smart Way</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        The most advanced decision-making wheel with{' '}
                        <span className="text-gradient font-semibold">premium features</span>,{' '}
                        <span className="text-gradient font-semibold">stunning design</span>, and{' '}
                        <span className="text-gradient font-semibold">professional tools</span>{' '}
                        that competitors can't match.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link href="#wheel-section">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-bold text-lg text-white shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">Start Spinning Now</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </Link>

                        <Link href="/explore">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 glass-ultra border border-white/10 rounded-full font-semibold text-lg text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                Explore Templates
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="glass-subtle p-4 md:p-6 rounded-2xl group hover:glass-ultra transition-all duration-300"
                                >
                                    <Icon className="w-8 h-8 text-violet-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-400">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>100% Free to Start</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span>No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            <span>Trusted by 1M+ Users</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
}
