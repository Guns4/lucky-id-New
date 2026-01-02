'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    slotId: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    className?: string;
    responsive?: boolean;
}

// Declare window.adsbygoogle for TypeScript
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

/**
 * High-performance AdSense component with CLS prevention
 * Uses fixed min-heights to prevent layout shifts
 */
export default function AdUnit({
    slotId,
    format = 'auto',
    className = '',
    responsive = true,
}: AdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);
    const isAdPushed = useRef(false);

    // Get minimum height based on ad format to prevent CLS
    const getMinHeight = () => {
        switch (format) {
            case 'rectangle':
                return '250px'; // 300x250 medium rectangle
            case 'horizontal':
                return '90px'; // 728x90 leaderboard (desktop) / 320x100 (mobile)
            case 'vertical':
                return '600px'; // 160x600 wide skyscraper
            case 'auto':
            default:
                return '250px'; // Default safe height
        }
    };

    useEffect(() => {
        // Only push ad once per mount
        if (isAdPushed.current) return;

        try {
            // Ensure adsbygoogle is available
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                // Push ad to Google AdSense queue
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                isAdPushed.current = true;
            }
        } catch (error) {
            // Silent fail for ad blockers or script loading issues
            console.warn('AdSense blocked or failed to load:', error);
        }

        // Cleanup is not needed as AdSense handles it
    }, []);

    return (
        <div
            className={`adsense-container ${className}`}
            style={{
                minHeight: getMinHeight(),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0',
            }}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    minHeight: getMinHeight(),
                }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
            />
        </div>
    );
}

/**
 * Predefined Ad Slots for common placements
 */

// Top Leaderboard (Above content)
export function TopLeaderboardAd({ slotId }: { slotId: string }) {
    return (
        <AdUnit
            slotId={slotId}
            format="horizontal"
            className="top-leaderboard-ad"
            responsive={true}
        />
    );
}

// Medium Rectangle (High attention area)
export function MediumRectangleAd({ slotId }: { slotId: string }) {
    return (
        <AdUnit
            slotId={slotId}
            format="rectangle"
            className="medium-rectangle-ad"
            responsive={true}
        />
    );
}

// In-Feed Ad (For galleries/lists)
export function InFeedAd({ slotId }: { slotId: string }) {
    return (
        <AdUnit
            slotId={slotId}
            format="auto"
            className="in-feed-ad"
            responsive={true}
        />
    );
}
