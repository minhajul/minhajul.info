import Link from "next/link";
import {CheckIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import LinkedInPostFormatter from "@/components/LinkedInPostFormatter";
import LinkedInFormatterGuide from "@/components/LinkedInFormatterGuide";
import {linkedInPostFormatter} from "@/data/tools";
import {siteOpenGraph, siteTwitter} from "@/lib/metadata";
import type {Metadata} from "next";

const {title, description, url} = linkedInPostFormatter;

export const metadata: Metadata = {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {...siteOpenGraph, title, description, url},
    twitter: {...siteTwitter, title, description},
};

// Everything happens client-side; the post is never sent anywhere
const HIGHLIGHTS = ["Free", "No sign-up", "Runs in your browser"];

export default function ToolForLinkedIn() {
    return (
        <div>
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-1.5 text-sm text-subtle">
                    <li>
                        <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
                    </li>
                    <li aria-hidden="true">
                        <ChevronRightIcon className="size-4"/>
                    </li>
                    <li aria-current="page" className="text-muted">{title}</li>
                </ol>
            </nav>

            <Heading title={title} subtitle={description}>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {HIGHLIGHTS.map((highlight) => (
                        <li
                            key={highlight}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-sm text-muted"
                        >
                            <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                            {highlight}
                        </li>
                    ))}
                </ul>
            </Heading>

            <div className="space-y-24">
                <LinkedInPostFormatter/>
                <LinkedInFormatterGuide/>
            </div>
        </div>
    );
}
