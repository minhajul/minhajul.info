'use client'

import {CheckIcon, Square2StackIcon} from "@heroicons/react/20/solid";
import {EMAIL} from "@/data/social";
import {buttonSecondary} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";

export default function CopyEmailButton() {
    const {copied, copy} = useCopyToClipboard();

    const handleClick = () => {
        copy(EMAIL).catch(() => {
            window.location.href = `mailto:${EMAIL}`;
        });
    };

    return (
        <button type="button" onClick={handleClick} className={buttonSecondary}>
            {copied
                ? <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                : <Square2StackIcon aria-hidden="true" className="size-4"/>}
            <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
        </button>
    );
}
