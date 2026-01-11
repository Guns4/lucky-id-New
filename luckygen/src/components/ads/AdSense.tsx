'use client';

import React, { useEffect } from 'react';

interface AdSenseProps {
    adSlot: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    fullWidthResponsive?: boolean;
    adStyle?: React.CSSProperties;
    className?: string;
}

/**
 * Google AdSense Component
 * 
 * IMPORTANT: Before using, add this to your <head> in layout.tsx:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script>
 * 
 * Replace YOUR_PUBLISHER_ID with your actual AdSense publisher ID
 */
export default function AdSense({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    adStyle = { display: 'block' },
    className = '',
}: AdSenseProps) {
    useEffect(() => {
        try {
            // Push ad to AdSense queue
            if (typeof window !== 'undefined') {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={adStyle}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive.toString()}
        ></ins>
    );
}
