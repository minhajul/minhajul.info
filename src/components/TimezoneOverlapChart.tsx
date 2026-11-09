import {cityName, formatClock, formatTimeIn, type Interval, type OverlapResult, type Person} from "@/lib/timezone";

type TimezoneOverlapChartProps = {
    people: Person[];
    /** Offset labels, e.g. "UTC+6", one per person. */
    offsets: string[];
    result: OverlapResult;
    now: number;
};

const HOUR = 3_600_000;
const GRID_HOURS = [3, 6, 9, 12, 15, 18, 21];
const LABEL_HOURS = [0, 6, 12, 18];

/** A shared 24-hour axis in the first person's local time, with everyone's hours and the overlap on it. */
export default function TimezoneOverlapChart({people, offsets, result, now}: TimezoneOverlapChartProps) {
    const {axis} = result;
    const percent = (instant: number) => ((instant - axis.start) / (axis.end - axis.start)) * 100;
    const span = (interval: Interval) => ({
        left: `${percent(interval.start)}%`,
        width: `${percent(interval.end) - percent(interval.start)}%`,
    });
    const showNow = now >= axis.start && now < axis.end;

    return (
        <figure>
            <div
                role="img"
                aria-label={`Working hours of each time zone on a 24-hour timeline in ${cityName(people[0].timeZone)} time, with the shared hours highlighted`}
                className="relative"
            >
                <ol className="space-y-4">
                    {people.map((person, i) => (
                        <li key={i}>
                            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
                                <span className="truncate font-medium text-foreground">{cityName(person.timeZone)}</span>
                                <span className="shrink-0 font-mono text-subtle">
                                    {formatClock(person.hours.start)}–{formatClock(person.hours.end)} · {offsets[i]}
                                </span>
                            </div>
                            <div className="relative h-7 overflow-hidden rounded-md bg-white/[0.04]">
                                {GRID_HOURS.map(hour => (
                                    <div
                                        key={hour}
                                        className="absolute inset-y-0 w-px bg-white/[0.06]"
                                        style={{left: `${percent(axis.start + hour * HOUR)}%`}}
                                    />
                                ))}
                                {result.rows[i].map(interval => (
                                    <div
                                        key={interval.start}
                                        className="absolute inset-y-1 rounded-sm bg-linear-to-b from-accent/55 to-accent/35"
                                        style={span(interval)}
                                    />
                                ))}
                                {/* Drawn per track, so the marker never crosses the row labels */}
                                {showNow && (
                                    <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-foreground/80" style={{left: `${percent(now)}%`}}/>
                                )}
                            </div>
                            {/* This zone's local time at the same points on the axis */}
                            <div className="relative mt-1 h-4 font-mono text-xs text-subtle">
                                {LABEL_HOURS.map(hour => (
                                    <span
                                        key={hour}
                                        className={`absolute ${hour ? "-translate-x-1/2" : ""}`}
                                        style={{left: `${percent(axis.start + hour * HOUR)}%`}}
                                    >
                                        {formatTimeIn(person.timeZone, axis.start + hour * HOUR)}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ol>

                {/* Bands sit over every row so the shared hours read as one column */}
                <div className="pointer-events-none absolute inset-0">
                    {result.bands.map(band => (
                        <div
                            key={band.start}
                            className="absolute inset-y-0 rounded-md border-x border-success/70 bg-success/10"
                            style={span(band)}
                        />
                    ))}
                </div>
            </div>

            <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-subtle">
                <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-accent/45"/>
                    Working hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2.5 w-4 rounded-sm border-x border-success/70 bg-success/20"/>
                    Shared hours
                </span>
                {showNow && (
                    <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="h-2.5 w-0.5 rounded-full bg-foreground/80"/>
                        Now
                    </span>
                )}
                <span>Axis: one day in {cityName(people[0].timeZone)} time</span>
            </figcaption>
        </figure>
    );
}
