'use client'

import {useEffect, useId, useState, useSyncExternalStore} from "react";
import {CheckIcon, LinkIcon, PlusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import TimezonePicker, {type ZoneOption} from "@/components/TimezonePicker";
import TimezoneOverlapChart from "@/components/TimezoneOverlapChart";
import {buttonPrimary, buttonSecondary, panel} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";
import {
    canonicalTimeZone,
    cityName,
    DEFAULT_HOURS,
    findOverlap,
    formatClock,
    formatDuration,
    formatOffset,
    formatTimeIn,
    fromQuery,
    listTimeZones,
    localDate,
    offsetMinutes,
    type OverlapResult,
    type Person,
    toQuery,
    type WorkHours,
} from "@/lib/timezone";

const MIN_ROWS = 2;
const MAX_ROWS = 5;
// Offered in this order when adding a row, skipping zones already on the list
const SUGGESTED_ZONES = ["America/New_York", "Europe/London", "Asia/Dhaka", "America/Los_Angeles", "Europe/Berlin", "Asia/Singapore", "Australia/Sydney", "UTC"];
const HALF_HOURS = Array.from({length: 48}, (_, i) => i * 30);

type Row = Person & { id: number };

const field = "w-full rounded-lg border border-line bg-background px-2.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none";
const fieldLabel = "mb-1.5 block text-xs font-medium text-subtle";

const nextZone = (taken: string[]) => SUGGESTED_ZONES.find(zone => !taken.includes(zone)) ?? "UTC";

/** Read the shared link if there is one, otherwise start from the viewer's zone and New York (or London). */
function initialState() {
    const browserZone = canonicalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone) ?? "UTC";
    const fromUrl = fromQuery(window.location.search, MAX_ROWS);
    const people = fromUrl.people.length ? fromUrl.people : [{timeZone: browserZone, hours: DEFAULT_HOURS}];
    while (people.length < MIN_ROWS) {
        people.push({timeZone: nextZone(people.map(p => p.timeZone)), hours: DEFAULT_HOURS});
    }
    return {
        rows: people.map((person, id): Row => ({...person, id})),
        date: fromUrl.date ?? localDate(browserZone, Date.now()),
    };
}

// The browser's zone, the clock and the URL only exist on the client, so the server renders a skeleton
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

export default function TimezoneOverlapFinder() {
    return useHydrated() ? <OverlapFinder/> : <Skeleton/>;
}

