'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/gallery/TemplateCard';
import { LayoutDashboard, Loader2, Plus, Sparkles } from 'lucide-react';
import { WheelSegment } from '@/lib/store/wheelStore';
import { useWheelStore } from '@/lib/store/wheelStore';

interface Wheel {
    id: string;
    title: string;
    slug: string;
    segments: WheelSegment[];
    views: number;
    category: string;
    featured: boolean;
    created_at: string;
}

export default function DashboardPage({ params: { lang } }: { params: { lang: string } }) {
    const [wheels, setWheels] = useState<Wheel[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();
    const { setSegments, setTitle } = useWheelStore();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push(`/${lang}`);
                return;
            }
            setUser(user);
            fetchUserWheels(user.id);
        };
        checkUser();
    }, [lang, router, supabase]);

    const fetchUserWheels = async (userId: string) => {
        const { data, error } = await supabase
            .from('wheels')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setWheels(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this wheel?')) return;

        const { error } = await supabase
            .from('wheels')
            .delete()
            .eq('id', id);

        if (!error) {
            setWheels(wheels.filter(w => w.id !== id));
        }
    };

    const handlePlay = (slug: string) => {
        router.push(`/${lang}/w/${slug}`);
    };

    const handleEdit = (segments: WheelSegment[], title: string) => {
        setSegments(segments);
        setTitle(title);
        router.push(`/${lang}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <Loader2 className="animate-spin mr-2" /> Loading dashboard...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <LayoutDashboard className="text-purple-500" />
                            My Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Manage your saved wheels and creations
                        </p>
                    </div>

                    <button
                        onClick={() => router.push(`/${lang}`)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Create New Wheel
                    </button>
                </div>

                {/* Content */}
                {wheels.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="inline-block p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                            <Sparkles className="text-purple-500 w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No wheels yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            You haven't created any wheels yet. Start spinning and save your first creation!
                        </p>
                        <button
                            onClick={() => router.push(`/${lang}`)}
                            className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                        >
                            Create your first wheel &rarr;
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wheels.map((wheel) => (
                            <div key={wheel.id} className="relative group">
                                <TemplateCard
                                    {...wheel}
                                    lang={lang}
                                    onPlay={handlePlay}
                                    onRemix={handleEdit}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(wheel.id);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                                    title="Delete Wheel"
                                >
                                    <span className="sr-only">Delete</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
