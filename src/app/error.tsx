'use client';

import {useEffect} from 'react';

type ErrorProps = {
    error: Error & {digest?: string};
    reset: () => void;
};

export default function Error({error, reset}: ErrorProps) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <p className="font-mono text-sm text-accent">error</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Something went wrong
            </h1>
            <p className="mt-3 max-w-md text-muted">
                {error?.message || 'An unexpected error occurred'}
            </p>
            <button
                type="button"
                onClick={() => reset()}
                className="mt-8 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-white"
            >
                Try again
            </button>
        </div>
    );
}
