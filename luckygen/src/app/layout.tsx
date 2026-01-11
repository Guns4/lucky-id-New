import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // ===== BASIC SEO =====
  title: "LuckyGen - Professional Random Wheel & Raffle Generator",
  description: "The ultimate random wheel spinner for giveaways, business raffles, and classroom decisions. Fair, customizable, and certified random results. Perfect for marketers, educators, and event organizers.",
  keywords: [
    "random picker",
    "wheel spin",
    "raffle generator",
    "giveaway tool",
    "business decision maker",
    "online randomizer",
    "educational tools",
    "fair raffle",
    "RNG certified",
    "prize wheel",
    "name picker",
    "team building tool",
    "classroom selector",
    "marketing giveaway",
    "social media contest",
  ],

  // ===== OPEN GRAPH (Facebook, LinkedIn, Slack) =====
  openGraph: {
    title: "LuckyGen - Spin the Wheel Tool",
    description: "Pick winners fairly for your contests and events with LuckyGen. Professional random wheel generator for giveaways, raffles, and business decisions.",
    type: "website",
    url: "https://luckygen.click/",
    siteName: "LuckyGen",
    locale: "en_US",
    images: [
      {
        url: "https://luckygen.click/og-image.png", // TODO: Create 1200x630 image
        width: 1200,
        height: 630,
        alt: "LuckyGen Random Wheel Spinner - Fair Raffle Generator",
        type: "image/png",
      },
    ],
  },

  // ===== TWITTER CARD =====
  twitter: {
    card: "summary_large_image",
    title: "LuckyGen - Professional Random Wheel",
    description: "Fair random wheel spinner for giveaways, raffles, and business decisions. Certified RNG technology.",
    images: ["https://luckygen.click/twitter-image.png"], // TODO: Create 1200x675 image
  },

  // ===== ROBOTS & INDEXING =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== ADDITIONAL META =====
  authors: [{ name: "LuckyGen Team" }],
  creator: "LuckyGen",
  publisher: "LuckyGen",
  metadataBase: new URL('https://luckygen.click'),

  // ===== ADSENSE =====
  other: {
    "google-adsense-account": "ca-pub-5099892029462046"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance Optimization: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-5099892029462046" />

        {/* Google Tag Manager */}
        <GoogleTagManager gtmId="GTM-T9M5VNTT" />

        {/* Google AdSense Script - Optimized Loading */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5099892029462046"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript gtmId="GTM-T9M5VNTT" />

        {children}
      </body>
    </html>
  );
}
