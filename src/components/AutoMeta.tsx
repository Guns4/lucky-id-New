"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SITE_NAME = "LuckyGen";
const DOMAIN = "https://www.luckygen.click";

type MetaData = {
    title: string;
    description: string;
};

const metaMap: Record<string, MetaData> = {
    "/": {
        title: "LuckyGen – Lucky ID & Beautiful Number Generator",
        description:
            "Generate lucky IDs, beautiful numbers, and attractive numeric patterns for global users. Fast, free, and mobile-friendly.",
    },
    "/en": {
        title: "LuckyGen Global – Lucky Number & ID Generator",
        description:
            "Generate lucky numbers, IDs, and beautiful numeric patterns used worldwide. Free online generator.",
    },
    "/id": {
        title: "LuckyGen Indonesia – Generator ID Hoki & Nominal Cantik",
        description:
            "Generator angka hoki dan nominal cantik populer di Indonesia. Gratis, cepat, dan mudah digunakan.",
    },
    "/privacy-policy": {
        title: "Privacy Policy | LuckyGen",
        description:
            "Privacy policy and data usage information for LuckyGen website.",
    },
    "/terms-of-service": {
        title: "Terms of Service | LuckyGen",
        description:
            "Terms and conditions governing the use of LuckyGen services.",
    },
    "/about-us": {
        title: "About Us | LuckyGen",
        description:
            "Learn more about LuckyGen, our mission, and our global tools.",
    },
    "/contact": {
        title: "Contact | LuckyGen",
        description:
            "Contact LuckyGen support and business inquiries.",
    },
};

function buildFallbackMeta(pathname: string): MetaData {
    const cleanPath = pathname
        .replace(/^\/seo\//, "")
        .replace(/\//g, " ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .trim();

    return {
        title: `LuckyGen – ${cleanPath || "Home"}`,
        description:
            "LuckyGen provides lucky number generators, ID tools, and beautiful numeric patterns for global users.",
    };
}

export default function AutoMeta() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;

        const meta = metaMap[pathname] || buildFallbackMeta(pathname);
        const canonical = pathname === "/" ? `${DOMAIN}/en` : `${DOMAIN}${pathname}`;

        // Update Title
        document.title = meta.title;

        // Update Meta Tags Helper
        const updateMeta = (selector: string, attribute: string, value: string) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                // Extract attribute name and value from selector for creation if possible, 
                // but standard 'name' or 'property' logic is easier to handle manually if strictly needed.
                // For simplicity, we assume we find them or create standard ones.
                // Simple creation logic:
                if (selector.includes("[name='")) element.setAttribute('name', selector.split("'")[1]);
                if (selector.includes("[property='")) element.setAttribute('property', selector.split("'")[1]);
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // Standard SEO
        updateMeta("meta[name='description']", "content", meta.description);

        // Canonical
        let linkCanonical = document.querySelector("link[rel='canonical']");
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonical);

        // Open Graph
        updateMeta("meta[property='og:title']", "content", meta.title);
        updateMeta("meta[property='og:description']", "content", meta.description);
        updateMeta("meta[property='og:url']", "content", canonical);
        updateMeta("meta[property='og:site_name']", "content", SITE_NAME);
        updateMeta("meta[property='og:type']", "content", "website");

        // Twitter
        updateMeta("meta[name='twitter:card']", "content", "summary_large_image");
        updateMeta("meta[name='twitter:title']", "content", meta.title);
        updateMeta("meta[name='twitter:description']", "content", meta.description);

    }, [pathname]);

    return null;
}
