// Pure helpers for decoding JSON Web Tokens. Nothing here verifies signatures:
// that needs the secret or public key, which this tool never asks for.

export type JsonObject = Record<string, unknown>;

export type DecodedJwt = {
    header: JsonObject;
    payload: JsonObject;
    /** Header and payload JSON exactly as written in the token, indented for reading. */
    json: { header: string; payload: string };
    /** The payload's top-level numbers as written. JSON.parse rounds integers past 2^53, like 64-bit IDs. */
    payloadNumbers: ReadonlyMap<string, string>;
    /** The raw, still-encoded signature segment. */
    signature: string;
    /** The three encoded segments, for colour-coding the token. */
    parts: [string, string, string];
};

export type DecodeResult = { ok: true; jwt: DecodedJwt } | { ok: false; error: string };

export type TokenStatus = "valid" | "expired" | "not-yet-valid" | "invalid-time";

/** The registered claims from RFC 7519, in the order they're usually read. */
export const STANDARD_CLAIMS = [
    {key: "iss", label: "Issuer", description: "Who created and signed the token, often the auth server's URL."},
    {key: "sub", label: "Subject", description: "Who the token is about, usually a user ID."},
    {key: "aud", label: "Audience", description: "Who the token is meant for. An API should reject tokens addressed to someone else."},
    {key: "exp", label: "Expires", description: "When the token stops being valid, as a Unix timestamp in seconds."},
    {key: "nbf", label: "Not before", description: "When the token starts being valid. It must be rejected before then."},
    {key: "iat", label: "Issued at", description: "When the token was created."},
    {key: "jti", label: "Token ID", description: "A unique ID for the token, so it can be revoked or used only once."},
] as const;

export const TIME_CLAIMS: ReadonlySet<string> = new Set(["exp", "nbf", "iat"]);

const BASE64URL = /^[A-Za-z0-9_-]*={0,2}$/;

/** Strip whitespace (tokens often wrap when copied) and a leading "Bearer ". */
export function normalizeToken(input: string): string {
    return input.trim().replace(/^bearer\s+/i, "").replace(/\s+/g, "");
}

function base64UrlToBytes(segment: string): Uint8Array | null {
    if (!BASE64URL.test(segment)) return null;
    const unpadded = segment.replace(/=+$/, "");
    // A base64 string can never be 1 character past a multiple of 4
    if (unpadded.length % 4 === 1) return null;
    const base64 = unpadded.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decodeJsonSegment(segment: string, name: "header" | "payload"): { value: JsonObject; text: string } | string {
    const label = `The ${name}`;
    if (!segment) return `${label} is empty.`;

    const bytes = base64UrlToBytes(segment);
    if (!bytes) return `${label} isn't valid base64url. It can only contain letters, digits, "-" and "_", and may have been cut short.`;

    let text: string;
    try {
        text = new TextDecoder("utf-8", {fatal: true}).decode(bytes);
    } catch {
        return `${label} doesn't decode to valid UTF-8 text.`;
    }

    let value: unknown;
    try {
        value = JSON.parse(text);
    } catch (error) {
        return `${label} isn't valid JSON (${error instanceof Error ? error.message : "parse error"}).`;
    }

    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        const kind = Array.isArray(value) ? "an array" : value === null ? "null" : `a ${typeof value}`;
        return `${label} must be a JSON object, but it's ${kind}.`;
    }
    return {value: value as JsonObject, text};
}

// A string, a punctuation mark, or a run of anything else (a number, true, false or null).
// Only ever run on text JSON.parse has already accepted.
const JSON_TOKEN = /"(?:[^"\\]|\\.)*"|[{}[\],:]|[^\s{}[\],:"]+/g;

/**
 * Indent JSON the way JSON.stringify(value, null, 2) does, but working on the text itself, so
 * numbers past 2^53, duplicate keys and key order all show exactly as they are in the token.
 */
export function formatJson(text: string): string {
    const tokens = text.match(JSON_TOKEN) ?? [];
    let depth = 0;
    let out = "";
    const newline = () => "\n" + "  ".repeat(depth);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === "{" || token === "[") {
            // Empty objects and arrays stay on one line, as JSON.stringify prints them
            if (tokens[i + 1] === (token === "{" ? "}" : "]")) {
                out += token + tokens[++i];
            } else {
                depth++;
                out += token + newline();
            }
        } else if (token === "}" || token === "]") {
            depth--;
            out += newline() + token;
        } else if (token === ",") {
            out += "," + newline();
        } else {
            out += token === ":" ? ": " : token;
        }
    }
    return out;
}

