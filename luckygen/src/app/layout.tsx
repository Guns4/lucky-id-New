import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuckyGen - Random Wheel Spinner & Decision Maker",
  description: "Free online spinning wheel for making random decisions. Create custom wheels, spin to decide, and share with friends!",
  metadataBase: new URL('https://luckygen.click'),
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
