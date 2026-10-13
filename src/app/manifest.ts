import type {MetadataRoute} from "next";
import {profile} from "@/data/profile";
import {colors} from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${profile.name} — ${profile.role}`,
        short_name: "Minhaj",
        description: "Full-stack software engineer with advanced knowledge in DevOps",
        start_url: "/",
        display: "standalone",
        background_color: colors.background,
        theme_color: colors.background,
        orientation: "portrait-primary",
        icons: (["any", "maskable"] as const).flatMap((purpose) => [
            {src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose},
            {src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose},
        ]),
        categories: ["portfolio", "technology"],
        lang: "en-US",
    };
}
