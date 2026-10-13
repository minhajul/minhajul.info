'use client'

import {useState} from "react";
import {CheckIcon, Square2StackIcon} from "@heroicons/react/20/solid";
import {EMAIL} from "@/components/SocialLinks";

export default function CopyEmailButton() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
        >
            {copied
                ? <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                : <Square2StackIcon aria-hidden="true" className="size-4"/>}
            <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
        </button>
    );
}
