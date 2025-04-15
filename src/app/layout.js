import "./globals.css";

export const metadata = {
    title: "Portfolio website of Minhajul Islam",
    description: "A full-stack developer at Genofax",
    twitter: {
        card: "summary",
        title: "Minhajul Islam",
        description: "A full-stack developer at Genofax",
        site: "@minhaj_cse",
        images: ["/minhajul.jpeg"],
    },
    openGraph: {
        title: "Minhajul Islam",
        siteName: "A full-stack developer at Genofax",
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
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
