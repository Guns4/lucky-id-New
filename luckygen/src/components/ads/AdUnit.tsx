'use client';

import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
    slotId: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    className?: string;
    refreshTrigger?: any; // Changes trigger ad refresh (e.g., spin count)
}

// Declare window.adsbygoogle for TypeScript
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

// Minimum heights to prevent CLS (Cumulative Layout Shift)
const MIN_HEIGHTS = {
    rectangle: 250,    // 300x250 medium rectangle
    horizontal: 90,    // 728x90 leaderboard (desktop) / 320x100 (mobile)
    vertical: 600,     // 160x600 wide skyscraper
    auto: 280          // Responsive default
};

/**
 * Smart AdSense component with SPA refresh support and CLS prevention
 * 
 * Features:
 * - Refreshes ads when refreshTrigger changes (e.g., wheel spins)
 * - 30-second throttle to prevent invalid traffic bans
 * - Reserved space with min-height to prevent layout shifts
 * - Error handling for AdBlock
 * - Loading placeholder with shimmer effect
 */
export default function AdUnit({
    slotId,
    format = 'auto',
    className = '',
    refreshTrigger
}: AdUnitProps) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const lastRefreshRef = useRef<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isThrottled, setIsThrottled] = useState(false);

    // Get minimum height based on format
    const minHeight = MIN_HEIGHTS[format];

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastRefresh = now - lastRefreshRef.current;
        const THROTTLE_DURATION = 30000; // 30 seconds

        // Check if refresh is throttled
        if (lastRefreshRef.current > 0 && timeSinceLastRefresh < THROTTLE_DURATION) {
            const remainingTime = Math.ceil((THROTTLE_DURATION - timeSinceLastRefresh) / 1000);
            console.log(`[AdUnit] Refresh throttled. Wait ${remainingTime}s to comply with AdSense policies.`);
            setIsThrottled(true);

            // Clear throttle flag after remaining time
            setTimeout(() => setIsThrottled(false), THROTTLE_DURATION - timeSinceLastRefresh);
            return;
        }

        // Clear existing ad content before refresh
        if (adContainerRef.current) {
            const insElement = adContainerRef.current.querySelector('.adsbygoogle');
            if (insElement) {
                insElement.innerHTML = '';
            }
        }

        try {
            // Initialize adsbygoogle array if not exists
            if (typeof window !== 'undefined') {
                window.adsbygoogle = window.adsbygoogle || [];

                // Push new ad request
                window.adsbygoogle.push({});

                // Update last refresh timestamp
                lastRefreshRef.current = now;

                console.log(`[AdUnit] Ad loaded/refreshed for slot: ${slotId}`);

                // Hide loading indicator after a short delay
                setTimeout(() => setIsLoading(false), 500);
            }
        } catch (error) {
            // Handle AdBlock or script loading errors gracefully
            console.warn('[AdUnit] AdSense blocked or failed:', error);
            setIsLoading(false);
        }
    }, [refreshTrigger, slotId]); // Re-run when refreshTrigger changes

    return (
        <div
            ref={adContainerRef}
            className={`relative ${className}`}
            style={{
                minHeight: `${minHeight}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Loading Placeholder */}
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center"
                    style={{ minHeight: `${minHeight}px` }}
                >
                    <div className="animate-pulse space-y-3 w-full p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        <div className="text-xs text-gray-400 text-center mt-4">
                            {isThrottled ? '⏱️ Ad refresh throttled (30s cooldown)' : '📡 Loading ad...'}
                        </div>
                    </div>
                </div>
            )}

            {/* AdSense Slot */}
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    minHeight: `${minHeight}px`,
                }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ⚠️ REPLACE with your AdSense publisher ID
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}

/**
 * Predefined Ad Components for Common Placements
 */

// Top Leaderboard (Above content, high visibility)
export function TopLeaderboardAd({ slotId, refreshTrigger }: { slotId: string; refreshTrigger?: any }) {
    return (
        <div className="w-full bg-white border-b border-gray-200 py-2">
            <AdUnit
                slotId={slotId}
                format="horizontal"
                className="max-w-7xl mx-auto"
                refreshTrigger={refreshTrigger}
            />
        </div>
    );
}

// Medium Rectangle (The "Money Spot" - below wheel)
export function MediumRectangleAd({ slotId, refreshTrigger }: { slotId: string; refreshTrigger?: any }) {
    return (
        <div className="flex justify-center py-4">
            <AdUnit
                slotId={slotId}
                format="rectangle"
                className="medium-rectangle-ad"
                refreshTrigger={refreshTrigger}
            />
        </div>
    );
}

// In-Feed Ad (For lists/galleries)
export function InFeedAd({ slotId, refreshTrigger }: { slotId: string; refreshTrigger?: any }) {
    return (
        <AdUnit
            slotId={slotId}
            format="auto"
            className="in-feed-ad my-4"
            refreshTrigger={refreshTrigger}
        />
    );
}
