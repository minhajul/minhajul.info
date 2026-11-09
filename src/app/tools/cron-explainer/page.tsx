import Link from "next/link";
import {CheckIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import CronExplainer from "@/components/CronExplainer";
import CronGuide from "@/components/CronGuide";
import {cronExplainer} from "@/data/tools";
import {siteOpenGraph, siteTwitter} from "@/lib/metadata";
import type {Metadata} from "next";

const {title, description, url} = cronExplainer;

export const metadata: Metadata = {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {...siteOpenGraph, title, description, url},
    twitter: {...siteTwitter, title, description},
};

// Parsing and scheduling happen client-side; the expression is never sent anywhere
const HIGHLIGHTS = ["Free", "No sign-up", "Runs in your browser"];

export default function CronExplainerPage() {
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
                <CronExplainer/>
                <CronGuide/>
            </div>
        </div>
    );
}
