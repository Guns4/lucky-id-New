'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import SearchBar from '@/components/gallery/SearchBar';
import TemplateCard from '@/components/gallery/TemplateCard';
import InContentAd from '@/components/ads/InContentAd';
import { InFeedAd } from '@/components/ads/AdUnit';
import { useWheelStore, WheelSegment } from '@/lib/store/wheelStore';
import { Sparkles, TrendingUp } from 'lucide-react';

interface Wheel {
    id: string;
    title: string;
    slug: string;
    segments: WheelSegment[];
    views: number;
    category: string;
    featured: boolean;
}

interface ExploreClientProps {
    initialWheels: Wheel[];
    lang: string;
}

export default function ExploreClient({ initialWheels, lang }: ExploreClientProps) {
    const router = useRouter();
    const { setSegments, setTitle } = useWheelStore();

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWheels, setFilteredWheels] = useState<Wheel[]>(initialWheels);

    // Filter wheels based on category and search
    useEffect(() => {
        let filtered = initialWheels;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(wheel => wheel.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(wheel =>
                wheel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                wheel.segments.some(s => s.text.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredWheels(filtered);
    }, [selectedCategory, searchQuery, initialWheels]);

    const handlePlay = (slug: string) => {
        router.push(`/${lang}/w/${slug}`);
    };

    const handleRemix = (segments: WheelSegment[], title: string) => {
        setSegments(segments);
        setTitle(`${title} (Remix)`);
        router.push(`/${lang}`);
    };

    // Separate featured wheels
    const featuredWheels = filteredWheels.filter(w => w.featured);
    const regularWheels = filteredWheels.filter(w => !w.featured);

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        Explore Wheels
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover thousands of decision wheels. Play instantly or remix to create your own!
                    </p>
                </div>

                {/* Search Bar */}
                <SearchBar onSearch={setSearchQuery} placeholder="Search for wheels..." />

                {/* Category Filter */}
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                {/* Featured Section */}
                {featuredWheels.length > 0 && selectedCategory === 'all' && !searchQuery && (
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-yellow-400" size={24} />
                            <h2 className="text-3xl font-bold">Featured Wheels</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {featuredWheels.map((wheel) => (
                                <TemplateCard
                                    key={wheel.id}
                                    {...wheel}
                                    lang={lang}
                                    onPlay={handlePlay}
                                    onRemix={handleRemix}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Ad Slot Between Featured and Regular */}
                {featuredWheels.length > 0 && regularWheels.length > 0 && (
                    <InContentAd />
                )}

                {/* All Wheels Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-blue-400" size={24} />
                        <h2 className="text-3xl font-bold">
                            {searchQuery
                                ? `Search Results (${filteredWheels.length})`
                                : selectedCategory === 'all'
                                    ? 'All Wheels'
                                    : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Wheels`
                            }
                        </h2>
                    </div>

                    {filteredWheels.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-2xl text-gray-400 mb-4">No wheels found</p>
                            <p className="text-gray-500">Try adjusting your search or category filter</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {regularWheels.map((wheel, index) => {
                                const shouldInsertAd = (index + 1) % 6 === 0;
                                return (
                                    <React.Fragment key={wheel.id}>
                                        <TemplateCard
                                            {...wheel}
                                            lang={lang}
                                            onPlay={handlePlay}
                                            onRemix={handleRemix}
                                        />
                                        {/* Insert ad after every 6th card */}
                                        {shouldInsertAd && index < regularWheels.length - 1 && (
                                            <div className="col-span-full">
                                                <InFeedAd slotId={`infeed-${Math.floor(index / 6)}`} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* CTA Section */}
                <section className="mt-16 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Can't Find What You Need?</h3>
                        <p className="text-gray-300 mb-6">
                            Create your own custom wheel with unlimited options and share it with the world!
                        </p>
                        <a
                            href={`/${lang}`}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 hover:scale-105"
                        >
                            Create Custom Wheel
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
