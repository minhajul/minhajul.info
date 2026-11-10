// Pure time zone math for the Time Zone Overlap Finder. Everything goes through Intl,
// so offsets (and DST) are correct for whichever date is being compared.

export const MINUTES_PER_DAY = 24 * 60;
const MINUTE = 60_000;

/** Minutes after local midnight. If `end` <= `start` the shift crosses midnight; equal means all day. */
export type WorkHours = { start: number; end: number };

/** A half-open span of UTC milliseconds. */
export type Interval = { start: number; end: number };

export type Person = { timeZone: string; hours: WorkHours };

/** The smallest change to one person's hours that gives everyone a shared window. */
export type NearMiss = {
    person: number;
    /** Positive means start later, negative means start earlier. */
    shiftMinutes: number;
    /** Distance between their hours and everyone else's shared hours. */
    gapMinutes: number;
    /** The overlap the shift would create (up to an hour). */
    overlapMinutes: number;
};

export type OverlapResult = {
    /** The chosen date in the first person's zone: the chart's x-axis. */
    axis: Interval;
    /** Each person's working hours, clipped to the axis. */
    rows: Interval[][];
    /** Hours everyone shares, clipped to the axis. */
    bands: Interval[];
    /** Full shared windows for the chosen day (not clipped). */
    windows: Interval[];
    totalMinutes: number;
    /** Best suggestions when there is no overlap, smallest shift first (one per person who could fix it). */
    nearMisses: NearMiss[];
};

const formatters = new Map<string, Intl.DateTimeFormat>();

function partsIn(timeZone: string, instant: number) {
    let formatter = formatters.get(timeZone);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hourCycle: "h23",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        formatters.set(timeZone, formatter);
    }
    const parts: Record<string, number> = {};
    for (const part of formatter.formatToParts(instant)) {
        if (part.type !== "literal") parts[part.type] = Number(part.value);
    }
    return parts as Record<"year" | "month" | "day" | "hour" | "minute" | "second", number>;
}

// Chrome (via ICU) still reports these zones by their old names, so "Kolkata" would show
// as "Calcutta" and searching for it would find nothing. Intl accepts both spellings.
const MODERN_NAMES: Record<string, string> = {
    "Asia/Calcutta": "Asia/Kolkata",
    "Asia/Saigon": "Asia/Ho_Chi_Minh",
    "Asia/Katmandu": "Asia/Kathmandu",
    "Asia/Rangoon": "Asia/Yangon",
    "Asia/Dacca": "Asia/Dhaka",
    "Asia/Thimbu": "Asia/Thimphu",
    "Asia/Ulan_Bator": "Asia/Ulaanbaatar",
    "Asia/Ujung_Pandang": "Asia/Makassar",
    "Europe/Kiev": "Europe/Kyiv",
    "America/Godthab": "America/Nuuk",
    "Atlantic/Faeroe": "Atlantic/Faroe",
    "Pacific/Truk": "Pacific/Chuuk",
    "Pacific/Ponape": "Pacific/Pohnpei",
    "Pacific/Enderbury": "Pacific/Kanton",
};

function modernName(timeZone: string) {
    const modern = MODERN_NAMES[timeZone];
    if (!modern) return timeZone;
    try {
        new Intl.DateTimeFormat("en-US", {timeZone: modern});
        return modern;
    } catch {
        return timeZone;
    }
}

/** The current spelling of a zone name, or null if it isn't a valid zone. */
export function canonicalTimeZone(timeZone: string) {
    try {
        return modernName(new Intl.DateTimeFormat("en-US", {timeZone}).resolvedOptions().timeZone);
    } catch {
        return null;
    }
}

/** All IANA zones the runtime knows under their current names, plus UTC (some engines leave it out). */
export function listTimeZones(): string[] {
    const zones = new Set(Intl.supportedValuesOf("timeZone").map(modernName));
    zones.add("UTC");
    return [...zones];
}

/** The zone's offset from UTC at an instant, in minutes (Dhaka is 360). */
export function offsetMinutes(timeZone: string, instant: number) {
    const p = partsIn(timeZone, instant);
    const wallAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    return Math.round((wallAsUtc - (instant - (instant % 1000))) / MINUTE);
}

