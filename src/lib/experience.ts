import type {Experience} from "@/data/experiences";

export type CompanyGroup = {
    company: string;
    url: string;
    roles: Experience[];
};

/** Merge consecutive roles at the same company so promotions read as one stint. */
export function groupByCompany(experiences: Experience[]): CompanyGroup[] {
    const groups: CompanyGroup[] = [];
    for (const experience of experiences) {
        const last = groups.at(-1);
        if (last && last.company === experience.company) {
            last.roles.push(experience);
        } else {
            groups.push({company: experience.company, url: experience.url, roles: [experience]});
        }
    }
    return groups;
}

/** "Jul 2023 - Dec 2025" for the earliest and latest roles in a group. */
export function companySpan(group: CompanyGroup): string {
    const end = group.roles[0].date_of_joining.split(" - ")[1];
    const start = group.roles.at(-1)!.date_of_joining.split(" - ")[0];
    return `${start} - ${end}`;
}

const METRIC = /(~?\d+(?:\.\d+)?(?:%|K\+?|M\b|\+))/g;

/** Split text into plain and metric segments, e.g. "reducing costs by ~30%". */
export function splitMetrics(text: string): { value: string; metric: boolean }[] {
    // split() with a capture group puts the captured metrics at odd indices.
    return text
        .split(METRIC)
        .map((value, index) => ({value, metric: index % 2 === 1}))
        .filter((segment) => segment.value !== "");
}
