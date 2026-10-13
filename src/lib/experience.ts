import type {Experience} from "@/data/experiences";

export type CompanyGroup = {
    company: string;
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
            groups.push({company: experience.company, roles: [experience]});
        }
    }
    return groups;
}

const MONTH = new Intl.DateTimeFormat("en-US", {month: "short", year: "numeric", timeZone: "UTC"});

/** "2014-11" → "Nov 2014" */
function formatMonth(yearMonth: string) {
    return MONTH.format(new Date(`${yearMonth}-01T00:00:00Z`));
}

/** "Nov 2014 - May 2015", or "Jan 2026 - Present" when there is no end. */
export function formatPeriod(start: string, end?: string) {
    return `${formatMonth(start)} - ${end ? formatMonth(end) : "Present"}`;
}

/** Earliest start to latest end across a company's roles ("YYYY-MM" strings sort chronologically). */
export function companyPeriod(group: CompanyGroup) {
    const start = group.roles.map((role) => role.start).sort()[0];
    const current = group.roles.some((role) => !role.end);
    const end = current ? undefined : group.roles.map((role) => role.end!).sort().at(-1);
    return formatPeriod(start, end);
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
