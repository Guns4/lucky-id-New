import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { incrementWheelViews } from '@/lib/supabase/queries';
import WheelPageClient from './WheelPageClient';

interface Props {
    params: Promise<{ slug: string; lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, lang } = await params;
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

    const segmentList = wheel.segments.map((s: any) => s.text).join(', ');
    const description = `Spin to decide: ${segmentList}. Free random wheel spinner.`;

    return {
        title: `${wheel.title} - Spin the Wheel | LuckyGen`,
        description,
        keywords: `${wheel.title}, random wheel, decision maker, spin wheel, ${segmentList}, random picker`,
        openGraph: {
            title: `${wheel.title} | LuckyGen`,
            description,
            url: `https://luckygen.click/${lang}/w/${slug}`,
            type: 'website',
            images: [
                {
                    url: '/images/og-default.png',
                    width: 1200,
                    height: 630,
                    alt: wheel.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${wheel.title} | LuckyGen`,
            description,
        },
        alternates: {
            canonical: `https://luckygen.click/${lang}/w/${slug}`,
        },
    };
}

export default async function SharedWheelPage({ params }: Props) {
    const { slug, lang } = await params;
    const supabase = await createClient();

    const { data: wheel, error } = await supabase
        .from('wheels')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !wheel) {
        notFound();
    }

    // Increment view count (fire and forget)
    incrementWheelViews(slug);

    return (
        <WheelPageClient
            initialWheel={{
                id: wheel.id,
                title: wheel.title,
                segments: wheel.segments,
                views: wheel.views || 0,
            }}
            lang={lang}
        />
    );
}
