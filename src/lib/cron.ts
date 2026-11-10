// Parse, describe and schedule standard 5-field cron expressions. Pure, so it runs anywhere.

export type FieldKey = "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek";

type FieldSpec = {
    key: FieldKey;
    label: string;
    min: number;
    max: number;
    /** Singular noun used in phrases like "every 2nd hour". */
    unit: string;
    /** Three-letter names, indexed from `min`. */
    names?: string[];
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const FIELD_SPECS: FieldSpec[] = [
    {key: "minute", label: "Minute", min: 0, max: 59, unit: "minute"},
    {key: "hour", label: "Hour", min: 0, max: 23, unit: "hour"},
    {key: "dayOfMonth", label: "Day of month", min: 1, max: 31, unit: "day"},
    {key: "month", label: "Month", min: 1, max: 12, unit: "month", names: MONTHS.map(abbreviate)},
    // 0 and 7 are both Sunday
    {key: "dayOfWeek", label: "Day of week", min: 0, max: 7, unit: "day of the week", names: WEEKDAYS.map(abbreviate)},
];

export const MACROS: Record<string, string> = {
    "@yearly": "0 0 1 1 *",
    "@annually": "0 0 1 1 *",
    "@monthly": "0 0 1 * *",
    "@weekly": "0 0 * * 0",
    "@daily": "0 0 * * *",
    "@midnight": "0 0 * * *",
    "@hourly": "0 * * * *",
};

/** One comma-separated piece of a field: `*`, `5`, `1-5`, `*\/15` or `10-30/5`. */
type Part =
    | {kind: "all"; step: number}
    | {kind: "value"; value: number}
    | {kind: "range"; start: number; end: number; step: number};

export type CronField = {
    spec: FieldSpec;
    raw: string;
    parts: Part[];
    values: Set<number>;
    /** Starts with `*`. Real cron uses this to decide how day-of-month and day-of-week combine. */
    star: boolean;
    /** Short meaning for the breakdown, e.g. "every 15th minute". */
    meaning: string;
};

export type Cron = Record<FieldKey, CronField>;

export type ParseResult = {ok: true; cron: Cron; expanded: string} | {ok: false; error: string};

class CronError extends Error {}

export function parseCron(input: string): ParseResult {
    let text = input.trim();
    if (!text) return {ok: false, error: "Enter a cron expression, e.g. */15 * * * *"};

    if (text.startsWith("@")) {
        const macro = text.toLowerCase();
        if (macro === "@reboot") return {ok: false, error: "@reboot runs once at startup, so it has no schedule to explain."};
        if (!MACROS[macro]) return {ok: false, error: `Unknown macro ${text}. Try @yearly, @monthly, @weekly, @daily or @hourly.`};
        text = MACROS[macro];
    }

    const raws = text.split(/\s+/);
    if (raws.length !== 5) {
        const hint = raws.length > 5 ? "Standard cron has no seconds or year field." : "Add the missing fields, or use * for any.";
        return {ok: false, error: `Expected 5 fields, got ${raws.length}. ${hint}`};
    }

    try {
        const fields = FIELD_SPECS.map((spec, i) => parseField(spec, raws[i]));
        const cron = Object.fromEntries(fields.map(field => [field.spec.key, field])) as Cron;
        return {ok: true, cron, expanded: raws.join(" ")};
    } catch (err) {
        if (err instanceof CronError) return {ok: false, error: err.message};
        throw err;
    }
}

const PART_PATTERN = /^(\*|[a-z0-9]+(?:-[a-z0-9]+)?)(?:\/([^/]*))?$/i;

function parseField(spec: FieldSpec, raw: string): CronField {
    const parts = raw.split(",").map(text => parsePart(spec, text));
    const values = new Set<number>();
    for (const part of parts) {
        for (const value of expand(spec, part)) values.add(spec.key === "dayOfWeek" && value === 7 ? 0 : value);
    }
    return {spec, raw, parts, values, star: raw.startsWith("*"), meaning: fieldPhrase(spec, parts)};
}

function parsePart(spec: FieldSpec, text: string): Part {
    const match = PART_PATTERN.exec(text);
    if (!match) {
        if (!text) throw new CronError(`${spec.label} has an empty value; check for a stray comma.`);
        throw new CronError(`${spec.label} has an invalid value "${text}".${quartzHint(text)}`);
    }

    const [, base, stepText] = match;
    let step = 1;
    if (stepText !== undefined) {
        step = /^\d+$/.test(stepText) ? Number(stepText) : NaN;
        if (!(step >= 1)) throw new CronError(`${spec.label} step must be a whole number of at least 1, got "${stepText}".`);
    }

    if (base === "*") return {kind: "all", step};

    const [startText, endText] = base.split("-");
    const start = parseValue(spec, startText);
    if (endText === undefined) {
        // `5/15` means "from 5 to the end of the range, every 15th"
        return stepText === undefined ? {kind: "value", value: start} : {kind: "range", start, end: spec.max, step};
    }

    const end = parseValue(spec, endText);
    if (start > end) throw new CronError(`${spec.label} range ${base} goes backwards; write it as ${endText}-${startText}.`);
    return {kind: "range", start, end, step};
}

function parseValue(spec: FieldSpec, text: string): number {
    const range = spec.names
        ? `${spec.min}–${spec.max} or ${spec.names[0]}–${spec.names[spec.names.length - (spec.key === "dayOfWeek" ? 2 : 1)]}`
        : `${spec.min}–${spec.max}`;

    let value: number;
    if (/^\d+$/.test(text)) {
        value = Number(text);
    } else {
        const index = spec.names?.indexOf(text.toUpperCase()) ?? -1;
        if (index < 0) throw new CronError(`${spec.label} must be ${range}, got "${text}".${quartzHint(text)}`);
        value = index + spec.min;
    }

    if (value < spec.min || value > spec.max) throw new CronError(`${spec.label} must be ${range}, got ${value}.`);
    return value;
}

/** Quartz and Spring cron add `?`, `L`, `W` and `#`; point that out instead of a bare "invalid". */
function quartzHint(text: string) {
    return /[?#]|^L|\d[LW]$/i.test(text) ? " ?, L, W and # are Quartz-only." : "";
}

function expand(spec: FieldSpec, part: Part): number[] {
    if (part.kind === "value") return [part.value];
    const [start, end] = part.kind === "all" ? [spec.min, spec.max] : [part.start, part.end];
    const values = [];
    for (let v = start; v <= end; v += part.step) values.push(v);
    return values;
}

// ---- Plain English ----

function abbreviate(name: string) {
    return name.slice(0, 3).toUpperCase();
}

export function ordinal(n: number) {
    const suffix = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({1: "st", 2: "nd", 3: "rd"}[n % 10] ?? "th");
    return `${n}${suffix}`;
}

function joinList(items: string[]) {
    if (items.length <= 2) return items.join(" and ");
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function formatValue(spec: FieldSpec, value: number) {
    switch (spec.key) {
        case "dayOfMonth":
            return ordinal(value);
        case "month":
            return MONTHS[value - 1];
        case "dayOfWeek":
            return WEEKDAYS[value];
        default:
            return String(value);
    }
}

const isEvery = (part: Part) => part.kind === "all" && part.step === 1;

function partPhrase(spec: FieldSpec, part: Part): string {
    const fmt = (value: number) => formatValue(spec, value);
    // "the 1st", "the 1st through 15th"
    const the = spec.key === "dayOfMonth" ? "the " : "";

    if (part.kind === "value") return `${the}${fmt(part.value)}`;
    const every = part.step === 1 ? `every ${spec.unit}` : `every ${ordinal(part.step)} ${spec.unit}`;
    if (part.kind === "all") return every;

    const span = `${the}${fmt(part.start)} through ${fmt(part.end)}`;
    // Numbers need the unit to make sense: "every hour from 9 through 17"
    const numeric = spec.key === "minute" || spec.key === "hour";
    return part.step === 1 && !numeric ? span : `${every} from ${span}`;
}

/** e.g. "minute 0 and 30", "every 15th minute", "Monday through Friday", "the 1st and 15th". */
function fieldPhrase(spec: FieldSpec, parts: Part[]): string {
    const numeric = spec.key === "minute" || spec.key === "hour";
    if (numeric && parts.every(part => part.kind === "value")) {
        return `${spec.unit} ${joinList(parts.map(part => partPhrase(spec, part)))}`;
    }
    if (spec.key === "dayOfMonth" && parts.every(part => part.kind === "value")) {
        return `the ${joinList(parts.map(part => formatValue(spec, part.value)))}`;
    }
    return joinList(parts.map(part => (numeric && part.kind === "value" ? `${spec.unit} ` : "") + partPhrase(spec, part)));
}

const pad = (n: number) => String(n).padStart(2, "0");

export function describeCron(cron: Cron): string {
    const {minute, hour, dayOfMonth, month, dayOfWeek} = cron;
    const onlyValues = (field: CronField) => field.parts.every(part => part.kind === "value");

    let sentence: string;
    const timeCount = minute.values.size * hour.values.size;
    if (onlyValues(minute) && onlyValues(hour) && timeCount <= 6) {
        // Exact clock times read best: "At 09:00 and 17:30"
        const times = [...hour.values].sort((a, b) => a - b)
            .flatMap(h => [...minute.values].sort((a, b) => a - b).map(m => `${pad(h)}:${pad(m)}`));
        sentence = `At ${joinList(times)}`;
    } else {
        sentence = `At ${minute.meaning}`;
        if (!hour.parts.some(isEvery)) sentence += ` past ${hour.meaning}`;
    }

    const domEvery = dayOfMonth.parts.some(isEvery);
    const dowEvery = dayOfWeek.parts.some(isEvery);
    const monthEvery = month.parts.some(isEvery);
    const domText = `${dayOfMonth.meaning} of the month`;
    if (!dayOfMonth.star && !dayOfWeek.star) {
        // Both restricted: cron runs on days matching either one
        sentence += ` on ${domText} or on ${dayOfWeek.meaning}`;
    } else if (!domEvery && !dowEvery) {
        // One is a stepped `*/n`: cron requires both to match
        sentence += ` on ${domText} that falls on ${dayOfWeek.meaning}`;
    } else if (!domEvery) {
        // "on the 1st of January" reads better than "on the 1st of the month in January"
        return `${sentence} on ${dayOfMonth.meaning} of ${monthEvery ? "the month" : month.meaning}.`;
    } else if (!dowEvery) {
        sentence += ` on ${dayOfWeek.meaning}`;
    }

    if (!monthEvery) sentence += ` in ${month.meaning}`;
    return `${sentence}.`;
}

// ---- Scheduling ----
//
// Matching runs on wall-clock time, held in a Date's UTC fields so DST can't move it. Each match is
// then mapped to the real moments the local clock shows it. Around DST this follows classic cron
// (Vixie, cronie): a fixed-time job whose time is skipped runs once, right after the jump, and in a
// repeated hour only jobs with * in the minute or hour run a second time.

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * MINUTE_MS;
// DST moves clocks by at most a few hours, which bounds how far wall-clock and real order can disagree
const MAX_SHIFT_MS = 3 * 60 * MINUTE_MS;

function dayMatches(cron: Cron, wall: Date) {
    const dom = cron.dayOfMonth.values.has(wall.getUTCDate());
    const dow = cron.dayOfWeek.values.has(wall.getUTCDay());
    // Classic cron: if either field starts with `*` both must match, otherwise either one is enough
    return cron.dayOfMonth.star || cron.dayOfWeek.star ? dom && dow : dom || dow;
}

/** The local wall-clock minute at an instant, as a UTC timestamp. */
function wallAt(instant: number) {
    const d = new Date(instant);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
}

const offsetAt = (instant: number) => -new Date(instant).getTimezoneOffset() * MINUTE_MS;

/** The real instants showing a wall-clock minute: usually one, two in a repeated hour, none in a skipped one. */
function instantsAt(wall: number) {
    // A day either side is past any switch-over near this time, so these are the offsets in play
    const offsets = new Set([offsetAt(wall - DAY_MS), offsetAt(wall + DAY_MS)]);
    return [...offsets].map(offset => wall - offset).filter(instant => wallAt(instant) === wall).sort((a, b) => a - b);
}

/** The moment of the forward jump that skipped a wall-clock minute. */
function jumpPast(wall: number) {
    const after = offsetAt(wall + DAY_MS);
    // Read with the new offset the skipped time lands before the jump, and with the old one after it
    let before = wall - after;
    let past = wall - offsetAt(wall - DAY_MS);
    while (past - before > MINUTE_MS) {
        const mid = before + Math.floor((past - before) / 2 / MINUTE_MS) * MINUTE_MS;
        if (offsetAt(mid) === after) past = mid;
        else before = mid;
    }
    return past;
}

/** Search window for the next runs. Long enough for leap days, short enough to stop on impossible dates like Feb 30. */
export const SEARCH_YEARS = 28;

/** The next `count` run times strictly after `from`, in the runtime's local time zone. */
export function nextRuns(cron: Cron, from: Date, count: number): Date[] {
    const fixedTime = !cron.minute.star && !cron.hour.star;
    const runsAt = (wall: number) => {
        const instants = instantsAt(wall);
        if (!instants.length) return fixedTime ? [jumpPast(wall)] : [];
        return fixedTime ? instants.slice(0, 1) : instants;
    };

    const runs = new Set<number>();
    let stop = Date.UTC(from.getFullYear() + SEARCH_YEARS, 0, 1);
    // Start early: after `from` in a repeated hour, the next run can show an earlier clock time
    let d = new Date(wallAt(from.getTime()) - MAX_SHIFT_MS);

    // Each step jumps to the start of the next month, day, hour or minute, so time always moves forward
    while (d.getTime() < stop) {
        if (!cron.month.values.has(d.getUTCMonth() + 1)) {
            d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
        } else if (!dayMatches(cron, d)) {
            d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
        } else if (!cron.hour.values.has(d.getUTCHours())) {
            d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 1));
        } else {
            if (cron.minute.values.has(d.getUTCMinutes())) {
                for (const instant of runsAt(d.getTime())) if (instant > from.getTime()) runs.add(instant);
                if (runs.size >= count) {
                    // A later clock time can still be an earlier moment, so look a little past the last run needed
                    const last = [...runs].sort((a, b) => a - b)[count - 1];
                    stop = Math.min(stop, wallAt(last) + MAX_SHIFT_MS + MINUTE_MS);
                }
            }
            d = new Date(d.getTime() + MINUTE_MS);
        }
    }
    return [...runs].sort((a, b) => a - b).slice(0, count).map(instant => new Date(instant));
}
