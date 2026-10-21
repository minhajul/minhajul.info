import {ChevronDownIcon} from "@heroicons/react/20/solid";
import SectionHeading from "@/components/SectionHeading";
import {panel} from "@/lib/styles";
import {LINKEDIN_CHARACTER_LIMIT} from "@/lib/TiptapTextFormatter";

const STEPS = [
    {
        title: "Write",
        body: "Type or paste your post, then select text and use the toolbar or keyboard shortcuts to make it bold, italic, underlined or struck through.",
    },
    {
        title: "Preview",
        body: "Check the live preview on mobile and desktop. Only the first three lines show before “...more”, so make them count.",
    },
    {
        title: "Copy & post",
        body: "Copy the text and paste it straight into LinkedIn. The formatting comes with it, with no extra steps.",
    },
];

const FAQS = [
    {
        question: "How does the formatting work if LinkedIn doesn't support it?",
        answer: "LinkedIn posts are plain text, so the tool swaps your letters for look-alike Unicode characters, such as 𝗯𝗼𝗹𝗱 and 𝘪𝘵𝘢𝘭𝘪𝘤. They show up formatted anywhere that supports Unicode, including the LinkedIn apps.",
    },
    {
        question: "Is there anything to watch out for?",
        answer: "Formatted characters aren't regular letters, so screen readers may read them poorly and LinkedIn search won't match them. Use formatting to highlight a few key words or a headline rather than whole posts.",
    },
    {
        question: "Why does formatted text use up more characters?",
        answer: `Each bold or italic letter takes two characters, and underline and strikethrough add a mark to every character. The counter includes all of that, so you won't go over LinkedIn's ${LINKEDIN_CHARACTER_LIMIT.toLocaleString("en-US")}-character limit by surprise.`,
    },
    {
        question: "Is my post saved or sent anywhere?",
        answer: "No. Everything runs in your browser, your text never leaves your device, and it's gone when you close the page.",
    },
];

export default function LinkedInFormatterGuide() {
    return (
        <>
            <section>
                <SectionHeading eyebrow="How it works" title="Format, preview, post"/>
                <ol className="grid gap-6 md:grid-cols-3">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className={`${panel} p-5 sm:p-6`}>
                            <span className="font-mono text-xs text-accent">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted text-pretty">{step.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <SectionHeading eyebrow="FAQ" title="Good to know"/>
                <div className={`${panel} divide-y divide-line`}>
                    {FAQS.map((faq) => (
                        <details key={faq.question} className="group px-5 py-4 sm:px-6">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDownIcon aria-hidden="true" className="size-5 shrink-0 text-subtle transition-transform group-open:rotate-180"/>
                            </summary>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted text-pretty">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
