'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import { WheelSegment } from '@/lib/store/wheelStore';
import { ExternalLink } from 'lucide-react';

interface EmbedPageClientProps {
    wheel: {
        id: string;
        title: string;
        segments: WheelSegment[];
        views: number;
    };
    slug: string;
}

export default function EmbedPageClient({ wheel, slug }: EmbedPageClientProps) {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://luckygen.click';

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col">
            {/* Main Content - Centered Wheel */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {/* Wheel Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        {wheel.title}
                    </h1>

                    {/* Wheel Component - Clean, no navigation */}
                    <Wheel
                        segments={wheel.segments}
                        slug={slug}
                        wheelTitle={wheel.title}
                    />

                    {/* Optional: Show number of spins */}
                    <p className="text-center mt-4 text-sm text-white/60">
                        {wheel.views} spin{wheel.views !== 1 ? 's' : ''} so far
                    </p>
                </div>
            </div>

            {/* Powered by LuckyGen - THE BACKLINK! */}
            <div className="sticky bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm py-3 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
                    <a
                        href={`${baseUrl}/w/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-200"
                    >
                        <span className="hidden sm:inline">Powered by</span>
                        <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300">
                            LuckyGen
                        </span>
                        <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
                    </a>
                    <span className="text-white/30">•</span>
                    <a
                        href={`${baseUrl}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white/80 transition-colors"
                    >
                        Create Your Own
                    </a>
                </div>
            </div>

            {/* Minimal styling to keep it clean */}
            <style jsx>{`
                /* Ensure iframe embedding works perfectly */
                body {
                    margin: 0;
                    padding: 0;
                    overflow: auto;
                }
            `}</style>
        </div>
    );
}
