import Script from 'next/script';

interface SchemaMarkupProps {
    url: string;
    title: string;
    description: string;
    datePublished?: string;
    dateModified?: string;
    items?: string[];
    category?: string;
    lang?: string;
    views?: number;
    ratingValue?: number;
    ratingCount?: number;
}

export default function SchemaMarkup({
    url,
    title,
    description,
    datePublished = '2024-01-01',
    dateModified,
    items = [],
    category = 'decision',
    lang = 'en',
    views = 0,
    ratingValue = 4.8,
    ratingCount
}: SchemaMarkupProps) {
    const baseUrl = 'https://luckygen.click';

    // Calculate rating count based on views if not provided
    const calculatedRatingCount = ratingCount || Math.max(50, Math.floor(views * 0.3));

    // Extract breadcrumb path from category
    const breadcrumbItems = [
        {
            position: 1,
            name: 'Home',
            item: `${baseUrl}/${lang}`
        },
        {
            position: 2,
            name: category.charAt(0).toUpperCase() + category.slice(1),
            item: `${baseUrl}/${lang}/explore?category=${category}`
        },
        {
            position: 3,
            name: title,
            item: url
        }
    ];

    // Comprehensive Schema markup
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            // 1. SoftwareApplication Schema (Main)
            {
                "@type": "SoftwareApplication",
                "@id": `${url}#software`,
                "name": `${title} - Free Random Wheel Spinner`,
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Any",
                "url": url,
                "description": description,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "validFrom": datePublished
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": ratingValue.toString(),
                    "ratingCount": calculatedRatingCount,
                    "bestRating": "5",
                    "worstRating": "1",
                    "reviewCount": Math.floor(calculatedRatingCount * 0.7)
                },
                "author": {
                    "@type": "Organization",
                    "name": "LuckyGen",
                    "url": baseUrl
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "LuckyGen",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${baseUrl}/logo.png`
                    }
                },
                "screenshot": `${baseUrl}/images/og-default.png`,
                "featureList": [
                    "Free random wheel spinner",
                    "Customizable wheel options",
                    "Fair and unbiased selection",
                    "Mobile-friendly interface",
                    "Shareable links",
                    "No registration required",
                    "Sound effects and animations",
                    "Elimination mode",
                    "Multiple themes"
                ],
                "softwareVersion": "2.0",
                "datePublished": datePublished,
                "dateModified": dateModified || new Date().toISOString().split('T')[0]
            },

            // 2. BreadcrumbList Schema
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                "itemListElement": breadcrumbItems.map(item => ({
                    "@type": "ListItem",
                    "position": item.position,
                    "name": item.name,
                    "item": item.item
                }))
            },

            // 3. WebPage Schema
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                "url": url,
                "name": `${title} | LuckyGen`,
                "description": description,
                "inLanguage": lang === 'id' ? 'id-ID' : 'en-US',
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": `${baseUrl}/#website`,
                    "url": baseUrl,
                    "name": "LuckyGen - Random Wheel Spinner",
                    "publisher": {
                        "@type": "Organization",
                        "name": "LuckyGen"
                    }
                },
                "breadcrumb": {
                    "@id": `${url}#breadcrumb`
                },
                "potentialAction": {
                    "@type": "UseAction",
                    "target": url,
                    "name": `Spin the ${title} wheel`
                }
            },

            // 4. ItemList Schema (if items provided)
            ...(items.length > 0 ? [{
                "@type": "ItemList",
                "@id": `${url}#itemlist`,
                "name": `${title} Options`,
                "description": `Available options in the ${title} spinner`,
                "numberOfItems": items.length,
                "itemListElement": items.slice(0, 20).map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item
                }))
            }] : [])
        ]
    };

    return (
        <Script
            id="schema-markup"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            strategy="beforeInteractive"
        />
    );
}
