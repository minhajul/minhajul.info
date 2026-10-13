import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    href?: string;
    linkLabel?: string;
};

export default function SectionHeading({eyebrow, title, href, linkLabel}: SectionHeadingProps) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4">
            <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
            </div>
            {href && (
                <Link
                    href={href}
                    className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                    {linkLabel}
                    <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
                </Link>
            )}
        </div>
    );
}
