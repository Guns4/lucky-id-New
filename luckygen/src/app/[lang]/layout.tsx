import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    return {
        title: 'LuckyGen - Free Random Wheel Decision Maker | Spin to Decide',
        description: 'Make decisions easy with our free spinning wheel. Perfect for choosing what to eat, random picks, games, and more. No signup required!',
        keywords: 'random wheel, decision maker, spin wheel, random picker, what to eat, lucky wheel, spinner',
        openGraph: {
            title: 'LuckyGen - Spin the Wheel Decision Maker',
            description: 'Free online random wheel spinner for making decisions',
            type: 'website',
            url: `https://luckygen.click/${params.lang}`,
            images: [
                {
                    url: '/images/og-default.png',
                    width: 1200,
                    height: 630,
                    alt: 'LuckyGen Wheel',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'LuckyGen - Spin the Wheel',
            description: 'Free decision-making tool with custom spinning wheel',
        },
    };
}

export default function LangLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
