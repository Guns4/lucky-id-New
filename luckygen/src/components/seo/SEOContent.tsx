'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SEOContentProps {
    title?: string;
    content?: string;
    children?: React.ReactNode;
}

/**
 * SEO Content Section with Collapsible "Read More" Pattern
 * - Content is present in DOM for SEO (not dynamically loaded)
 * - Visually hidden/shown with CSS
 * - Clean UI with expand/collapse
 */
export default function SEOContent({
    title = "Why Use This Random Wheel Generator?",
    content,
    children
}: SEOContentProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const defaultContent = (
        <>
            {/* First paragraph - Always visible */}
            <p className="mb-4">
                Welcome to <strong>LuckyGen</strong>, the professional-grade <strong>random picker wheel</strong> designed for fairness and versatility.
                Whether you are hosting a business giveaway, organizing a classroom activity, or making a quick decision, our algorithm ensures a
                100% random outcome every time. Unlike simple game wheels, LuckyGen is optimized for <strong>event organizers, marketers, and educators</strong>.
            </p>

            {/* Rest of content - Collapsible */}
            <div className={isExpanded ? 'block' : 'hidden'}>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                    Top Use Cases for Business & Marketing
                </h3>
                <p className="mb-4">
                    Digital marketing campaigns often require transparency. Use this tool as a <strong>fair raffle generator</strong> for your social media contests.
                    By recording the spin, you provide proof of fairness to your audience, boosting brand trust and engagement rates.
                    It is the perfect utility for:
                </p>
                <ul className="mb-4 space-y-2 list-disc list-inside">
                    <li><strong>Client Giveaways:</strong> Randomly select winners for promotional products or discount coupons.</li>
                    <li><strong>Team Building:</strong> Assign tasks or break the ice in corporate meetings.</li>
                    <li><strong>Prize Distribution:</strong> Fairly allocate rewards in loyalty programs.</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                    Gamification in Education & E-Learning
                </h3>
                <p className="mb-4">
                    Teachers and trainers use random name pickers to increase student participation.
                    Gamifying the learning process helps maintain attention and makes "picking a volunteer" exciting rather than stressful.
                    Compatible with smartboards and projector screens for live classroom interaction.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                    Certified Randomness (RNG Technology)
                </h3>
                <p className="mb-4">
                    Our system utilizes advanced pseudo-random number generation (PRNG) logic rooted in cryptographic standards.
                    This ensures that every spin result is statistically independent, making it a reliable tool for high-stakes raffles and decision-making scenarios where fairness is paramount.
                </p>
            </div>
        </>
    );

    return (
        <section
            id="seo-content"
            className="w-full max-w-4xl mx-auto mt-16 mb-12 px-4"
        >
            {/* Content Container with Light Background */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
                {/* Title */}
                <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
                    {title}
                </h2>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>

                {/* Content */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    {children ? (
                        <>
                            {children}
                        </>
                    ) : content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        defaultContent
                    )}
                </div>

                {/* Read More / Collapse Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        <span>{isExpanded ? 'Show Less' : 'Learn more about LuckyGen'}</span>
                        {isExpanded ? (
                            <ChevronUp size={20} className="animate-bounce" />
                        ) : (
                            <ChevronDown size={20} className="animate-bounce" />
                        )}
                    </button>
                </div>

                {/* SEO Keywords (hidden but crawlable) - Always in DOM */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-400 italic leading-relaxed">
                        <em>Keywords: Random Name Picker, Wheel of Fortune Generator, Online Raffle Tool,
                            Decision Maker App, Giveaway Winner Selector, RNG Certified, Fair Raffle Generator,
                            Prize Wheel Spinner, Team Building Tool, Classroom Random Selector, Marketing Giveaway Tool,
                            Social Media Contest Picker, Corporate Event Randomizer, Educational Game Wheel,
                            Transparent Winner Selection, Cryptographic Random Generator, Professional Raffle System.</em>
                    </p>
                </div>
            </div>
        </section>
    );
}
