"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {
    ArrowPathRoundedSquareIcon,
    ChatBubbleOvalLeftIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    GlobeAmericasIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {profile} from "@/data/profile";

type Device = "mobile" | "desktop";

// Width of a post card in LinkedIn's feed on each device
const DEVICES: { device: Device, label: string, icon: typeof ComputerDesktopIcon, cardWidth: string }[] = [
    {device: "mobile", label: "Mobile preview", icon: DevicePhoneMobileIcon, cardWidth: "max-w-[390px]"},
    {device: "desktop", label: "Desktop preview", icon: ComputerDesktopIcon, cardWidth: "max-w-[555px]"},
];

const ACTIONS = [
    {label: "Like", icon: HandThumbUpIcon},
    {label: "Comment", icon: ChatBubbleOvalLeftIcon},
    {label: "Repost", icon: ArrowPathRoundedSquareIcon},
    {label: "Send", icon: PaperAirplaneIcon},
];

const PLACEHOLDER = `Start writing and your post will appear here...

You can add #hashtags, links and emojis 🤩

This line will appear below the ...more`;

// Hashtags and links, which LinkedIn highlights
const HIGHLIGHT_PATTERN = /(#[\p{L}\p{N}_]+|https?:\/\/\S+)/u;

function renderBody(text: string) {
    // Splitting on a capture group puts the matches at the odd indexes
    return text.split(HIGHLIGHT_PATTERN).map((part, index) => index % 2 === 1
        ? <span key={index} className="font-semibold text-accent">{part}</span>
        : part);
}

type LinkedInPostPreviewProps = {
    text: string;
};

export default function LinkedInPostPreview({text}: LinkedInPostPreviewProps) {
    const [device, setDevice] = useState<Device>("desktop");
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const bodyRef = useRef<HTMLParagraphElement>(null);

    const body = text || PLACEHOLDER;
    const cardWidth = DEVICES.find(option => option.device === device)?.cardWidth;

    // LinkedIn folds posts after three lines; detect whether the clamped body overflows
    useEffect(() => {
        const element = bodyRef.current;
        if (!element || expanded) return;

        // ResizeObserver reports once on observe, so this measures on every text change,
        // and again whenever the card width changes, e.g. switching device
        const observer = new ResizeObserver(() => {
            setIsTruncated(element.scrollHeight > element.clientHeight + 1);
        });
        observer.observe(element);

        return () => observer.disconnect();
    }, [body, expanded]);

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Post Preview</h2>
                <div className="flex rounded-full border border-line p-0.5">
                    {DEVICES.map(({device: option, label, icon: Icon}) => (
                        <button
                            key={option}
                            type="button"
                            aria-label={label}
                            title={label}
                            aria-pressed={device === option}
                            onClick={() => setDevice(option)}
                            className={`rounded-full px-3 py-1.5 transition-colors ${device === option ? "bg-accent/15 text-accent" : "text-muted hover:text-foreground"}`}
                        >
                            <Icon aria-hidden="true" className="size-4"/>
                        </button>
                    ))}
                </div>
            </div>

            <div className={`@container mx-auto w-full ${cardWidth} rounded-xl border border-line bg-background transition-[max-width] duration-300`}>
                <div className="flex items-start gap-2 px-4 pt-3">
                    <Image
                        src={profile.photo}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 shrink-0 rounded-full bg-surface object-cover object-top"
                    />
                    <div className="min-w-0 text-xs leading-snug">
                        <p className="truncate text-sm font-semibold text-foreground">{profile.name}</p>
                        <p className="truncate text-subtle">{profile.role}</p>
                        <p className="flex items-center gap-1 text-subtle">
                            Now ·
                            <GlobeAmericasIcon aria-hidden="true" className="size-3.5"/>
                        </p>
                    </div>
                </div>

                <div className="relative px-4 pt-3 pb-2 text-sm leading-normal text-foreground/90">
                    <p
                        ref={bodyRef}
                        // Three lines; a height cap rather than line-clamp, which would add its own ellipsis
                        className={`whitespace-pre-wrap break-words ${expanded ? "" : "max-h-[3lh] overflow-hidden"}`}
                    >
                        {renderBody(body)}
                    </p>
                    {isTruncated && (
                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className={`text-subtle hover:text-accent hover:underline ${expanded ? "mt-1" : "absolute right-4 bottom-2 bg-background pl-1"}`}
                        >
                            {expanded ? "show less" : "...more"}
                        </button>
                    )}
                </div>

                <div aria-hidden="true" className="mx-4 flex items-center justify-between border-b border-line py-2 text-xs text-subtle">
                    <span>👍❤️👏 57</span>
                    <span>24 comments · 6 reposts</span>
                </div>
                <div aria-hidden="true" className="flex justify-around px-2 py-1">
                    {/* Stack icon and label when the card is too narrow to fit all four side by side */}
                    {ACTIONS.map(({label, icon: Icon}) => (
                        <span
                            key={label}
                            className={`flex flex-col items-center gap-0.5 rounded-md px-2 py-2 text-xs font-semibold text-subtle ${device === "mobile" ? "" : "@sm:flex-row @sm:gap-1.5"}`}
                        >
                            <Icon className="size-5"/>
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
