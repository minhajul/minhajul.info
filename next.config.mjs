const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        browserToTerminal: true
    },
    reactCompiler: true,
    experimental: {
        agentUpgrade: 'security',
        // A dev server restored from this cache keeps serving old Tailwind CSS: the cached
        // globals.css doesn't track the component files Tailwind scanned, so new classes are missed.
        turbopackFileSystemCacheForDev: false,
    },
    images: {
        minimumCacheTTL: 86400,
    },
    headers: async () => {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Production only: in dev, CSS and JS are served from fixed URLs, so a day-long
                    // max-age makes the browser keep showing old styles after every edit.
                    ...(isProduction ? [{
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    }] : []),
                    // Security headers
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: https:",
                            "font-src 'self'",
                            "connect-src 'self'",
                            "frame-ancestors 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
