/** @type {import('next').MetadataRoute.Sitemap} */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://minhajul.info';

export default function sitemap() {
    return ['', 'contact', 'projects', 'experiences', 'tools'].map((route) => ({
        url: `${BASE_URL}/${route}`.replace(/\/$/, ''),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}