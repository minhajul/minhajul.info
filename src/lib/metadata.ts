import type {Metadata} from "next";
import {profile} from "@/data/profile";
import type {Tool} from "@/data/tools";

// Next replaces a parent's openGraph/twitter object instead of merging it, so any
// segment that sets its own spreads these in to keep the site-wide fields.
export const siteOpenGraph = {
    siteName: profile.name,
    type: "website",
    locale: "en_US",
} satisfies Metadata["openGraph"];

export const siteTwitter = {
    card: "summary_large_image",
    site: "@minhaj_cse",
} satisfies Metadata["twitter"];

/** Title, description, canonical URL and share cards for a tool page. */
export function toolMetadata({title, description, url}: Tool): Metadata {
    return {
        title,
        description,
        alternates: {canonical: url},
        openGraph: {...siteOpenGraph, title, description, url},
        twitter: {...siteTwitter, title, description},
    };
}
