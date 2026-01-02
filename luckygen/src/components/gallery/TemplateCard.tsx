'use client';

import { Play, Edit, Users, Star } from 'lucide-react';
import { WheelSegment } from '@/lib/store/wheelStore';

interface TemplateCardProps {
    id: string;
    title: string;
    slug: string;
    segments: WheelSegment[];
    views: number;
    category: string;
    featured?: boolean;
    lang: string;
    onPlay: (slug: string) => void;
    onRemix: (segments: WheelSegment[], title: string) => void;
}

export default function TemplateCard({
    id,
    title,
    slug,
    segments,
    views,
    category,
    featured = false,
    lang,
    onPlay,
    onRemix,
}: TemplateCardProps) {
    // Get first 4 segment colors for preview
    const previewColors = segments.slice(0, 4).map(s => s.color);

    // Fill remaining slots with gray if less than 4 segments
    while (previewColors.length < 4) {
        previewColors.push('#374151');
    }

    return (
        <div className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
            {/* Featured Badge */}
            {featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    Popular
                </div>
            )}

            {/* Color Preview Circles */}
            <div className="flex gap-2 mb-4">
                {previewColors.map((color, idx) => (
                    <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white/30 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                {title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                    <span className="text-yellow-400">⚡</span>
                    {segments.length} options
                </span>
                <span className="flex items-center gap-1">
                    <Users size={14} />
                    {views.toLocaleString()} spins
                </span>
            </div>

            {/* Category Badge */}
            <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold capitalize">
                    {category}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => onPlay(slug)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/play"
                >
                    <Play size={16} className="group-hover/play:scale-125 transition-transform" />
                    Play
                </button>
                <button
                    onClick={() => onRemix(segments, title)}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/remix"
                >
                    <Edit size={16} className="group-hover/remix:rotate-12 transition-transform" />
                    Remix
                </button>
            </div>
        </div>
    );
}
