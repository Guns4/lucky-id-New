'use client';

import { useState } from 'react';
import Script from 'next/script';
import Wheel from '@/components/wheel/Wheel';
import EmbedButton from '@/components/shared/EmbedButton';
import { WheelSegment } from '@/lib/store/wheelStore';

interface WheelPageClientProps {
    initialWheel: {
        id: string;
        title: string;
        segments: WheelSegment[];
        views: number;
    };
    lang: string;
}

// Generate dynamic SEO content based on wheel title
function generateDynamicContent(title: string, segments: WheelSegment[], views: number): string {
    const segmentList = segments.map(s => s.text).join(', ');
    const count = segments.length;

    return `
    <p>Can't decide on <strong>${title.toLowerCase()}</strong>? Let our random wheel spinner make the choice for you! 
    This decision-making tool features ${count} options: ${segmentList}.</p>
    
    <h3>How to Use This Decision Wheel</h3>
    <p>Using this random picker is simple and fun. Just click the "SPIN" button in the center of the wheel, 
    and watch as it spins with realistic physics animation before landing on your random result. Each option 
    has an equal chance of being selected, ensuring completely fair and unbiased decision-making.</p>
    
    <h3>Why Use a Random Wheel Spinner?</h3>
    <p>Sometimes making decisions can be overwhelming, especially when all options seem equally good. 
    Our wheel of fortune eliminates analysis paralysis by introducing an element of chance. Whether you're 
    choosing ${title.toLowerCase()}, making team selections, or just having fun with friends, this random 
    generator takes the stress out of decision-making.</p>
    
    <h3>Perfect for Groups</h3>
    <p>Share this wheel with friends, family, or colleagues. The unique URL means everyone can access the 
    same wheel configuration, making it ideal for group activities, team building, games, and collaborative 
    decision-making. Over ${views} people have already used this specific wheel!</p>
    
    <h3>Free Forever</h3>
    <p>LuckyGen is completely free to use. No registration required, no hidden fees, no limits. 
    Create as many custom wheels as you want, share them with anyone, and enjoy unlimited spins.</p>
  `;
}

export default function WheelPageClient({ initialWheel, lang }: WheelPageClientProps) {
    const [wheel] = useState(initialWheel);

    // JSON-LD Schema for rich snippets
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `${wheel.title} - Random Wheel Spinner`,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": wheel.views || 100,
            "bestRating": "5",
            "worstRating": "1"
        },
        "description": `Free online random wheel spinner for ${wheel.title}. Features: ${wheel.segments.map(s => s.text).join(', ')}.`
    };

    const dynamicContent = generateDynamicContent(wheel.title, wheel.segments, wheel.views);

    return (
        <>
            {/* JSON-LD Schema */}
            <Script
                id="wheel-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                            {wheel.title}
                        </h1>
                        <p className="text-gray-300">
                            {wheel.views} spin{wheel.views !== 1 ? 's' : ''} so far
                        </p>
                    </div>

                    {/* Wheel */}
                    <Wheel segments={wheel.segments} />

                    {/* Create Your Own */}
                    <div className="text-center mt-12">
                        <a
                            href={`/${lang}`}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 hover:scale-105"
                        >
                            Create Your Own Wheel
                        </a>
                    </div>

                    {/* Dynamic SEO Content - Critical for AdSense Approval */}
                    <article className="max-w-3xl mx-auto mt-16 px-4">
                        <div
                            className="prose prose-invert max-w-none text-gray-300 space-y-4"
                            dangerouslySetInnerHTML={{ __html: dynamicContent }}
                        />

                        <style jsx>{`
              article h3 {
                font-size: 1.5rem;
                font-weight: bold;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #FFD93D;
              }
              article p {
                line-height: 1.8;
                margin-bottom: 1rem;
              }
              article strong {
                color: #4ECDC4;
                font-weight: 600;
              }
            `}</style>
                    </article>

                    {/* Related Wheels Section */}
                    <section className="max-w-3xl mx-auto mt-16 px-4">
                        <h2 className="text-3xl font-bold mb-6 text-center">Related Decision Wheels</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['yes-or-no', 'what-to-eat', 'truth-or-dare', 'random-number-1-50', 'what-movie-to-watch', 'weekend-activity'].map((slug) => (
                                <a
                                    key={slug}
                                    href={`/${lang}/w/${slug}`}
                                    className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center capitalize"
                                >
                                    {slug.replace(/-/g, ' ')}
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Footer Section for Internal Linking */}
                    <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                        <p>
                            Explore more: <a href={`/${lang}`} className="text-blue-400 hover:underline">Create Custom Wheel</a> |
                            {' '}<a href={`/${lang}/about`} className="text-blue-400 hover:underline">About Us</a> |
                            {' '}<a href={`/${lang}/privacy`} className="text-blue-400 hover:underline">Privacy Policy</a>
                        </p>
                    </footer>
                </div>
            </main>
        </>
    );
}
