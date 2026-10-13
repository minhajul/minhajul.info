import type {Experience} from "@/data/experiences";
import CompanyMonogram from "@/components/CompanyMonogram";
import {companyPeriod, groupByCompany} from "@/lib/experience";

type ExperienceSnapshotProps = {
    experiences: Experience[];
};

export default function ExperienceSnapshot({experiences}: ExperienceSnapshotProps) {
    const groups = groupByCompany(experiences);

    return (
        <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {groups.map((group) => (
                <li
                    key={`${group.company}-${group.roles[0].start}`}
                    className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                >
                    <div className="flex items-center gap-4">
                        <CompanyMonogram company={group.company} className="hidden size-9 rounded-lg text-sm sm:flex"/>
                        <div>
                            <p className="font-medium text-foreground">{group.company}</p>
                            <p className="text-sm text-muted">
                                {group.roles.map((role) => role.title).toReversed().join(" → ")}
                            </p>
                        </div>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-subtle">{companyPeriod(group)}</p>
                </li>
            ))}
        </ol>
    );
}
