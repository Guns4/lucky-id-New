'use client';

import { motion } from 'framer-motion';
import {
    Sparkles,
    Zap,
    Shield,
    Palette,
    Share2,
    Download,
    Smartphone,
    Globe,
    TrendingUp,
    Award
} from 'lucide-react';

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
}

const features: Feature[] = [
    {
        icon: Sparkles,
        title: 'Ultra Premium Design',
        description: 'Sophisticated dark theme with premium glassmorphism effects that competitors can\'t match',
        gradient: 'from-violet-500 to-purple-600'
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Optimized performance with smooth 60fps animations and instant interactions',
        gradient: 'from-yellow-500 to-orange-600'
    },
    {
        icon: Palette,
        title: 'Advanced Customization',
        description: 'Unlimited themes, colors, and personalization options beyond basic spinners',
        gradient: 'from-pink-500 to-rose-600'
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-level encryption and privacy protection for your data',
        gradient: 'from-green-500 to-emerald-600'
    },
    {
        icon: Share2,
        title: 'Smart Sharing',
        description: 'Share with dynamic links, embed anywhere, and track engagement',
        gradient: 'from-blue-500 to-cyan-600'
    },
    {
        icon: Download,
        title: 'Export Anywhere',
        description: 'Download results as images, PDFs, or CSV files instantly',
        gradient: 'from-indigo-500 to-blue-600'
    },
    {
        icon: Smartphone,
        title: 'Mobile Perfection',
        description: 'Flawless experience on every device, from iPhone to Android',
        gradient: 'from-purple-500 to-pink-600'
    },
    {
        icon: Globe,
        title: 'Multi-Language',
        description: 'Available in 15+ languages with automatic detection',
        gradient: 'from-teal-500 to-green-600'
    },
    {
        icon: TrendingUp,
        title: 'Analytics Included',
        description: 'Track spins, analyze patterns, and understand your decisions better',
        gradient: 'from-orange-500 to-red-600'
    },
    {
        icon: Award,
        title: 'No Ads (Premium)',
        description: 'Completely ad-free experience with premium subscription',
        gradient: 'from-yellow-400 to-yellow-600'
    }
];

export default function PremiumFeatures() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float-smooth" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-smooth" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container-premium relative z-10">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-6 animate-pulse-glow">
                        ✨ Better Than Competitors
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
                        Why We're Different
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Professional features that set us apart from basic wheel spinners. Built for serious decision-making.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="card-premium group"
                            >
                                {/* Icon Container with Gradient */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-full h-full rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Premium Indicator */}
                                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <button className="btn-neon px-8 py-4 text-lg">
                        Try Premium Features Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
