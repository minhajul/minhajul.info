import Link from "next/link";
import type {ComponentType, SVGProps} from "react";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {ClockIcon, GlobeAltIcon, KeyIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import {cronExplainer, jwtDecoder, linkedInPostFormatter, timezoneOverlap, tools} from "@/data/tools";
import {profile} from "@/data/profile";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tools",
    description: `Small, free utilities built by ${profile.name}.`,
}

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Presentation only, keyed by url so the data file stays free of React imports
const DETAILS: Record<string, { icon: Icon; category: string }> = {
    [linkedInPostFormatter.url]: {icon: PencilSquareIcon, category: "Writing"},
    [cronExplainer.url]: {icon: ClockIcon, category: "DevOps"},
    [jwtDecoder.url]: {icon: KeyIcon, category: "Auth"},
    [timezoneOverlap.url]: {icon: GlobeAltIcon, category: "Remote work"},
};

export default function Tools() {
    return (
        <div>
            <Heading
                title="Tools"
                subtitle="Small, free utilities I've built"
            />

            <ul className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
                {tools.map((tool) => {
                    const {icon: ToolIcon, category} = DETAILS[tool.url] ?? {icon: ArrowRightIcon, category: "Utility"};
                    return (
                        <li key={tool.url}>
                            <Card className="flex h-full flex-col">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent">
                                        <ToolIcon aria-hidden="true" className="size-5"/>
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-widest text-subtle">{category}</span>
                                </div>
                                <h2 className="mt-5 text-lg font-semibold text-foreground">
                                    <Link href={tool.url} className="stretched-link">
                                        {tool.title}
                                    </Link>
                                </h2>
                                <p className="mt-2 grow text-sm leading-6 text-muted text-pretty">
                                    {tool.description}
                                </p>
                                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                                    Open tool
                                    <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
                                </span>
                            </Card>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
