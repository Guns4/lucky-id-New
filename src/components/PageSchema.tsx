"use client";

interface PageSchemaProps {
    name: string;
    description: string;
    url: string;
}

export default function PageSchema({
    name,
    description,
    url,
}: PageSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
