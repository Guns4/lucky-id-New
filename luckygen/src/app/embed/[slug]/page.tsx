import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EmbedPageClient from './EmbedPageClient';

interface EmbedPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
    const { slug } = params;
    const supabase = await createClient();

    const { data: wheel } = await supabase
        .from('wheels')
        .select('title, segments')
        .eq('slug', slug)
        .single();

    if (!wheel) {
        return {
            title: 'Wheel Not Found | LuckyGen',
        };
    }

    const description = `Spin the ${wheel.title} wheel! ${wheel.segments?.length || 0} options to choose from.`;

    return {
        title: `${wheel.title} - Embed | LuckyGen`,
        description,
        robots: {
            index: false, // Don't index embed pages to avoid duplicate content
            follow: true,
        },
    };
}

export default async function EmbedPage({ params }: EmbedPageProps) {
    const { slug } = params;
    const supabase = await createClient();

    // Fetch wheel data from database
    const { data: wheel, error } = await supabase
        .from('wheels')
        .select('id, title, segments, views')
        .eq('slug', slug)
        .single();

    if (error || !wheel) {
        notFound();
    }

    // Increment view count (async, no need to wait)
    supabase
        .from('wheels')
        .update({ views: (wheel.views || 0) + 1 })
        .eq('slug', slug)
        .then();

    return <EmbedPageClient wheel={wheel} slug={slug} />;
}
