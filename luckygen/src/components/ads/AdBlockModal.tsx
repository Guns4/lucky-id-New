'use client';

import { useEffect, useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

/**
 * AdBlock Detection Modal - Soft Lock Approach
 * 
 * Detects if user has AdBlock enabled and shows a friendly modal
 * encouraging them to disable it to support the free tool.
 * 
 * Detection Method: "Bait Element"
 * - Creates a div with common ad-related classnames
 * - AdBlockers hide elements with these classes
 * - If element height = 0, AdBlock is detected
 */
export default function AdBlockModal() {
    const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        // Create a "bait" element that AdBlockers will hide
        const detectAdBlock = () => {
            const bait = document.createElement('div');

            // Use multiple common ad-related classnames
            bait.className = 'adsbox ad-container pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads';
            bait.style.cssText = 'height: 1px !important; position: absolute; top: -1px; left: -1px;';

            document.body.appendChild(bait);

            // Check after a short delay to let AdBlock process
            setTimeout(() => {
                // If AdBlock is active, the element will have 0 height
                const isBlocked = bait.offsetHeight === 0 || bait.clientHeight === 0;

                setIsAdBlockDetected(isBlocked);
                setIsChecking(false);

                // Clean up bait element
                document.body.removeChild(bait);

                if (isBlocked) {
                    console.log('[AdBlock] Detected - showing support modal');
                } else {
                    console.log('[AdBlock] Not detected');
                }
            }, 100);
        };

        // Run detection after page loads
        detectAdBlock();
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    // Don't render anything while checking or if no AdBlock detected
    if (isChecking || !isAdBlockDetected) {
        return null;
    }

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fadeIn"
                style={{
                    animation: 'fadeIn 0.3s ease-out'
                }}
            >
                {/* Modal Card */}
                <div
                    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideUp"
                    style={{
                        animation: 'slideUp 0.4s ease-out'
                    }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Pulsing glow effect */}
                            <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-50 animate-pulse"></div>

                            {/* Broken heart icon */}
                            <div className="relative bg-gradient-to-br from-red-400 to-pink-500 rounded-full p-6">
                                <Heart size={48} className="text-white" fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                        Please Enable Ads to Support LuckyGen
                    </h2>

                    {/* Body Text */}
                    <p className="text-gray-600 text-center mb-6 leading-relaxed">
                        We keep this tool <span className="font-semibold text-purple-600">100% free</span> and{' '}
                        <span className="font-semibold text-purple-600">server-side rendered</span> thanks to ads.
                    </p>

                    <p className="text-gray-600 text-center mb-8 leading-relaxed">
                        Please disable AdBlock to unlock premium features like{' '}
                        <span className="font-semibold">✨ Themes</span>,{' '}
                        <span className="font-semibold">🗑️ Elimination Mode</span>, and{' '}
                        <span className="font-semibold">🎨 3D Wheel</span>.
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>

                    {/* How to Disable Instructions */}
                    <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                        <p className="text-sm text-purple-900 font-semibold mb-2">
                            💡 Quick Fix:
                        </p>
                        <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
                            <li>Click your AdBlock extension icon</li>
                            <li>Select "Disable on this site" or "Pause"</li>
                            <li>Click the button below to refresh</li>
                        </ol>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleRefresh}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <RefreshCw size={20} />
                        I've Disabled It (Refresh Page)
                    </button>

                    {/* Footer Note */}
                    <p className="text-xs text-gray-400 text-center mt-4">
                        By disabling AdBlock, you're helping us keep LuckyGen free for everyone. Thank you! 💜
                    </p>
                </div>
            </div>

            {/* Keyframe Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
