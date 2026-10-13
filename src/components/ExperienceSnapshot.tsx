import type {Experience} from "@/data/experiences";
import {companySpan, groupByCompany} from "@/lib/experience";

type ExperienceSnapshotProps = {
    experiences: Experience[];
};

export default function ExperienceSnapshot({experiences}: ExperienceSnapshotProps) {
    const groups = groupByCompany(experiences);

    return (
        <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {groups.map((group) => (
                <li
                    key={`${group.company}-${group.roles[0].date_of_joining}`}
                    className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                >
                    <div className="flex items-center gap-4">
                        <span
                            aria-hidden="true"
                            className="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-background font-mono text-sm font-semibold text-accent sm:flex"
                        >
                            {group.company.charAt(0)}
                        </span>
                        <div>
                            <p className="font-medium text-foreground">{group.company}</p>
                            <p className="text-sm text-muted">
                                {group.roles.map((role) => role.title).toReversed().join(" → ")}
                            </p>
                        </div>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-subtle">{companySpan(group)}</p>
                </li>
            ))}
        </ol>
    );
}
