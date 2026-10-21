import type {MetadataRoute} from 'next';
import {tools} from '@/data/tools';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://minhajul.info';

export default function sitemap(): MetadataRoute.Sitemap {
    const toolRoutes = tools.map((tool) => tool.url.slice(1));

    return ['', 'contact', 'projects', 'experiences', 'tools', ...toolRoutes].map((route) => ({
        url: `${BASE_URL}/${route}`.replace(/\/$/, ''),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
