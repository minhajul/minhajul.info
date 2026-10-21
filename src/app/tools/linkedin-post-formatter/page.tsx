import LinkedInPostFormatter from "@/components/LinkedInPostFormatter";
import {linkedInPostFormatter} from "@/data/tools";
import {profile} from "@/data/profile";
import type {Metadata} from "next";

const {title, description, url} = linkedInPostFormatter;

// Setting openGraph/twitter here replaces the layout's, so restate the shared fields
export const metadata: Metadata = {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
        title,
        description,
        url,
        siteName: profile.name,
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        site: "@minhaj_cse",
    },
};

export default function ToolForLinkedIn() {
    return (
        <div>
            <LinkedInPostFormatter />
        </div>
    );
}
