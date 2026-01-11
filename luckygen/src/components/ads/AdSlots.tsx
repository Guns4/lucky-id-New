'use client';

import React from 'react';
import AdSense from './AdSense';

/**
 * Top Leaderboard Ad - High Visibility Position
 * Place ABOVE the wheel title/header
 * Responsive, prevents layout shift with min-height
 */
export function TopLeaderboardAd() {
    return (
        <div className="w-full mb-6">
            {/* Ad Label (AdSense Policy Requirement) */}
            <p className="text-xs text-gray-500 text-center mb-1 font-medium">
                Advertisement
            </p>

            {/* Ad Container with min-height to prevent CLS */}
            <div
                className="w-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                style={{ minHeight: '100px' }}
            >
                <AdSense
                    adSlot="1234567890" // Replace with your ad slot ID
                    adFormat="auto"
                    fullWidthResponsive={true}
                    adStyle={{ display: 'block', minHeight: '100px' }}
                />
            </div>
        </div>
    );
}

/**
 * Golden Slot Ad - High CTR Position (300x250)
 * Place BELOW spin button, ABOVE history section
 * 20px margin to prevent accidental clicks
 */
export function GoldenSlotAd() {
    return (
        <div className="w-full max-w-md mx-auto mt-8">
            {/* Ad Label (AdSense Policy Requirement) */}
            <p className="text-xs text-gray-500 text-center mb-2 font-medium">
                Sponsored
            </p>

            {/* Ad Container - 300x250 Rectangle */}
            <div
                className="w-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mx-auto"
                style={{
                    minHeight: '250px',
                    maxWidth: '300px',
                    marginTop: '20px' // Prevent accidental clicks
                }}
            >
                <AdSense
                    adSlot="0987654321" // Replace with your ad slot ID
                    adFormat="rectangle"
                    fullWidthResponsive={false}
                    adStyle={{
                        display: 'block',
                        width: '300px',
                        height: '250px'
                    }}
                />
            </div>
        </div>
    );
}

/**
 * In-Content Ad - Sidebar or Between Content
 * Responsive, adapts to container width
 */
export function InContentAd() {
    return (
        <div className="w-full my-6">
            {/* Ad Label */}
            <p className="text-xs text-gray-500 mb-1 font-medium">
                Advertisement
            </p>

            {/* Ad Container */}
            <div
                className="w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                style={{ minHeight: '200px' }}
            >
                <AdSense
                    adSlot="1122334455" // Replace with your ad slot ID
                    adFormat="auto"
                    fullWidthResponsive={true}
                    adStyle={{ display: 'block', minHeight: '200px' }}
                />
            </div>
        </div>
    );
}

/**
 * Bottom Banner Ad - Below the Fold
 * Good for SEO content sections
 */
export function BottomBannerAd() {
    return (
        <div className="w-full mt-12 mb-6">
            {/* Ad Label */}
            <p className="text-xs text-gray-500 text-center mb-1 font-medium">
                Advertisement
            </p>

            {/* Ad Container */}
            <div
                className="w-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                style={{ minHeight: '90px' }}
            >
                <AdSense
                    adSlot="5544332211" // Replace with your ad slot ID
                    adFormat="horizontal"
                    fullWidthResponsive={true}
                    adStyle={{ display: 'block', minHeight: '90px' }}
                />
            </div>
        </div>
    );
}
