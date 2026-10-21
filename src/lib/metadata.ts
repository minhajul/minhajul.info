import type {Metadata} from "next";
import {profile} from "@/data/profile";

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
