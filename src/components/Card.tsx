import type { ReactNode } from "react"

type CardProps = {
    children: ReactNode;
    className?: string;
    padded?: boolean;
};

export default function Card({ children, className = "", padded = true }: CardProps) {
    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong hover:bg-surface-hover has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent ${padded ? "p-5 sm:p-6" : ""} ${className}`}
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
            />
            {children}
        </article>
    );
}
