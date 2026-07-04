import "./globals.css";

import {Fira_Code} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL
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

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${firaCode.className} antialiased flex flex-col bg-gray-800`}>
        <Header/>

        {children}

        <Footer/>


        </body>
        </html>
    );
}
