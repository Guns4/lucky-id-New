'use client';

import { createClient } from '@/lib/supabase/client';
import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type OAuthProvider = 'google' | 'github' | 'facebook' | 'twitter';

interface ProviderConfig {
    name: string;
    icon: string;
    color: string;
    hoverColor: string;
    textColor: string;
}

const providers: Record<OAuthProvider, ProviderConfig> = {
    google: {
        name: 'Google',
        icon: 'https://www.google.com/favicon.ico',
        color: 'bg-white',
        hoverColor: 'hover:bg-gray-50',
        textColor: 'text-gray-700',
    },
    github: {
        name: 'GitHub',
        icon: 'https://github.com/favicon.ico',
        color: 'bg-gray-900',
        hoverColor: 'hover:bg-gray-800',
        textColor: 'text-white',
    },
    facebook: {
        name: 'Facebook',
        icon: 'https://www.facebook.com/favicon.ico',
        color: 'bg-[#1877F2]',
        hoverColor: 'hover:bg-[#0c63d4]',
        textColor: 'text-white',
    },
    twitter: {
        name: 'X (Twitter)',
        icon: 'https://abs.twimg.com/favicons/twitter.3.ico',
        color: 'bg-black',
        hoverColor: 'hover:bg-gray-900',
        textColor: 'text-white',
    },
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [loading, setLoading] = useState<OAuthProvider | null>(null);
    const [error, setError] = useState<string>('');
    const supabase = createClient();
    const router = useRouter();

    // Close modal on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleLogin = async (provider: OAuthProvider) => {
        try {
            setLoading(provider);
            setError('');

            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to sign in. Please try again.');
            setLoading(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Decorative gradient header */}
                <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-gradient" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* Content */}
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-3xl">🎡</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Welcome to LuckyGen
                        </h2>
                        <p className="text-gray-600">
                            Sign in to save your wheels and access them from anywhere
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-in slide-in-from-top-2 duration-200">
                            {error}
                        </div>
                    )}

                    {/* OAuth Providers */}
                    <div className="space-y-3 mb-6">
                        {(Object.entries(providers) as [OAuthProvider, ProviderConfig][]).map(([key, provider]) => (
                            <button
                                key={key}
                                onClick={() => handleLogin(key)}
                                disabled={loading !== null}
                                className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${provider.color} ${provider.hoverColor} ${provider.textColor} border border-gray-200`}
                            >
                                {loading === key ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <img
                                        src={provider.icon}
                                        alt={provider.name}
                                        className="w-5 h-5"
                                    />
                                )}
                                <span>Continue with {provider.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Guest option */}
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                        Continue as Guest
                    </button>

                    {/* Footer */}
                    <p className="mt-6 text-xs text-center text-gray-500">
                        By continuing, you agree to our{' '}
                        <a href="/terms" className="text-purple-600 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-purple-600 hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
}
