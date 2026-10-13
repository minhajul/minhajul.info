import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import {tools} from "@/data/tools";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tools",
}

export default function Tools() {
    return (
        <div>
            <Heading
                title="Tools"
                subtitle="Small, free utilities I've built"
            />

            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Card key={tool.url} className="flex h-full flex-col has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
                        <h2 className="font-semibold text-foreground">
                            <Link href={tool.url} className="after:absolute after:inset-0 focus-visible:outline-none">
                                {tool.title}
                            </Link>
                        </h2>
                        <p className="mt-2 grow text-sm leading-6 text-muted">
                            {tool.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                            Open tool
                            <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
                        </span>
                    </Card>
                ))}
            </div>
        </div>
    )
}
