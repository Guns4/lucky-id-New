"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Popunder() {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 10000); // 10 seconds delay

        return () => clearTimeout(timer);
    }, []);

    if (!showAd) return null;

    return (
        <Script
            src="https://pl28297734.effectivegatecpm.com/ec/55/5d/ec555daceecf7cbdfab1fbe5da71ba63.js"
            strategy="afterInteractive"
        />
    );
}
