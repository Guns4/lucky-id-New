import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

interface GenerateMetadataProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
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
