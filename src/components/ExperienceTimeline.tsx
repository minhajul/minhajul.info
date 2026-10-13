import {ChevronDownIcon} from "@heroicons/react/20/solid";
import type {Experience} from "@/data/experiences";
import {companySpan, groupByCompany, splitMetrics} from "@/lib/experience";

const VISIBLE_BULLETS = 3;

function Bullet({text}: { text: string }) {
    return (
        <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-subtle">
            {splitMetrics(text).map((segment, index) =>
                segment.metric
                    ? <strong key={index} className="font-semibold text-foreground">{segment.value}</strong>
                    : segment.value
            )}
        </li>
    );
}

function Role({role, showDate}: { role: Experience; showDate: boolean }) {
    // Collapsing a single bullet behind a toggle isn't worth the extra click.
    const limit = role.description.length > VISIBLE_BULLETS + 1 ? VISIBLE_BULLETS : role.description.length;
    const visible = role.description.slice(0, limit);
    const hidden = role.description.slice(limit);

    return (
        <li className="relative pl-8">
            <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-accent bg-background"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold text-foreground">{role.title}</h3>
                {showDate && <p className="shrink-0 font-mono text-xs text-subtle">{role.date_of_joining}</p>}
            </div>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {visible.map((item) => <Bullet key={item} text={item}/>)}
            </ul>

            {hidden.length > 0 && (
                <details className="group/more mt-2">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded text-sm font-medium text-accent hover:text-foreground [&::-webkit-details-marker]:hidden">
                        <span className="group-open/more:hidden">Show {hidden.length} more</span>
                        <span className="hidden group-open/more:inline">Show less</span>
                        <ChevronDownIcon aria-hidden="true" className="size-4 transition-transform group-open/more:rotate-180"/>
                    </summary>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
                        {hidden.map((item) => <Bullet key={item} text={item}/>)}
                    </ul>
                </details>
            )}
        </li>
    );
}

type ExperienceTimelineProps = {
    experiences: Experience[];
};

export default function ExperienceTimeline({experiences}: ExperienceTimelineProps) {
    const groups = groupByCompany(experiences);

    return (
        <ol className="space-y-6">
            {groups.map((group) => (
                <li key={`${group.company}-${group.roles[0].date_of_joining}`} className="rounded-2xl border border-line bg-surface p-5 sm:p-8 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
                    <div className="flex items-center gap-4 lg:sticky lg:top-24 lg:self-start">
                        <span
                            aria-hidden="true"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-background font-mono text-lg font-semibold text-accent"
                        >
                            {group.company.charAt(0)}
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                <a
                                    href={group.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition-colors"
                                >
                                    {group.company}
                                </a>
                            </h2>
                            <p className="font-mono text-xs text-subtle">{companySpan(group)}</p>
                        </div>
                    </div>

                    <ol className="relative mt-6 space-y-8 lg:mt-0 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-line-strong">
                        {group.roles.map((role) => (
                            <Role key={role.title} role={role} showDate={group.roles.length > 1}/>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
