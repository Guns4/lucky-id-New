import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration for LuckyGen
 * Controls search engine crawler access
 * 
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Disallow admin routes if you add them later:
                // disallow: '/admin/',

                // Disallow API routes from indexing (if applicable):
                // disallow: '/api/',
            },
            // You can add specific rules for different bots:
            // {
            //   userAgent: 'Googlebot',
            //   allow: '/',
            //   crawlDelay: 0,
            // },
        ],
        sitemap: 'https://luckygen.click/sitemap.xml',
    }
}
