'use client';

import React, { useEffect, CSSProperties } from 'react';

interface AdUnitProps {
    slotId: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    style?: CSSProperties;
    className?: string;
}

/**
 * Google AdSense Ad Unit Component
 * 
 * SETUP REQUIRED:
 * 1. Add AdSense script to layout.tsx (see instructions below)
 * 2. Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your publisher ID
 * 3. Create ad units in AdSense dashboard and use slot IDs
 * 
 * USAGE:
 * <AdUnit slotId="1234567890" format="auto" />
 */
export default function AdUnit({
    slotId,
    format = 'auto',
    style,
    className = ''
}: AdUnitProps) {
    useEffect(() => {
        // Initialize AdSense ad
        try {
            if (typeof window !== 'undefined') {
                // Push ad to AdSense queue
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    // Default styles with min-height to prevent CLS
    const defaultStyle: CSSProperties = {
        display: 'block',
        minHeight: format === 'rectangle' ? '250px' : '100px',
        ...style,
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Advertisement Label (AdSense Policy Requirement) */}
            <p className="text-xs text-gray-500 text-center mb-2 font-medium">
                Advertisement
            </p>

            {/* Ad Container with min-height to prevent CLS */}
            <div
                className="w-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                style={{ minHeight: format === 'rectangle' ? '250px' : '100px' }}
            >
                {/* Google AdSense Ad Unit */}
                <ins
                    className="adsbygoogle"
                    style={defaultStyle}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // REPLACE with your AdSense publisher ID
                    data-ad-slot={slotId}
                    data-ad-format={format}
                    data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
                ></ins>
            </div>
        </div>
    );
}

/**
 * Pre-configured Ad Slots for common positions
 */

// Top Leaderboard (Above content)
export function TopLeaderboardAd() {
    return (
        <AdUnit
            slotId="1234567890" // Replace with your slot ID
            format="auto"
            className="mb-6"
        />
    );
}

// Golden Slot - 300x250 (High CTR position)
export function GoldenSlotAd() {
    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <p className="text-xs text-gray-500 text-center mb-2 font-medium">
                Sponsored
            </p>
            <div
                className="w-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mx-auto"
                style={{
                    minHeight: '250px',
                    maxWidth: '300px',
                }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '300px', height: '250px' }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // REPLACE
                    data-ad-slot="0987654321" // Replace with your slot ID
                    data-ad-format="rectangle"
                ></ins>
            </div>
        </div>
    );
}

// In-Content Ad (Between sections)
export function InContentAd() {
    return (
        <AdUnit
            slotId="1122334455" // Replace with your slot ID
            format="auto"
            className="my-6"
        />
    );
}
