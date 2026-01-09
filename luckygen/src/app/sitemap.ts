import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

// Force dynamic rendering for sitemap
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckygen.click';
const LANGUAGES = ['en', 'id', 'es', 'pt', 'hi'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    try {
        // Add homepage for each language
        LANGUAGES.forEach((lang) => {
            sitemapEntries.push({
                url: `${SITE_URL}/${lang}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            });
        });

        // Add static pages first (guaranteed to work)
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

        // Try to fetch wheel data from database
        try {
            const supabase = await createClient();
            const { data: wheels, error } = await supabase
                .from('wheels')
                .select('slug, updated_at')
                .order('created_at', { ascending: false })
                .limit(1000); // Limit to prevent too large sitemaps

            if (!error && wheels && wheels.length > 0) {
                wheels.forEach((wheel) => {
                    LANGUAGES.forEach((lang) => {
                        sitemapEntries.push({
                            url: `${SITE_URL}/${lang}/w/${wheel.slug}`,
                            lastModified: wheel.updated_at ? new Date(wheel.updated_at) : new Date(),
                            changeFrequency: 'weekly',
                            priority: 0.8,
                        });
                    });
                });
            }
        } catch (dbError) {
            // Log error but continue - sitemap will still work with static pages
            console.error('Error fetching wheels for sitemap:', dbError);
        }
    } catch (error) {
        // Fallback: return at minimum the homepage
        console.error('Error generating sitemap:', error);
        return [{
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        }];
    }

    return sitemapEntries;
}
