import Link from "next/link";
import {buttonPrimary} from "@/lib/styles";

export default function NotFound() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <p className="font-mono text-sm text-accent">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Page not found
            </h1>
            <p className="mt-3 max-w-md text-muted">
                The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link
                href="/"
                className={`mt-8 ${buttonPrimary}`}
            >
                Back to home
            </Link>
        </div>
    );
}
