import FaqSection, {type Faq} from "@/components/FaqSection";
import SectionHeading from "@/components/SectionHeading";
import {panel} from "@/lib/styles";

const FIELDS = [
    {name: "Minute", values: "0–59"},
    {name: "Hour", values: "0–23"},
    {name: "Day of month", values: "1–31"},
    {name: "Month", values: "1–12 or JAN–DEC"},
    {name: "Day of week", values: "0–7 or SUN–SAT (0 and 7 are Sunday)"},
];

const SYMBOLS = [
    {symbol: "*", title: "Any value", example: "* in hour", body: "Matches every value of the field."},
    {symbol: ",", title: "List", example: "1,15", body: "Matches each listed value: the 1st and the 15th."},
    {symbol: "-", title: "Range", example: "MON-FRI", body: "Matches every value from the start to the end, inclusive."},
    {symbol: "/", title: "Step", example: "*/15 or 10-30/5", body: "Takes every nth value of the range: minutes 0, 15, 30, 45."},
];

const MACROS = [
    {macro: "@yearly", same: "0 0 1 1 *"},
    {macro: "@monthly", same: "0 0 1 * *"},
    {macro: "@weekly", same: "0 0 * * 0"},
    {macro: "@daily", same: "0 0 * * *"},
    {macro: "@hourly", same: "0 * * * *"},
];

const FAQS: Faq[] = [
    {
        question: "Which time zone are the next runs in?",
        answer: "Your browser's. The machine that runs your job uses its own time zone, which on servers and CI is often UTC, so check it before you rely on a schedule.",
    },
    {
        question: "What if I set both day of month and day of week?",
        answer: "Then a day matches if either field matches, so 0 0 1 * MON runs on the 1st and on every Monday. If either field starts with *, both have to match instead. It's a long-standing cron quirk, and the explainer follows it. Kubernetes CronJobs only count a plain * for this, not a step like */2, so the explainer flags expressions they would read differently.",
    },
    {
        question: "Does it support seconds, L, W, # or ?",
        answer: "No. Those come from Quartz and Spring schedulers, not standard cron. This tool reads the classic five fields used by crontab, Kubernetes CronJobs and GitHub Actions.",
    },
    {
        question: "Is my expression sent anywhere?",
        answer: "No. Parsing and the run times are worked out in your browser.",
    },
];

const code = "rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm text-foreground";

export default function CronGuide() {
    return (
        <>
            <section>
                <SectionHeading eyebrow="Cheat sheet" title="Five fields, left to right"/>
                <dl className={`${panel} divide-y divide-line`}>
                    {FIELDS.map((field, index) => (
                        <div key={field.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:px-6">
                            <dt className="flex items-baseline gap-3 font-medium text-foreground sm:w-48 sm:shrink-0">
                                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                                {field.name}
                            </dt>
                            <dd className="font-mono text-sm text-muted">{field.values}</dd>
                        </div>
                    ))}
                </dl>

                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {SYMBOLS.map((item) => (
                        <li key={item.symbol} className={`${panel} p-5 sm:p-6`}>
                            <span aria-hidden="true" className="font-mono text-2xl text-accent">{item.symbol}</span>
                            <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted text-pretty">
                                <code className={code}>{item.example}</code> {item.body}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className={`${panel} mt-6 p-5 sm:p-6`}>
                    <h3 className="font-semibold text-foreground">Shortcuts</h3>
                    <p className="mt-2 text-sm leading-6 text-muted text-pretty">
                        Most crons accept these in place of the five fields. @annually is the same as @yearly, and
                        @midnight the same as @daily.
                    </p>
                    <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {MACROS.map((item) => (
                            <div key={item.macro} className="rounded-xl border border-line bg-background/40 p-3">
                                <dt className="font-mono text-sm text-accent">{item.macro}</dt>
                                <dd className="mt-1 font-mono text-sm text-muted">{item.same}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <FaqSection faqs={FAQS}/>
        </>
    );
}
