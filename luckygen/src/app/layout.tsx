import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}

        {/* Google AdSense - Loaded after page becomes interactive */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5099892029462046"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
