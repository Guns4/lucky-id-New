import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ExploreClient from './ExploreClient';

interface Props {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: 'Explore Decision Wheels - LuckyGen Template Library',
        description: 'Browse hundreds of ready-to-use decision wheels. Filter by category, search by topic, and remix any wheel to create your own. Free forever.',
        keywords: 'wheel templates, decision maker templates, random wheel library, spin wheel gallery, wheel categories',
        openGraph: {
            title: 'Explore Wheels - LuckyGen',
            description: 'Browse hundreds of decision wheels by category. Play instantly or remix to create your own.',
            url: `https://luckygen.click/${lang}/explore`,
            type: 'website',
        },
    };
}

export default async function ExplorePage({ params }: Props) {
    const { lang } = await params;
    const supabase = await createClient();

    // Fetch all wheels ordered by featured first, then by views
    const { data: wheels, error } = await supabase
        .from('wheels')
        .select('id, title, slug, segments, views, category, featured')
        .order('featured', { ascending: false })
        .order('views', { ascending: false })
        .limit(100);

    if (error || !wheels) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Unable to Load Wheels</h1>
                    <p className="text-gray-300">Please try again later</p>
                </div>
            </main>
        );
    }

    return <ExploreClient initialWheels={wheels} lang={lang} />;
}
