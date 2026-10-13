import "./globals.css";

import {Geist, Geist_Mono} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type {Metadata} from "next";
import type {ReactNode} from "react";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://minhajul.info"
    ),
    title: {
        default: "Md Minhajul Islam - Portfolio",
        template: "%s | Md Minhajul Islam",
    },
    description: "Full-stack software engineer with advanced knowledge in DevOps. Building scalable applications with PHP, Python, Go, React, Next.js.",
    twitter: {
        card: "summary",
        title: "Md Minhajul Islam - Portfolio",
        description: "Full-stack software engineer with advanced knowledge in DevOps.",
        site: "@minhaj_cse",
        images: ["/profile-pic.png"],
    },
    openGraph: {
        title: "Md Minhajul Islam - Portfolio",
        siteName: "Md Minhajul Islam",
        description: "Full-stack software engineer with advanced knowledge in DevOps.",
        images: ["/profile-pic.png"],
        type: "website",
        locale: "en_US",
    },
    manifest: "/manifest.json",
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Header/>
        <main className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
