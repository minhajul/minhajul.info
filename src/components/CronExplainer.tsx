"use client"

import {useState, useSyncExternalStore} from "react";
import {CheckIcon, ClipboardIcon, ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {describeCron, FIELD_SPECS, nextRuns, parseCron, SEARCH_YEARS} from "@/lib/cron";
import {buttonPrimary, panel} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";

const DEFAULT_EXPRESSION = "*/15 9-17 * * MON-FRI";
const RUN_COUNT = 5;

const PRESETS = [
    {label: "Every minute", expression: "* * * * *"},
    {label: "Every 5 minutes", expression: "*/5 * * * *"},
    {label: "Hourly", expression: "0 * * * *"},
    {label: "Daily at midnight", expression: "0 0 * * *"},
    {label: "Weekdays at 9am", expression: "0 9 * * 1-5"},
    {label: "Twice a day", expression: "0 9,17 * * *"},
    {label: "Mondays at 8:30", expression: "30 8 * * MON"},
    {label: "First of the month", expression: "0 0 1 * *"},
    {label: "Every quarter", expression: "0 0 1 */3 *"},
];

// The next runs depend on the current time and zone, so they only render in the browser.
// The server snapshot is null, and the client one changes once a minute to keep the list current.
const subscribeToClock = (onTick: () => void) => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
};
const getCurrentMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

const dateFormat = new Intl.DateTimeFormat(undefined, {weekday: "short", month: "short", day: "numeric", year: "numeric"});
const timeFormat = new Intl.DateTimeFormat(undefined, {hour: "2-digit", minute: "2-digit"});

// Many locales ignore hour: "2-digit", so pad the hour ourselves to keep "09:00" aligned with "10:00"
function formatTime(date: Date) {
    return timeFormat.formatToParts(date)
        .map(part => part.type === "hour" ? part.value.padStart(2, "0") : part.value)
        .join("");
}

function timeZoneLabel(at: Date) {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Intl.DateTimeFormat("en-US", {timeZoneName: "shortOffset"})
        .formatToParts(at)
        .find(part => part.type === "timeZoneName")?.value;
    return offset ? `${zone} (${offset})` : zone;
}

