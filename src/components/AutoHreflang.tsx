"use client";

import { usePathname } from "next/navigation";

const SITE_URL = "https://www.luckygen.click";

export default function AutoHreflang() {
    const pathname = usePathname();

    // Guard against null pathname (e.g. during initial server render if not handled slightly differently, though usePathname usually works)
    if (!pathname) return null;

    // remove /en or /id prefix
    const cleanPath = pathname.replace(/^\/(en|id)/, "");

    const enUrl = `${SITE_URL}/en${cleanPath}`;
    const idUrl = `${SITE_URL}/id${cleanPath}`;

    // Adapted for Next.js: simplified return of link tags.
    // Note: ideally these should be in metadata, but this dynamic component approach works for client-side updates.
    return (
        <>
            <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="id" href={idUrl} />
        </>
    );
}
