import "./globals.css";

import {Fira_Code} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';

const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "Portfolio website of Minhajul Islam",
    description: "A full-stack software engineer with advanced knowledge in DevOps.",
    twitter: {
        card: "summary",
        title: "Portfolio website of Minhajul Islam",
        description: "A full-stack software engineer with advanced knowledge in DevOps.",
        site: "@minhaj_cse",
        images: ["/minhajul.jpeg"],
    },
    openGraph: {
        title: "Portfolio website of Minhajul Islam",
        siteName: "A full-stack software engineer with advanced knowledge in DevOps.",
        images: ["/minhajul.jpeg"],
        type: "website",
        locale: "en_US",
    },
    icons: {
        shortcut: "/favicon.ico",
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${firaCode.className} antialiased flex flex-col bg-gray-800`}>
        <Header/>

        {children}

        <Footer/>

        <Analytics/>
        <SpeedInsights/>

        </body>
        </html>
    );
}