export default function CronExplainer() {
    const [expression, setExpression] = useState(DEFAULT_EXPRESSION);
    // While the input is invalid, keep showing the last good result (dimmed) so the layout doesn't jump
    const [lastValid, setLastValid] = useState(DEFAULT_EXPRESSION);
    const currentMinute = useSyncExternalStore(subscribeToClock, getCurrentMinute, getServerMinute);
    const {copied, copy} = useCopyToClipboard();

    const result = parseCron(expression);
    const shown = result.ok ? result : parseCron(lastValid);
    const isEmpty = !expression.trim();
    const isStale = !result.ok;

    const update = (value: string) => {
        setExpression(value);
        if (parseCron(value).ok) setLastValid(value);
    };

    const copyExpression = async () => {
        try {
            await copy(expression.trim());
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const now = currentMinute === null ? null : new Date(currentMinute * 60_000);
    const runs = now && shown.ok ? nextRuns(shown.cron, now, RUN_COUNT) : [];

    return (
        <div className="space-y-6">
            <div className={`${panel} p-5 sm:p-6`}>
                <label htmlFor="cron-expression" className="block font-semibold text-foreground">
                    Cron expression
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                        id="cron-expression"
                        type="text"
                        value={expression}
                        onChange={(event) => update(event.target.value)}
                        placeholder="*/15 * * * *"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-invalid={!result.ok && !isEmpty}
                        aria-describedby="cron-status"
                        className="w-full min-w-0 rounded-xl border border-line-strong bg-background px-4 py-3 font-mono text-base text-foreground placeholder:text-subtle aria-invalid:border-red-400/60 sm:text-lg"
                    />
                    <button
                        onClick={copyExpression}
                        disabled={isEmpty}
                        type="button"
                        className={`${buttonPrimary} shrink-0 justify-center disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                        {copied ? (
                            <>
                                <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                                Copied!
                            </>
                        ) : (
                            <>
                                <ClipboardIcon aria-hidden="true" className="size-4"/>
                                Copy
                            </>
                        )}
                    </button>
                </div>

                {/* Two lines are reserved so an error never pushes the page down */}
                <p id="cron-status" aria-live="polite" className="mt-2 min-h-10 text-sm leading-5 sm:min-h-5">
                    {result.ok ? (
                        <span className="font-mono text-xs text-subtle">minute · hour · day of month · month · day of week</span>
                    ) : isEmpty ? (
                        <span className="text-subtle">{result.error}</span>
                    ) : (
                        <span className="text-red-400">
                            <ExclamationCircleIcon aria-hidden="true" className="mr-1 inline size-4 align-[-3px]"/>
                            {result.error}
                        </span>
                    )}
                </p>

                <div className="mt-4">
                    <p id="cron-presets" className="text-sm font-medium text-muted">Try an example</p>
                    <ul aria-labelledby="cron-presets" className="mt-3 flex flex-wrap gap-2">
                        {PRESETS.map((preset) => (
                            <li key={preset.expression}>
                                <button
                                    type="button"
                                    onClick={() => update(preset.expression)}
                                    data-active={expression.trim() === preset.expression}
                                    className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground data-[active=true]:border-accent/60 data-[active=true]:text-foreground"
                                >
                                    {preset.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {shown.ok && (
                <div className={`grid gap-6 transition-opacity lg:grid-cols-5 ${isStale ? "opacity-50" : ""}`}>
                    <section aria-labelledby="cron-meaning" className={`${panel} p-5 sm:p-6 lg:col-span-3`}>
                        <h2 id="cron-meaning" className="font-mono text-xs uppercase tracking-widest text-accent">
                            In plain English
                        </h2>
                        <p className="mt-3 text-xl font-medium text-foreground text-pretty sm:text-2xl">
                            {describeCron(shown.cron)}
                        </p>
                        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3">
                            {FIELD_SPECS.map(({key, label}) => (
                                <div key={key} className="min-w-0 rounded-xl border border-line bg-background/40 p-3">
                                    <dt className="text-xs text-subtle">{label}</dt>
                                    <dd className="mt-1 font-mono text-accent break-all">{shown.cron[key].raw}</dd>
                                    <dd className="mt-1 text-sm leading-5 text-muted">{shown.cron[key].meaning}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section aria-labelledby="cron-runs" className={`${panel} p-5 sm:p-6 lg:col-span-2`}>
                        <h2 id="cron-runs" className="font-mono text-xs uppercase tracking-widest text-accent">
                            Next {RUN_COUNT} runs
                        </h2>
                        <p className="mt-2 min-h-5 text-sm text-subtle">
                            {now ? <>In your time zone, {timeZoneLabel(now)}</> : " "}
                        </p>
                        <ol className="mt-3 divide-y divide-line">
                            {!now ? (
                                Array.from({length: RUN_COUNT}, (_, i) => (
                                    <li key={i} aria-hidden="true" className="py-2.5">
                                        <div className="h-6 animate-pulse rounded bg-white/5"/>
                                    </li>
                                ))
                            ) : runs.length > 0 ? (
                                runs.map((run) => (
                                    <li key={run.getTime()} className="flex items-baseline justify-between gap-4 py-2.5">
                                        <span className="text-sm text-muted">{dateFormat.format(run)}</span>
                                        <time dateTime={run.toISOString()} className="font-mono text-foreground">
                                            {formatTime(run)}
                                        </time>
                                    </li>
                                ))
                            ) : (
                                <li className="py-2.5 text-sm leading-6 text-muted text-pretty">
                                    This never runs in the next {SEARCH_YEARS} years. Check the day and month: there&apos;s
                                    no February 30th, for example.
                                </li>
                            )}
                        </ol>
                    </section>
                </div>
            )}
        </div>
    );
}
