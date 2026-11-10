"use client"

import {formatRelativeTime, type JsonObject, STANDARD_CLAIMS, TIME_CLAIMS, tokenStatus, type TokenStatus} from "@/lib/jwt";
import {panel} from "@/lib/styles";
import {useNow} from "@/lib/useNow";

const STATUS: Record<TokenStatus, { label: string; className: string }> = {
    "valid": {label: "Valid", className: "border-success/30 bg-success/10 text-success"},
    "expired": {label: "Expired", className: "border-red-400/30 bg-red-400/10 text-red-400"},
    "not-yet-valid": {label: "Not yet valid", className: "border-amber-400/30 bg-amber-400/10 text-amber-400"},
    "invalid-time": {label: "Invalid exp or nbf", className: "border-red-400/30 bg-red-400/10 text-red-400"},
};

function formatValue(value: unknown, source?: string) {
    // The number as written in the token, since parsing rounds integers past 2^53
    if (typeof value === "number" && source) return source;
    if (typeof value === "string") return value;
    if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value.join(", ");
    return JSON.stringify(value);
}

function TimeValue({seconds, nowSeconds}: { seconds: unknown; nowSeconds: number }) {
    if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
        return <>{formatValue(seconds)} <span className="text-red-400">(not a Unix timestamp)</span></>;
    }
    const date = new Date(seconds * 1000);
    // Out-of-range timestamps give an Invalid Date, and toISOString() would throw
    if (Number.isNaN(date.getTime())) {
        return <>{seconds} <span className="text-red-400">(outside the range of valid dates)</span></>;
    }
    return (
        <>
            <time dateTime={date.toISOString()}>
                {date.toLocaleString(undefined, {dateStyle: "medium", timeStyle: "medium"})}
            </time>
            <span className="block text-subtle">
                {formatRelativeTime(seconds, nowSeconds)} · <span className="font-mono">{seconds}</span>
            </span>
        </>
    );
}

type JwtClaimsProps = {
    payload: JsonObject;
    /** Top-level numbers as written in the token. */
    numbers: ReadonlyMap<string, string>;
};

export default function JwtClaims({payload, numbers}: JwtClaimsProps) {
    // Ticks every second so the status and relative times stay live. Null on the server, so they render in the browser only.
    const now = useNow(1000);
    const nowSeconds = now === null ? null : now / 1000;
    const claims = STANDARD_CLAIMS.filter(({key}) => key in payload);
    const status = nowSeconds === null ? null : STATUS[tokenStatus(payload, nowSeconds)];

    return (
        <section aria-labelledby="jwt-claims-heading" className={`${panel} p-5 sm:p-6`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 id="jwt-claims-heading" className="font-semibold text-foreground">Claims</h2>
                {status && (
                    <p role="status" className={`rounded-full border px-3 py-1 text-sm font-medium ${status.className}`}>
                        <span className="sr-only">Token status: </span>{status.label}
                    </p>
                )}
            </div>

            {claims.length === 0 ? (
                <p className="text-sm text-muted">This payload has none of the standard claims (iss, sub, aud, exp, nbf, iat, jti).</p>
            ) : (
                <dl className="divide-y divide-line text-sm">
                    {claims.map(({key, label}) => (
                        <div key={key} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
                            <dt className="text-muted">
                                {label} <span className="font-mono text-xs text-subtle">{key}</span>
                            </dt>
                            <dd className="min-w-0 text-foreground wrap-anywhere">
                                {TIME_CLAIMS.has(key)
                                    ? nowSeconds !== null && <TimeValue seconds={payload[key]} nowSeconds={nowSeconds}/>
                                    : formatValue(payload[key], numbers.get(key))}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
            <p className="mt-4 text-xs leading-5 text-subtle">
                The status only checks the exp and nbf times. It doesn&apos;t mean the signature is genuine.
            </p>
        </section>
    );
}