function OverlapFinder() {
    const [{rows, date}, setState] = useState(initialState);
    const [now] = useState(Date.now);
    const {copied, copy} = useCopyToClipboard();
    const dateId = useId();

    const query = toQuery(rows, date);
    useEffect(() => {
        window.history.replaceState(null, "", `?${query}`);
    }, [query]);

    // Offsets depend on the date because of DST; noon UTC keeps clear of most switch-overs
    const noon = Date.parse(`${date}T12:00:00Z`);
    const offsetLabel = (timeZone: string) => formatOffset(offsetMinutes(timeZone, noon));
    // Include the rows' own zones, in case the browser reports an alias that isn't in the list
    const zones = new Set([...listTimeZones(), ...rows.map(row => row.timeZone)]);
    const zoneOptions: ZoneOption[] = [...zones]
        .map(timeZone => ({timeZone, offset: offsetMinutes(timeZone, noon)}))
        .sort((a, b) => a.offset - b.offset || a.timeZone.localeCompare(b.timeZone))
        .map(({timeZone, offset}) => ({timeZone, label: `${cityName(timeZone)} (${formatOffset(offset)})`}));

    const result = findOverlap(rows, date);

    const updateRow = (id: number, change: Partial<Person>) =>
        setState(s => ({...s, rows: s.rows.map(row => (row.id === id ? {...row, ...change} : row))}));
    const removeRow = (id: number) => setState(s => ({...s, rows: s.rows.filter(row => row.id !== id)}));
    const addRow = () => setState(s => ({
        ...s,
        rows: [...s.rows, {
            id: Math.max(...s.rows.map(row => row.id)) + 1,
            timeZone: nextZone(s.rows.map(row => row.timeZone)),
            hours: DEFAULT_HOURS,
        }],
    }));

    const copyLink = async () => {
        try {
            await copy(`${window.location.origin}${window.location.pathname}?${query}`);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="space-y-6">
            <div className={`${panel} p-5 sm:p-6`}>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="font-semibold text-foreground">Time zones & working hours</h2>
                    <div className="flex items-center gap-3">
                        <label htmlFor={dateId} className="text-xs font-medium text-subtle">Date</label>
                        <input
                            id={dateId}
                            type="date"
                            value={date}
                            onChange={event => event.target.value && setState(s => ({...s, date: event.target.value}))}
                            className={`${field} font-mono`}
                        />
                    </div>
                </div>

                <ul className="space-y-5 sm:space-y-4">
                    {rows.map((row, index) => (
                        <ZoneRow
                            key={row.id}
                            row={row}
                            label={index === 0 ? "Time zone 1 (chart axis)" : `Time zone ${index + 1}`}
                            options={zoneOptions}
                            canRemove={rows.length > MIN_ROWS}
                            onChange={change => updateRow(row.id, change)}
                            onRemove={() => removeRow(row.id)}
                        />
                    ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={addRow}
                        disabled={rows.length >= MAX_ROWS}
                        className={`${buttonSecondary} disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                        <PlusIcon aria-hidden="true" className="size-4"/>
                        Add time zone
                    </button>
                    <button type="button" onClick={copyLink} className={buttonPrimary}>
                        {copied ? (
                            <>
                                <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                                Link copied!
                            </>
                        ) : (
                            <>
                                <LinkIcon aria-hidden="true" className="size-4"/>
                                Copy link
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className={`${panel} p-5 sm:p-6`}>
                <Summary people={rows} date={date} result={result}/>
                <div className="mt-8">
                    <TimezoneOverlapChart
                        people={rows}
                        offsets={rows.map(row => offsetLabel(row.timeZone))}
                        result={result}
                        now={now}
                    />
                </div>
            </div>
        </div>
    );
}

type ZoneRowProps = {
    row: Row;
    label: string;
    options: ZoneOption[];
    canRemove: boolean;
    onChange: (change: Partial<Person>) => void;
    onRemove: () => void;
};

function ZoneRow({row, label, options, canRemove, onChange, onRemove}: ZoneRowProps) {
    const id = useId();
    const setHours = (change: Partial<WorkHours>) => onChange({hours: {...row.hours, ...change}});
    const crossesMidnight = row.hours.end <= row.hours.start;

    return (
        <li className="grid grid-cols-[1fr_1fr_auto] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_7rem_7rem_auto]">
            <div className="col-span-3 sm:col-span-1">
                <TimezonePicker
                    label={label}
                    value={row.timeZone}
                    options={options}
                    onChange={timeZone => onChange({timeZone})}
                />
            </div>
            <HourSelect id={`${id}-start`} label="Start" value={row.hours.start} onChange={start => setHours({start})}/>
            <HourSelect
                id={`${id}-end`}
                label={crossesMidnight ? "End (next day)" : "End"}
                value={row.hours.end}
                onChange={end => setHours({end})}
            />
            <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                aria-label={`Remove ${cityName(row.timeZone)}`}
                className="rounded-lg border border-line p-2 text-subtle transition-colors enabled:hover:bg-surface-hover enabled:hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
                <XMarkIcon aria-hidden="true" className="size-5"/>
            </button>
        </li>
    );
}

type HourSelectProps = {
    id: string;
    label: string;
    value: number;
    onChange: (minutes: number) => void;
};

function HourSelect({id, label, value, onChange}: HourSelectProps) {
    return (
        <div className="min-w-0">
            <label htmlFor={id} className={`${fieldLabel} truncate`}>{label}</label>
            <select id={id} value={value} onChange={event => onChange(Number(event.target.value))} className={`${field} font-mono`}>
                {HALF_HOURS.map(minutes => (
                    <option key={minutes} value={minutes}>{formatClock(minutes)}</option>
                ))}
            </select>
        </div>
    );
}

type SummaryProps = {
    people: Person[];
    date: string;
    result: OverlapResult;
};

/** The overlap in words: how long, and the window in each person's own time. */
function Summary({people, date, result}: SummaryProps) {
    const dayNote = (timeZone: string, instant: number) => {
        const local = localDate(timeZone, instant);
        return local === date ? "" : local > date ? " (next day)" : " (previous day)";
    };

    if (result.windows.length) {
        return (
            <div aria-live="polite">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                    <span className="text-success">{formatDuration(result.totalMinutes)}</span> of overlap
                </p>
                <ul className="mt-3 space-y-2">
                    {result.windows.map(shared => (
                        <li key={shared.start} className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
                            {people.map((person, i) => (
                                <span key={i}>
                                    {i > 0 && <span aria-hidden="true" className="mr-2 text-subtle">·</span>}
                                    <span className="font-mono text-foreground">
                                        {formatTimeIn(person.timeZone, shared.start)}–{formatTimeIn(person.timeZone, shared.end)}
                                    </span>{" "}
                                    in {cityName(person.timeZone)}{dayNote(person.timeZone, shared.start)}
                                </span>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const [best, alternative] = result.nearMisses;
    const describe = ({person, shiftMinutes, overlapMinutes}: typeof best) => {
        const {timeZone, hours} = people[person];
        return `${cityName(timeZone)} could start ${formatDuration(Math.abs(shiftMinutes))} ${shiftMinutes > 0 ? "later" : "earlier"} ` +
            `(${formatClock(hours.start + shiftMinutes)}–${formatClock(hours.end + shiftMinutes)}) for ${formatDuration(overlapMinutes)} of overlap`;
    };

    return (
        <div aria-live="polite">
            <p className="text-2xl font-semibold tracking-tight text-foreground">No overlap on this day</p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted text-pretty">
                {best ? (
                    <>
                        The closest working hours are <span className="text-foreground">{formatDuration(best.gapMinutes)}</span> apart.{" "}
                        {describe(best)}
                        {people.length === 2 && alternative ? `, or ${describe(alternative)}.` : "."}
                    </>
                ) : (
                    "No one person can close the gap alone, because the others don't share any hours either. Try comparing fewer zones or widening someone's hours."
                )}
            </p>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="space-y-6" aria-busy="true">
            <p className="sr-only">Loading the time zone comparison</p>
            <div aria-hidden="true" className={`${panel} p-5 sm:p-6`}>
                <div className="mb-5 flex items-end justify-between gap-4">
                    <div className="h-5 w-48 rounded bg-white/5"/>
                    <div className="h-[58px] w-36 rounded-lg bg-white/5"/>
                </div>
                <div className="space-y-4">
                    <div className="h-[62px] rounded-lg bg-white/[0.03]"/>
                    <div className="h-[62px] rounded-lg bg-white/[0.03]"/>
                </div>
                <div className="mt-6 h-10"/>
            </div>
            <div aria-hidden="true" className={`${panel} h-72 p-5 sm:p-6`}/>
        </div>
    );
}
