type HeadingProps = {
    title: string;
    subtitle: string;
};

export default function Heading({title, subtitle}: HeadingProps) {
    return (
        <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-3 text-lg text-muted text-pretty">{subtitle}</p>
        </div>
    )
}
