import { Metadata } from 'next';

/**
 * SEO Metadata for LuckyGen
 * Copy this to your layout.tsx file
 */
export const metadata: Metadata = {
    // ===== BASIC META TAGS =====
    title: 'LuckyGen - Professional Random Wheel & Raffle Generator',
    description: 'The ultimate random wheel spinner for giveaways, business raffles, and classroom decisions. Fair, customizable, and certified random results.',
    keywords: [
        'random picker',
        'wheel spin',
        'raffle generator',
        'giveaway tool',
        'business decision maker',
        'online randomizer',
        'educational tools',
        'fair raffle',
        'RNG certified',
        'prize wheel',
    ],

    // ===== OPEN GRAPH (Facebook, LinkedIn, Slack) =====
    openGraph: {
        title: 'LuckyGen - Spin the Wheel Tool',
        description: 'Pick winners fairly for your contests and events with LuckyGen.',
        type: 'website',
        url: 'https://luckygen.click/',
        siteName: 'LuckyGen',
        locale: 'en_US',
        images: [
            {
                url: 'https://luckygen.click/og-image.png', // Upload your 1200x630 image
                width: 1200,
                height: 630,
                alt: 'LuckyGen Random Wheel Spinner',
                type: 'image/png',
            },
        ],
    },

    // ===== TWITTER CARD =====
    twitter: {
        card: 'summary_large_image',
        title: 'LuckyGen - Professional Random Wheel',
        description: 'Fair random wheel spinner for giveaways, raffles, and business decisions',
        images: ['https://luckygen.click/twitter-image.png'], // Upload your 1200x675 image
        creator: '@YourTwitterHandle', // Optional: Your Twitter handle
        site: '@YourTwitterHandle', // Optional: Your Twitter handle
    },

    // ===== ROBOTS & CRAWLING =====
    robots: {
        index: true, // Allow search engines to index
        follow: true, // Allow search engines to follow links
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // ===== VERIFICATION CODES =====
    verification: {
        google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE', // Get from Google Search Console
        // yandex: 'YOUR_YANDEX_CODE',
        // other: {
        //   'msvalidate.01': 'YOUR_BING_CODE',
        // },
    },

    // ===== ADDITIONAL META =====
    authors: [{ name: 'LuckyGen Team' }],
    creator: 'LuckyGen',
    publisher: 'LuckyGen',
    formatDetection: {
        telephone: false, // Don't auto-detect phone numbers
        email: false,
        address: false,
    },

    // ===== ICONS & MANIFEST =====
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',

    // ===== ALTERNATE LANGUAGES (Optional) =====
    // alternates: {
    //   canonical: 'https://luckygen.click/',
    //   languages: {
    //     'es-ES': 'https://luckygen.click/es',
    //     'fr-FR': 'https://luckygen.click/fr',
    //   },
    // },
};

export default metadata;
