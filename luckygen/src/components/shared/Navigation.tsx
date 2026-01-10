'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from '@/components/auth/AuthButton';
import LoginModal from '@/components/auth/LoginModal';
import { Menu, X, Compass, Home, LayoutDashboard, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();

    // Check auth state
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session?.user);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    // Base navigation links - always visible
    const baseNavLinks = [
        { href: '/showcase', label: 'Why LuckyGen', icon: Star },
    ];

    // Add Explore and Dashboard only if logged in
    const navLinks = isLoggedIn
        ? [
            ...baseNavLinks,
            { href: '/explore', label: 'Explore', icon: Compass },
            { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
        ]
        : baseNavLinks;

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/' || pathname.match(/^\/[a-z]{2}$/);
        }
        return pathname?.includes(href);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Side: Logo & Navigation */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                                    <img
                                        src="/icon-192x192.png"
                                        alt="LuckyGen Logo"
                                        className="w-full h-full object-contain rounded-full ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/30"
                                    />
                                </div>
                                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent hidden sm:inline-block transition-all duration-300 group-hover:scale-105">
                                    LuckyGen
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${active
                                                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side: Home & Auth & Mobile Menu */}
                        <div className="flex items-center gap-3">
                            {/* Home Button (Desktop) */}
                            <Link
                                href="/"
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                <Home size={18} />
                                Home
                            </Link>

                            {/* Desktop Auth Button */}
                            <div className="hidden md:block">
                                <AuthButton onLoginClick={() => setLoginModalOpen(true)} />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-[#0f172a]/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${active
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-2 border-t border-white/10">
                                <AuthButton onLoginClick={() => {
                                    setMobileMenuOpen(false);
                                    setLoginModalOpen(true);
                                }} />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Login Modal */}
            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </>
    );
}
