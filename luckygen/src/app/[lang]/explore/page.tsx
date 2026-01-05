import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ExploreClient from './ExploreClient';

interface Props {
    params: Promise<{ lang: string }>;
}

// Sample wheels for fallback when database is empty
const SAMPLE_WHEELS = [
    {
        id: 'sample-1',
        title: 'Food Decider',
        slug: 'food-decider',
        segments: [
            { text: 'Pizza', color: '#FF6B6B' },
            { text: 'Burger', color: '#4ECDC4' },
            { text: 'Sushi', color: '#FFD93D' },
            { text: 'Tacos', color: '#6C5CE7' },
            { text: 'Pasta', color: '#A8E6CF' },
            { text: 'Salad', color: '#FF8B94' }
        ],
        views: 1250,
        category: 'food',
        featured: true
    },
    {
        id: 'sample-2',
        title: 'Movie Genre Picker',
        slug: 'movie-genre',
        segments: [
            { text: 'Action', color: '#FF6F91' },
            { text: 'Comedy', color: '#FFA07A' },
            { text: 'Drama', color: '#98D8C8' },
            { text: 'Sci-Fi', color: '#F7DC6F' }
        ],
        views: 890,
        category: 'movies',
        featured: false
    },
    {
        id: 'sample-3',
        title: 'Yes or No Decision',
        slug: 'yes-no',
        segments: [
            { text: 'Yes', color: '#00FF00' },
            { text: 'No', color: '#FF0000' }
        ],
        views: 2100,
        category: 'decisions',
        featured: true
    },
    {
        id: 'sample-4',
        title: 'Game Night Selector',
        slug: 'game-night',
        segments: [
            { text: 'Cards', color: '#BB8FCE' },
            { text: 'Board Game', color: '#85C1E9' },
            { text: 'Video Game', color: '#FF69B4' },
            { text: 'Trivia', color: '#00CED1' }
        ],
        views: 650,
        category: 'games',
        featured: false
    }
];

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

    // Use fetched wheels if available, otherwise use sample wheels
    const displayWheels = (wheels && wheels.length > 0) ? wheels : SAMPLE_WHEELS;

    // Only show error if there's a database error AND no sample data
    if (error && !SAMPLE_WHEELS) {
        console.error('Explore page database error:', error);
        return (
            <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-6xl mb-4">🎡</div>
                    <h1 className="text-4xl font-bold mb-4">Database Connection Issue</h1>
                    <p className="text-gray-300 mb-6">We're having trouble connecting to our database.</p>
                    <a
                        href={`/${lang}`}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                        Create Your Own Wheel
                    </a>
                </div>
            </main>
        );
    }

    return <ExploreClient initialWheels={displayWheels} lang={lang} />;
}
