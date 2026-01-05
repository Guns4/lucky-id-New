'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const CONSENT_KEY = 'luckygen_cookie_consent';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem(CONSENT_KEY);

        if (consent === null) {
            // No consent recorded, show banner after short delay
            const timer = setTimeout(() => {
                setShowBanner(true);
                setIsVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        // Save consent
        localStorage.setItem(CONSENT_KEY, 'accepted');

        // Set cookie for server-side detection (optional)
        document.cookie = 'cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax';

        // Trigger AdSense load
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('cookieConsentAccepted'));
        }

        // Hide banner
        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    const handleDecline = () => {
        // Save declined consent
        localStorage.setItem(CONSENT_KEY, 'declined');

        // Set cookie for server-side detection
        document.cookie = 'cookie_consent=declined; max-age=31536000; path=/; SameSite=Lax';

        // Trigger non-personalized ads (optional)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('cookieConsentDeclined'));
        }

        // Hide banner
        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    const handleClose = () => {
        // Treat close as decline for GDPR compliance
        handleDecline();
    };

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Close banner"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Cookie className="text-white" size={24} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                            🍪 We Value Your Privacy
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            We use cookies and similar technologies to personalize content, analyze traffic, and provide social media features.
                                            By clicking <strong>"Accept"</strong>, you consent to our use of cookies and agree to our{' '}
                                            <Link href="/privacy" className="text-purple-600 hover:underline font-semibold">
                                                Privacy Policy
                                            </Link>
                                            {' '}and{' '}
                                            <Link href="/terms" className="text-purple-600 hover:underline font-semibold">
                                                Terms of Service
                                            </Link>.
                                        </p>

                                        {/* Additional info for GDPR */}
                                        <p className="text-xs text-gray-500 mt-2">
                                            You can change your preferences at any time. Declining will load non-personalized content.
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:flex-shrink-0">
                                        <button
                                            onClick={handleDecline}
                                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 active:scale-95 border border-gray-300"
                                        >
                                            Decline
                                        </button>
                                        <button
                                            onClick={handleAccept}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                                        >
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Helper function to check consent status
export function getCookieConsent(): 'accepted' | 'declined' | null {
    if (typeof window === 'undefined') return null;

    const consent = localStorage.getItem(CONSENT_KEY);
    return consent as 'accepted' | 'declined' | null;
}

// Helper function to reset consent (for testing or user preference changes)
export function resetCookieConsent() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(CONSENT_KEY);
    document.cookie = 'cookie_consent=; max-age=0; path=/';
    window.location.reload();
}
