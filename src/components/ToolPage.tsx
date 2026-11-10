import Link from "next/link";
import type {ReactNode} from "react";
import {CheckIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import type {Tool} from "@/data/tools";

// Every tool works client-side, so nothing typed into one is sent anywhere
const DEFAULT_HIGHLIGHTS = ["Free", "No sign-up", "Runs in your browser"];

type ToolPageProps = {
    tool: Tool;
    /** Badges under the description. */
    highlights?: string[];
    /** The tool, then its guide. */
    children: ReactNode;
};

/** What every tool page shares: a breadcrumb, the title and badges, then the tool and its guide. */
export default function ToolPage({tool, highlights = DEFAULT_HIGHLIGHTS, children}: ToolPageProps) {
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
                    <li aria-current="page" className="text-muted">{tool.title}</li>
                </ol>
            </nav>

            <Heading title={tool.title} subtitle={tool.description}>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {highlights.map((highlight) => (
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

            <div className="space-y-24">{children}</div>
        </div>
    );
}