function topLevelNumbers(text: string): Map<string, string> {
    const tokens = text.match(JSON_TOKEN) ?? [];
    const numbers = new Map<string, string>();
    let depth = 0;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === "{" || token === "[") depth++;
        else if (token === "}" || token === "]") depth--;
        else if (depth === 1 && tokens[i + 1] === ":") {
            // A repeated key keeps its last value, as in JSON.parse
            const key = JSON.parse(token) as string;
            const value = tokens[i + 2];
            if (/^-?\d/.test(value)) numbers.set(key, value);
            else numbers.delete(key);
        }
    }
    return numbers;
}

/** Decode a token's header and payload. Returns null for empty input. */
export function decodeJwt(input: string): DecodeResult | null {
    const token = normalizeToken(input);
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length === 5) {
        return {
            ok: false,
            error: "This is an encrypted token (JWE, five parts). Its contents can't be decoded without the decryption key.",
        };
    }
    if (parts.length !== 3) {
        const found = parts.length === 1 ? "no dots" : `${parts.length} parts`;
        return {ok: false, error: `A JWT has three parts separated by dots (header.payload.signature), but this has ${found}.`};
    }

    const header = decodeJsonSegment(parts[0], "header");
    if (typeof header === "string") return {ok: false, error: header};
    const payload = decodeJsonSegment(parts[1], "payload");
    if (typeof payload === "string") return {ok: false, error: payload};
    if (!base64UrlToBytes(parts[2])) {
        return {ok: false, error: "The signature isn't valid base64url. It may have been cut short."};
    }

    return {
        ok: true,
        jwt: {
            header: header.value,
            payload: payload.value,
            json: {header: formatJson(header.text), payload: formatJson(payload.text)},
            payloadNumbers: topLevelNumbers(payload.text),
            signature: parts[2],
            parts: parts as [string, string, string],
        },
    };
}

/** Time-based validity from exp and nbf. Says nothing about the signature. */
export function tokenStatus(payload: JsonObject, nowSeconds: number): TokenStatus {
    const {exp, nbf} = payload;
    // RFC 7519 times must be numbers, so a server rejects a token whose exp or nbf is a string or null
    const isTime = (value: unknown) => typeof value === "number" && Number.isFinite(value);
    if (("exp" in payload && !isTime(exp)) || ("nbf" in payload && !isTime(nbf))) return "invalid-time";
    if (typeof exp === "number" && nowSeconds >= exp) return "expired";
    if (typeof nbf === "number" && nowSeconds < nbf) return "not-yet-valid";
    return "valid";
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 365 * 86400],
    ["month", 30 * 86400],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
];

/** "in 2 hours", "3 days ago". Truncates, so a token never looks longer-lived than it is. */
export function formatRelativeTime(targetSeconds: number, nowSeconds: number): string {
    const diff = targetSeconds - nowSeconds;
    if (diff === 0) return "now";
    const format = new Intl.RelativeTimeFormat("en", {numeric: "always"});
    for (const [unit, seconds] of RELATIVE_UNITS) {
        if (Math.abs(diff) >= seconds) return format.format(Math.trunc(diff / seconds), unit);
    }
    return format.format(Math.trunc(diff), "second");
}

function encodeBase64Url(text: string): string {
    const binary = Array.from(new TextEncoder().encode(text), (byte) => String.fromCharCode(byte)).join("");
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** A harmless example token that expires an hour after `nowSeconds`. Its signature is fake. */
export function createSampleToken(nowSeconds: number): string {
    const header = {alg: "HS256", typ: "JWT"};
    const payload = {
        iss: "https://auth.example.com",
        sub: "1234567890",
        name: "Jane Doe",
        aud: "example-api",
        iat: nowSeconds,
        exp: nowSeconds + 3600,
    };
    return [
        encodeBase64Url(JSON.stringify(header)),
        encodeBase64Url(JSON.stringify(payload)),
        encodeBase64Url("not-a-real-signature-demo-only!!"),
    ].join(".");
}
