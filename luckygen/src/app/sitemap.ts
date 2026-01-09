import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckygen.click';
const LANGUAGES = ['en', 'id', 'es', 'pt', 'hi'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient();

    // Fetch all wheel slugs from database
    const { data: wheels } = await supabase
        .from('wheels')
        .select('slug, updated_at')
        .order('created_at', { ascending: false });

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add homepage for each language
    LANGUAGES.forEach((lang) => {
        sitemapEntries.push({
            url: `${SITE_URL}/${lang}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });
    });

    // Add all wheel pages for each language
    if (wheels) {
        wheels.forEach((wheel) => {
            LANGUAGES.forEach((lang) => {
                sitemapEntries.push({
                    url: `${SITE_URL}/${lang}/w/${wheel.slug}`,
                    lastModified: new Date(wheel.updated_at),
                    changeFrequency: 'weekly',
                    priority: 0.8,
                });
            });
        });
    }

    // Add static pages
    const staticPages = ['about', 'privacy', 'terms', 'contact', 'explore'];
    staticPages.forEach((page) => {
        LANGUAGES.forEach((lang) => {
            sitemapEntries.push({
                url: `${SITE_URL}/${lang}/${page}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            });
        });
    });

    return sitemapEntries;
}
