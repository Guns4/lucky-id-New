'use client';

import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Sparkles, Zap, Shield, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

const features = [
    {
        icon: Sparkles,
        title: 'Save Your Wheels',
        description: 'Create and save unlimited custom wheels for any occasion',
    },
    {
        icon: Zap,
        title: 'Access Anywhere',
        description: 'Your wheels sync across all your devices automatically',
    },
    {
        icon: Users,
        title: 'Share with Friends',
        description: 'Share your wheels with anyone via a simple link',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data is encrypted and protected with industry standards',
    },
];

export default function LoginPage() {
    const [loading, setLoading] = useState<OAuthProvider | null>(null);
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.push('/dashboard');
            }
        };
        checkUser();
    }, [supabase, router]);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Animated background patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Left Side - Branding & Features */}
            <div className="relative flex-1 flex flex-col justify-center p-8 lg:p-16 text-white">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group w-fit"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                    <span className="font-semibold">Back to Home</span>
                </Link>

                {/* Logo & Title */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
                            <span className="text-4xl">🎡</span>
                        </div>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-2">LuckyGen</h1>
                            <p className="text-xl text-white/80">Your Ultimate Decision Maker</p>
                        </div>
                    </div>
                    <p className="text-lg text-white/70 max-w-xl">
                        Join thousands of users making better decisions with our powerful spinning wheel generator.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                                    <Icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-white/70">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative flex-1 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden">
                        {/* Decorative gradient */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-gradient" />

                        {/* Header */}
                        <div className="text-center mb-8 mt-4">
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-600">
                                Sign in to continue your journey
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
                        <Link
                            href="/"
                            className="block w-full px-6 py-3 text-center text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            Continue as Guest
                        </Link>

                        {/* Footer */}
                        <p className="mt-6 text-xs text-center text-gray-500">
                            By continuing, you agree to our{' '}
                            <Link href="/terms" className="text-purple-600 hover:underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-purple-600 hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    {/* Additional text */}
                    <p className="text-center mt-6 text-white/80">
                        New to LuckyGen?{' '}
                        <Link href="/" className="text-white font-bold hover:underline">
                            Try it for free
                        </Link>
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
                .delay-500 {
                    animation-delay: 500ms;
                }
                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}
