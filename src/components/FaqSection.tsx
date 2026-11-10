import {ChevronDownIcon} from "@heroicons/react/20/solid";
import SectionHeading from "@/components/SectionHeading";
import {panel} from "@/lib/styles";

export type Faq = { question: string; answer: string };

/** A tool guide's "Good to know" section, where each question opens to show its answer. */
export default function FaqSection({faqs}: { faqs: Faq[] }) {
    return (
        <section>
            <SectionHeading eyebrow="FAQ" title="Good to know"/>
            <div className={`${panel} divide-y divide-line`}>
                {faqs.map((faq) => (
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
    );
}
