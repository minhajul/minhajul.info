type CompanyMonogramProps = {
    company: string;
    className: string;
};

export default function CompanyMonogram({company, className}: CompanyMonogramProps) {
    return (
        <span
            aria-hidden="true"
            className={`shrink-0 items-center justify-center border border-line bg-background font-mono font-semibold text-accent ${className}`}
        >
            {company.charAt(0)}
        </span>
    );
}
