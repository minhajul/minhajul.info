"use client"

import {useState, type ReactNode} from "react";
import {CheckIcon, ClipboardIcon, ExclamationTriangleIcon, LockClosedIcon} from "@heroicons/react/20/solid";
import JwtClaims from "@/components/JwtClaims";
import {createSampleToken, decodeJwt, type DecodedJwt, type JsonObject} from "@/lib/jwt";
import {JWT_SEGMENTS as SEGMENTS, type JwtSegment as Segment} from "@/lib/jwtSegments";
import {panel} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";

const codeBlock = "rounded-xl bg-background/60 p-4 font-mono text-sm leading-6 whitespace-pre-wrap wrap-anywhere";
const textButton = "text-sm font-medium text-accent transition-colors hover:text-foreground";

function Section({segment, copyText, children}: { segment: Segment; copyText: string; children: ReactNode }) {
    const {copied, copy} = useCopyToClipboard();
    const {label, hint, dot} = SEGMENTS[segment];

    return (
        <section aria-labelledby={`jwt-${segment}-heading`} className={`${panel} min-w-0 p-5 sm:p-6`}>
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 id={`jwt-${segment}-heading`} className="flex flex-wrap items-center gap-x-2 font-semibold text-foreground">
                    <span aria-hidden="true" className={`size-2.5 rounded-full ${dot}`}/>
                    {label}
                    <span className="text-sm font-normal text-subtle">{hint}</span>
                </h2>
                <button
                    type="button"
                    onClick={() => copy(copyText).catch((err) => console.error("Failed to copy:", err))}
                    disabled={!copyText}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {copied
                        ? <CheckIcon aria-hidden="true" className="size-3.5 text-success"/>
                        : <ClipboardIcon aria-hidden="true" className="size-3.5"/>}
                    {copied ? "Copied" : "Copy"}
                    <span className="sr-only"> {label.toLowerCase()}</span>
                </button>
            </div>
            {children}
        </section>
    );
}

function JsonSection({segment, value}: { segment: "header" | "payload"; value: JsonObject }) {
    const json = JSON.stringify(value, null, 2);
    return (
        <Section segment={segment} copyText={json}>
            <pre className={`${codeBlock} ${SEGMENTS[segment].text}`}>{json}</pre>
        </Section>
    );
}

function Signature({jwt}: { jwt: DecodedJwt }) {
    const alg = typeof jwt.header.alg === "string" ? jwt.header.alg : null;
    const unsigned = alg?.toLowerCase() === "none";

    return (
        <Section segment="signature" copyText={jwt.signature}>
            <p className="mb-3 text-sm text-muted">
                Algorithm: <span className="font-mono text-foreground">{alg ?? "missing"}</span>
            </p>
            {jwt.signature
                ? <p className={`${codeBlock} ${SEGMENTS.signature.text}`}>{jwt.signature}</p>
                : <p className="text-sm text-subtle">The signature segment is empty.</p>}
            <p
                className={`mt-4 flex gap-2 rounded-xl border p-3 text-sm leading-6 ${unsigned ? "border-red-400/30 bg-red-400/10 text-red-300" : "border-amber-400/30 bg-amber-400/10 text-amber-200"}`}
            >
                <ExclamationTriangleIcon aria-hidden="true" className="mt-1 size-4 shrink-0"/>
                <span>
                    {unsigned
                        ? "Unsigned token. Its alg is \"none\", so anyone could have written or changed it. Never accept it."
                        : "Signature not verified. Checking it needs the secret (for HS256) or the issuer's public key (for RS256, ES256 and the like), so this tool only decodes. Don't trust the contents until your server verifies them."}
                </span>
            </p>
        </Section>
    );
}

export default function JwtDecoder() {
    // Kept in memory only: never in storage, the URL or a request
    const [input, setInput] = useState("");
    const result = decodeJwt(input);
    const error = result && !result.ok ? result.error : null;
    const jwt = result?.ok ? result.jwt : null;

    const loadSample = () => setInput(createSampleToken(Math.floor(Date.now() / 1000)));

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-6">
                <div className={`${panel} p-5 sm:p-6`}>
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <label htmlFor="jwt-input" className="font-semibold text-foreground">Encoded token</label>
                        <div className="flex gap-4">
                            {input && <button type="button" onClick={() => setInput("")} className={textButton}>Clear</button>}
                            <button type="button" onClick={loadSample} className={textButton}>Try a sample</button>
                        </div>
                    </div>

                    <textarea
                        id="jwt-input"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        rows={7}
                        placeholder="Paste a JWT, e.g. eyJhbGciOiJIUzI1NiIs…"
                        aria-invalid={error ? true : undefined}
                        aria-describedby="jwt-privacy jwt-error"
                        // Keep browser spellcheck services and extensions away from the token
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        data-gramm="false"
                        className="block w-full resize-y rounded-xl border border-line bg-background/60 p-4 font-mono text-sm leading-6 break-all text-foreground placeholder:text-subtle focus:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />

                    {/* The same token, split into its colour-coded parts */}
                    {jwt && (
                        <p aria-hidden="true" className="mt-3 max-h-32 overflow-hidden font-mono text-xs leading-5 break-all">
                            <span className={SEGMENTS.header.text}>{jwt.parts[0]}</span>
                            <span className="text-subtle">.</span>
                            <span className={SEGMENTS.payload.text}>{jwt.parts[1]}</span>
                            <span className="text-subtle">.</span>
                            <span className={SEGMENTS.signature.text}>{jwt.parts[2]}</span>
                        </p>
                    )}

                    <div id="jwt-error" aria-live="polite">
                        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
                    </div>

                    <p id="jwt-privacy" className="mt-4 flex gap-2 text-xs leading-5 text-subtle">
                        <LockClosedIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0"/>
                        Decoded right here in your browser. The token is never saved, put in the URL or sent anywhere.
                    </p>
                </div>

                {jwt && <JwtClaims payload={jwt.payload}/>}
            </div>

            <div className="min-w-0 space-y-6">
                {jwt ? (
                    <>
                        <JsonSection segment="header" value={jwt.header}/>
                        <JsonSection segment="payload" value={jwt.payload}/>
                        <Signature jwt={jwt}/>
                    </>
                ) : (
                    <div className={`${panel} flex min-h-48 flex-col items-center justify-center gap-4 border-dashed p-6 text-center text-sm text-subtle lg:h-full`}>
                        <div aria-hidden="true" className="flex gap-1.5">
                            {(["header", "payload", "signature"] as const).map((segment) => (
                                <span key={segment} className={`h-1.5 w-8 rounded-full opacity-60 ${SEGMENTS[segment].dot}`}/>
                            ))}
                        </div>
                        <p className="max-w-xs text-pretty">Paste a token, or try the sample, to see its header, payload and signature here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
