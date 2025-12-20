import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AutoHreflang from "@/components/AutoHreflang";
import AutoMeta from "@/components/AutoMeta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFD700",
};

export const metadata: Metadata = {
  title: "LuckyID Generator | Unlock Your Fortune",
  description: "Generate your hoki lucky number and gaming ID with LuckyID Pro. Analyze your luck score and create prosperous patterns.",
  keywords: ["Lucky ID", "Hoki Generator", "Game ID", "Lucky Number", "Gacor", "RTP"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-900 text-gold-100 min-h-screen`}
      >
        <AutoHreflang />
        <AutoMeta />
        {children}
      </body>
    </html>
  );
}
