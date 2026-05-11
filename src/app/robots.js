/** @type {import('next').MetadataRoute.Robots} */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://minhajul.info';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}