'use client';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, LayoutDashboard, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthButton() {
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

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
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

    if (loading) {
        return (
            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
        );
    }

    if (!user) {
        return (
            <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-white text-purple-900 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm"
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                />
                Login
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
            >
                {user.user_metadata.avatar_url ? (
                    <img
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <UserIcon size={16} className="text-white" />
                    </div>
                )}
            </button>

            {dropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs font-bold text-gray-500">Signed in as</p>
                            <p className="text-sm font-semibold truncate">
                                {user.user_metadata.full_name || user.email}
                            </p>
                        </div>

                        <button
                            onClick={goToDashboard}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                        >
                            <LayoutDashboard size={16} />
                            My Dashboard
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
