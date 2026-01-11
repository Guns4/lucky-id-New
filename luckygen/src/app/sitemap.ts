import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap for LuckyGen
 * Helps search engines discover and index your pages
 * 
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://luckygen.click'
    const currentDate = new Date()

    return [
        // Homepage - Highest priority
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },

        // Privacy Policy - Required for AdSense
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // Terms of Service - Required for AdSense
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // Add future pages here as you create them:
        // {
        //   url: `${baseUrl}/about`,
        //   lastModified: currentDate,
        //   changeFrequency: 'monthly',
        //   priority: 0.7,
        // },
        // {
        //   url: `${baseUrl}/contact`,
        //   lastModified: currentDate,
        //   changeFrequency: 'monthly',
        //   priority: 0.6,
        // },
    ]
}
