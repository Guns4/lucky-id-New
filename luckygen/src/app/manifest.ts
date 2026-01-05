import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'LuckyGen - Random Wheel Spinner & Decision Maker',
        short_name: 'LuckyGen',
        description: 'Free online spinning wheel for making random decisions. Create custom wheels, spin to decide, and share with friends!',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#A855F7', // Purple brand color
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
        categories: ['entertainment', 'utilities', 'productivity'],
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en-US',
        screenshots: [
            {
                src: '/screenshot-1.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide'
            },
            {
                src: '/screenshot-2.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow'
            }
        ]
    };
}
