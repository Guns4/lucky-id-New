"use client";

interface ToolSchemaProps {
    name: string;
    description: string;
    url: string;
}

export default function ToolSchema({
    name,
    description,
    url,
}: ToolSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        description,
        url,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
