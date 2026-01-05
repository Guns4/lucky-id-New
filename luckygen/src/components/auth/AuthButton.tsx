'use client';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, LayoutDashboard, Settings, Heart, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthButtonProps {
    onLoginClick?: () => void;
    variant?: 'default' | 'minimal';
}

export default function AuthButton({ onLoginClick, variant = 'default' }: AuthButtonProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleLoginClick = () => {
        if (onLoginClick) {
            onLoginClick();
        } else {
            router.push('/login');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        router.push('/');
        router.refresh();
    };

    const goToDashboard = () => {
        setDropdownOpen(false);
        router.push('/dashboard');
    };

    const goToSavedWheels = () => {
        setDropdownOpen(false);
        router.push('/dashboard?tab=saved');
    };

    if (loading) {
        return (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" />
        );
    }

    if (!user) {
        return (
            <button
                onClick={handleLoginClick}
                className="group relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] text-white rounded-full font-bold hover:bg-right transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 text-sm overflow-hidden active:scale-95"
            >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <LogIn className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Login</span>
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center gap-2 p-1 pr-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
                {user.user_metadata.avatar_url ? (
                    <div className="relative">
                        <img
                            src={user.user_metadata.avatar_url}
                            alt="Avatar"
                            className="w-9 h-9 rounded-full ring-2 ring-white/30 group-hover:ring-white/60 transition-all"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white/90" />
                    </div>
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white/30 group-hover:ring-white/60 transition-all">
                        <UserIcon size={18} className="text-white" />
                    </div>
                )}
                <span className="text-sm font-semibold text-white hidden sm:inline-block max-w-[120px] truncate">
                    {user.user_metadata.full_name || user.email?.split('@')[0]}
                </span>
            </button>

            {dropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right border border-gray-200/50">
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-200/70 bg-gradient-to-br from-purple-50 to-pink-50">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Signed in as</p>
                            <p className="text-sm font-bold truncate text-gray-900">
                                {user.user_metadata.full_name || user.email}
                            </p>
                            {user.email && user.user_metadata.full_name && (
                                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                            )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            <button
                                onClick={goToDashboard}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <LayoutDashboard size={16} className="text-purple-600" />
                                </div>
                                <span className="font-semibold text-gray-700">My Dashboard</span>
                            </button>

                            <button
                                onClick={goToSavedWheels}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Heart size={16} className="text-pink-600" />
                                </div>
                                <span className="font-semibold text-gray-700">Saved Wheels</span>
                            </button>

                            <button
                                onClick={() => {
                                    setDropdownOpen(false);
                                    router.push('/settings');
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center gap-3 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Settings size={16} className="text-blue-600" />
                                </div>
                                <span className="font-semibold text-gray-700">Settings</span>
                            </button>
                        </div>

                        {/* Logout Button */}
                        <div className="border-t border-gray-200/70 mt-1 pt-1">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all group rounded-b-2xl"
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <LogOut size={16} className="text-red-600" />
                                </div>
                                <span className="font-semibold">Log Out</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
