'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * SEO Content Component with Accordion Pattern
 * High CPC article about Random Wheel Generator for Business & Education
 */
export default function SeoContent() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section
            id="seo-content"
            className="w-full max-w-4xl mx-auto mt-16 mb-12 px-4"
        >
            {/* Content Container - Gray Background */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
                {/* Title */}
                <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
                    Why Use This Random Wheel Generator?
                </h2>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>

                {/* Content - Always in DOM for SEO */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    {/* First Paragraph - Always Visible */}
                    <p className="mb-4 text-base">
                        Welcome to <strong>LuckyGen</strong>, the professional-grade <strong>random picker wheel</strong> designed for fairness and versatility.
                        Whether you are hosting a business giveaway, organizing a classroom activity, or making a quick decision, our algorithm ensures a
                        100% random outcome every time. Unlike simple game wheels, LuckyGen is optimized for <strong>event organizers, marketers, and educators</strong>.
                    </p>

                    {/* Expandable Content - Hidden by default but present in DOM */}
                    <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                            Top Use Cases for Business & Marketing
                        </h3>
                        <p className="mb-4 text-base">
                            Digital marketing campaigns often require transparency. Use this tool as a <strong>fair raffle generator</strong> for your social media contests.
                            By recording the spin, you provide proof of fairness to your audience, boosting brand trust and engagement rates.
                            It is the perfect utility for:
                        </p>
                        <ul className="mb-4 space-y-2 list-disc list-inside text-base">
                            <li><strong>Client Giveaways:</strong> Randomly select winners for promotional products or discount coupons.</li>
                            <li><strong>Team Building:</strong> Assign tasks or break the ice in corporate meetings.</li>
                            <li><strong>Prize Distribution:</strong> Fairly allocate rewards in loyalty programs.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                            Gamification in Education & E-Learning
                        </h3>
                        <p className="mb-4 text-base">
                            Teachers and trainers use random name pickers to increase student participation.
                            Gamifying the learning process helps maintain attention and makes "picking a volunteer" exciting rather than stressful.
                            Compatible with smartboards and projector screens for live classroom interaction.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                            Certified Randomness (RNG Technology)
                        </h3>
                        <p className="mb-4 text-base">
                            Our system utilizes advanced pseudo-random number generation (PRNG) logic rooted in cryptographic standards.
                            This ensures that every spin result is statistically independent, making it a reliable tool for high-stakes raffles and decision-making scenarios where fairness is paramount.
                        </p>
                    </div>
                </div>

                {/* Read More / Show Less Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Show less content' : 'Read more about LuckyGen'}
                    >
                        <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                        {isExpanded ? (
                            <ChevronUp size={20} strokeWidth={2.5} />
                        ) : (
                            <ChevronDown size={20} strokeWidth={2.5} />
                        )}
                    </button>
                </div>

                {/* SEO Keywords - Always in DOM */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-400 italic leading-relaxed text-center">
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
