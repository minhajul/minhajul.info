import type {ReactNode} from "react";

type HeadingProps = {
    title: string;
    subtitle: string;
    /** Extra content under the subtitle, e.g. badges. */
    children?: ReactNode;
};

export default function Heading({title, subtitle, children}: HeadingProps) {
    return (
        <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-3 text-lg text-muted text-pretty">{subtitle}</p>
            {children}
        </div>
    )
}
