'use client';

import { useState } from 'react';

export const categories = [
    { id: 'all', label: 'All', emoji: '🎯', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'food', label: 'Food', emoji: '🍔', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'party', label: 'Party', emoji: '🎉', color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
    { id: 'decision', label: 'Decisions', emoji: '🤔', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'entertainment', label: 'Fun', emoji: '🎬', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { id: 'random', label: 'Random', emoji: '🎲', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'education', label: 'Education', emoji: '📚', color: 'bg-gradient-to-r from-indigo-500 to-blue-500' },
    { id: 'health', label: 'Health', emoji: '💪', color: 'bg-gradient-to-r from-red-500 to-pink-500' },
    { id: 'travel', label: 'Travel', emoji: '✈️', color: 'bg-gradient-to-r from-teal-500 to-cyan-500' },
];

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Browse by Category</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`
              px-4 py-2 rounded-full font-semibold transition-all duration-200
              flex items-center gap-2
              ${selectedCategory === category.id
                                ? `${category.color} text-white scale-110 shadow-lg`
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }
            `}
                    >
                        <span className="text-xl">{category.emoji}</span>
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
