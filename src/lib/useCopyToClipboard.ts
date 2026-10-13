'use client'

import {useEffect, useRef, useState} from "react";

/** Copy text and expose a `copied` flag that resets after `resetMs`. Throws if the clipboard is unavailable. */
export function useCopyToClipboard(resetMs = 2000) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
    };

    return {copied, copy};
}
