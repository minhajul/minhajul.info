'use client';

import {useEffect} from 'react';

export default function Error({error, reset}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
                Something went wrong
            </h2>
            <p className="text-slate-300 mb-6">
                {error?.message || 'An unexpected error occurred'}
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
                Try again
            </button>
        </div>
    );
}