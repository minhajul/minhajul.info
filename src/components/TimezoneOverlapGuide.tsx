import FaqSection, {type Faq} from "@/components/FaqSection";
import SectionHeading from "@/components/SectionHeading";
import {panel} from "@/lib/styles";

const STEPS = [
    {
        title: "Add the zones",
        body: "Search for a city or IANA zone for each person, up to five. The first row sets the chart's axis, so put yourself there.",
    },
    {
        title: "Set the hours",
        body: "Pick each person's working hours in their own local time. An end before the start, like 22:00–06:00, means a shift that runs past midnight.",
    },
    {
        title: "Read the chart",
        body: "Each bar is one person's day, lined up on the first row's clock. The green column is the time everyone shares, also listed above in each zone's local time.",
    },
];

const FAQS: Faq[] = [
    {
        question: "Why does the date matter?",
        answer: "Daylight saving time moves offsets by an hour on different dates in different countries. New York is 10 hours behind Dhaka in summer but 11 in winter, and Europe and the US switch on different weekends. Pick the date of the meeting and the tool uses the offsets in force that day.",
    },
    {
        question: "What if there's no overlap?",
        answer: "The tool shows how far apart the closest working hours are and how much one person would need to shift to share an hour. Often a small, regular shift on one or two days a week is enough.",
    },
    {
        question: "How much overlap does a remote team need?",
        answer: "Two to three shared hours is plenty for most teams. Keep them for calls, pairing and quick unblocking, and move status updates, reviews and decisions to written, async channels so nobody depends on the overlap to make progress.",
    },
    {
        question: "Can I share a comparison?",
        answer: "Yes. The page address updates as you change zones, hours and date, so “Copy link” gives a link that opens the same comparison, handy for sending to a recruiter or teammate. Nothing is stored anywhere else.",
    },
];

export default function TimezoneOverlapGuide() {
    return (
        <>
            <section>
                <SectionHeading eyebrow="How it works" title="Compare, read, share"/>
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

            <FaqSection faqs={FAQS}/>
        </>
    );
}