/** "2026-03-08" plus `days`, as a date string. */
export function addDays(date: string, days: number) {
    const [y, m, d] = date.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
// Date.UTC reads years 0–99 as 1900–1999, so keep well clear of them
export const MIN_DATE = "1900-01-01";
export const MAX_DATE = "2199-12-31";

/** A real "YYYY-MM-DD" calendar date the math here can handle: no Feb 30th, no 5-digit years. */
export function isValidDate(date: string) {
    // Rolling Feb 30th through Date.UTC gives Mar 2nd, so a real date is one that survives the round trip
    return DATE_PATTERN.test(date) && date >= MIN_DATE && date <= MAX_DATE && addDays(date, 0) === date;
}

/** The local date ("YYYY-MM-DD") of an instant in a zone. */
export function localDate(timeZone: string, instant: number) {
    const p = partsIn(timeZone, instant);
    return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

/**
 * The UTC instant of a wall-clock time in a zone. `minutes` past 1440 roll into the next day.
 * Times skipped by a DST jump resolve to the instant just after the jump.
 */
export function zonedToUtc(timeZone: string, date: string, minutes: number) {
    const [y, m, d] = date.split("-").map(Number);
    const wall = Date.UTC(y, m - 1, d) + minutes * MINUTE;
    const guess = wall - offsetMinutes(timeZone, wall) * MINUTE;
    return wall - offsetMinutes(timeZone, guess) * MINUTE;
}

export function shiftLength({start, end}: WorkHours) {
    return (end - start + MINUTES_PER_DAY) % MINUTES_PER_DAY || MINUTES_PER_DAY;
}

/** A person's working hours on local dates around `date`, merged where they touch. */
function workIntervals({timeZone, hours}: Person, date: string, days: number[]): Interval[] {
    const merged: Interval[] = [];
    for (const day of days) {
        const local = addDays(date, day);
        const interval = {
            start: zonedToUtc(timeZone, local, hours.start),
            end: zonedToUtc(timeZone, local, hours.start + shiftLength(hours)),
        };
        const last = merged.at(-1);
        if (last && interval.start <= last.end) last.end = Math.max(last.end, interval.end);
        else merged.push(interval);
    }
    return merged;
}

export function intersect(a: Interval[], b: Interval[]): Interval[] {
    const out: Interval[] = [];
    for (const x of a) {
        for (const y of b) {
            const start = Math.max(x.start, y.start);
            const end = Math.min(x.end, y.end);
            if (start < end) out.push({start, end});
        }
    }
    return out.sort((p, q) => p.start - q.start);
}

const intersectAll = (sets: Interval[][]) => sets.reduce((acc, set) => intersect(acc, set));
const clip = (intervals: Interval[], axis: Interval) => intersect(intervals, [axis]);
const length = (i: Interval) => (i.end - i.start) / MINUTE;

// Zones can be up to 26 hours apart, so look two days either side of the chosen date
const AROUND = [-2, -1, 0, 1, 2];
const NEAR_MISS_TARGET = 60;

function nearMisses(sets: Interval[][]): NearMiss[] {
    const best: NearMiss[] = [];
    sets.forEach((own, person) => {
        if (sets.length < 2) return;
        const others = intersectAll(sets.filter((_, i) => i !== person));
        let pick: NearMiss | undefined;
        for (const a of own) {
            for (const t of others) {
                const overlap = Math.min(NEAR_MISS_TARGET, length(a), length(t));
                let gap: number;
                let direction: number;
                if (a.end <= t.start) [gap, direction] = [(t.start - a.end) / MINUTE, 1];
                else if (a.start >= t.end) [gap, direction] = [(a.start - t.end) / MINUTE, -1];
                else continue;
                const candidate = {person, shiftMinutes: direction * (gap + overlap), gapMinutes: gap, overlapMinutes: overlap};
                if (!pick || Math.abs(candidate.shiftMinutes) < Math.abs(pick.shiftMinutes)) pick = candidate;
            }
        }
        if (pick) best.push(pick);
    });
    return best.sort((p, q) => Math.abs(p.shiftMinutes) - Math.abs(q.shiftMinutes));
}

/** Compare everyone's working hours on `date` ("YYYY-MM-DD"), laid out on the first person's day. */
export function findOverlap(people: Person[], date: string): OverlapResult {
    const axisZone = people[0].timeZone;
    const axis = {start: zonedToUtc(axisZone, date, 0), end: zonedToUtc(axisZone, addDays(date, 1), 0)};
    const sets = people.map(person => workIntervals(person, date, AROUND));
    const shared = intersectAll(sets);

    // A shared window counts for the day it starts on; one spilling in from the day before
    // (e.g. a night shift on the first row) is used only when nothing starts on this day.
    const startingToday = shared.filter(w => w.start >= axis.start && w.start < axis.end);
    const windows = startingToday.length ? startingToday : shared.filter(w => w.end > axis.start && w.start < axis.end);
    const totalMinutes = windows.reduce((sum, w) => sum + length(w), 0);

    return {
        axis,
        rows: sets.map(set => clip(set, axis)),
        bands: clip(shared, axis),
        windows,
        totalMinutes,
        nearMisses: windows.length ? [] : nearMisses(sets),
    };
}

// --- Formatting ---------------------------------------------------------------

/** "Asia/Kolkata" → "Kolkata", "America/Argentina/Buenos_Aires" → "Buenos Aires". */
export function cityName(timeZone: string) {
    return (timeZone.split("/").at(-1) ?? timeZone).replace(/_/g, " ");
}

/** 330 → "UTC+5:30", -240 → "UTC-4". */
export function formatOffset(minutes: number) {
    const sign = minutes < 0 ? "-" : "+";
    const abs = Math.abs(minutes);
    const rest = abs % 60;
    return `UTC${sign}${Math.floor(abs / 60)}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
}

/** 570 → "09:30". Wraps past midnight. */
export function formatClock(minutes: number) {
    const m = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** The wall-clock time ("HH:MM") of an instant in a zone. */
export function formatTimeIn(timeZone: string, instant: number) {
    const p = partsIn(timeZone, instant);
    return formatClock(p.hour * 60 + p.minute);
}

/** 150 → "2 h 30 m", 120 → "2 h", 45 → "45 m". */
export function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    if (!h) return `${m} m`;
    return m ? `${h} h ${m} m` : `${h} h`;
}

// --- Shareable URL state ------------------------------------------------------

const HOURS_PATTERN = /^(\d{2})(\d{2})-(\d{2})(\d{2})$/;

const toParam = (minutes: number) => formatClock(minutes).replace(":", "");

function parseHours(value: string | undefined): WorkHours | null {
    const match = value?.match(HOURS_PATTERN);
    if (!match) return null;
    const [h1, m1, h2, m2] = match.slice(1).map(Number);
    if (h1 > 23 || h2 > 23 || m1 > 59 || m2 > 59) return null;
    return {start: h1 * 60 + m1, end: h2 * 60 + m2};
}

/** `?tz=Asia/Dhaka,America/New_York&hours=0900-1700,0900-1700&date=2026-11-09` */
export function toQuery(people: Person[], date: string) {
    const params = new URLSearchParams({
        tz: people.map(p => p.timeZone).join(","),
        hours: people.map(p => `${toParam(p.hours.start)}-${toParam(p.hours.end)}`).join(","),
        date,
    });
    // Slashes and commas are fine in a query string and keep the link readable
    return params.toString().replace(/%2F/g, "/").replace(/%2C/g, ",");
}

export const DEFAULT_HOURS: WorkHours = {start: 9 * 60, end: 17 * 60};

/** Read people and date back from a query string, skipping anything invalid. */
export function fromQuery(search: string, maxPeople: number) {
    const params = new URLSearchParams(search);
    const hours = params.get("hours")?.split(",") ?? [];
    const people = (params.get("tz")?.split(",") ?? [])
        .map((zone, i) => ({timeZone: canonicalTimeZone(zone), hours: parseHours(hours[i]) ?? DEFAULT_HOURS}))
        .filter((p): p is Person => p.timeZone !== null)
        .slice(0, maxPeople);
    const date = params.get("date");
    return {people, date: date && isValidDate(date) ? date : null};
}
