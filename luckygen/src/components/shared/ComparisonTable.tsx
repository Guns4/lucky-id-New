'use client';

import { motion } from 'framer-motion';
import { Check, X, Crown } from 'lucide-react';

interface Feature {
    name: string;
    luckygen: boolean | string;
    wheelofnames: boolean | string;
    pickerwheel: boolean | string;
    description?: string;
}

const comparisonData: Feature[] = [
    {
        name: 'Premium Dark Theme',
        luckygen: true,
        wheelofnames: false,
        pickerwheel: 'Basic',
        description: 'Eye-comfortable dark mode with glassmorphism'
    },
    {
        name: 'Mobile Optimization',
        luckygen: 'Perfect',
        wheelofnames: 'Good',
        pickerwheel: 'Basic',
        description: 'Optimized for all smartphone models'
    },
    {
        name: 'Advanced Animations',
        luckygen: true,
        wheelofnames: 'Basic',
        pickerwheel: false,
        description: 'Smooth 60fps animations with physics'
    },
    {
        name: 'Unlimited Themes',
        luckygen: 'Unlimited',
        wheelofnames: '20+',
        pickerwheel: '10',
        description: 'Create and customize unlimited themes'
    },
    {
        name: 'Export Options',
        luckygen: 'PDF, PNG, CSV',
        wheelofnames: 'PNG only',
        pickerwheel: 'Basic',
        description: 'Multiple export formats'
    },
    {
        name: 'Embed Anywhere',
        luckygen: true,
        wheelofnames: 'Paid',
        pickerwheel: 'Paid',
        description: 'Free embedding on any website'
    },
    {
        name: 'Analytics Dashboard',
        luckygen: true,
        wheelofnames: false,
        pickerwheel: false,
        description: 'Track spins and analyze patterns'
    },
    {
        name: 'Ad-Free Experience',
        luckygen: 'Premium',
        wheelofnames: 'Paid',
        pickerwheel: 'Paid',
        description: 'Clean interface without ads'
    },
    {
        name: '3D Wheel Mode',
        luckygen: true,
        wheelofnames: false,
        pickerwheel: false,
        description: 'Realistic 3D spinning experience'
    },
    {
        name: 'Multi-Language',
        luckygen: '15+ Languages',
        wheelofnames: '10',
        pickerwheel: '5',
        description: 'Extensive language support'
    },
    {
        name: 'Custom Sounds',
        luckygen: true,
        wheelofnames: 'Limited',
        pickerwheel: false,
        description: 'Upload your own sound effects'
    },
    {
        name: 'Team Collaboration',
        luckygen: true,
        wheelofnames: false,
        pickerwheel: false,
        description: 'Share and collaborate with your team'
    },
];

const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
        return value ? (
            <Check className="w-6 h-6 text-green-400 mx-auto" />
        ) : (
            <X className="w-6 h-6 text-red-400 mx-auto" />
        );
    }
    return <span className="text-sm text-gray-300 font-medium">{value}</span>;
};

export default function ComparisonTable() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />

            <div className="container-premium relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
                        🏆 Honest Comparison
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                        See How We <span className="text-gradient">Beat The Competition</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We've compared ourselves objectively with the top wheel spinners. Here's what makes us the best choice.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Desktop View */}
                    <div className="hidden lg:block frosted-glass rounded-3xl overflow-hidden border border-white/10">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-r from-violet-600/10 to-purple-600/10 border-b border-white/10">
                            <div className="font-bold text-white">Feature</div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full">
                                    <Crown className="w-4 h-4 text-yellow-400" />
                                    <span className="font-bold text-white">LuckyGen</span>
                                </div>
                            </div>
                            <div className="text-center font-semibold text-gray-400">
                                WheelOfNames
                            </div>
                            <div className="text-center font-semibold text-gray-400">
                                PickerWheel
                            </div>
                        </div>

                        {/* Table Rows */}
                        {comparisonData.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="grid grid-cols-4 gap-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors group"
                            >
                                <div>
                                    <div className="font-medium text-white mb-1">{feature.name}</div>
                                    {feature.description && (
                                        <div className="text-xs text-gray-500">{feature.description}</div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center">
                                    {renderValue(feature.luckygen)}
                                </div>
                                <div className="flex items-center justify-center">
                                    {renderValue(feature.wheelofnames)}
                                </div>
                                <div className="flex items-center justify-center">
                                    {renderValue(feature.pickerwheel)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden space-y-4">
                        {comparisonData.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="card-premium p-6"
                            >
                                <h3 className="font-bold text-white mb-2">{feature.name}</h3>
                                {feature.description && (
                                    <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                                )}

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-2">LuckyGen</div>
                                        <div className="flex justify-center items-center h-10">
                                            {renderValue(feature.luckygen)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-2">WheelOfNames</div>
                                        <div className="flex justify-center items-center h-10">
                                            {renderValue(feature.wheelofnames)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-2">PickerWheel</div>
                                        <div className="flex justify-center items-center h-10">
                                            {renderValue(feature.pickerwheel)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 mb-6">
                        Join thousands who switched from other platforms
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-premium px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-green-500/50"
                    >
                        Start Using LuckyGen Free
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
