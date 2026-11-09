import {ChevronDownIcon} from "@heroicons/react/20/solid";
import SectionHeading from "@/components/SectionHeading";
import {STANDARD_CLAIMS} from "@/lib/jwt";
import {JWT_SEGMENTS} from "@/lib/jwtSegments";
import {panel} from "@/lib/styles";

const PARTS = [
    {
        segment: "header",
        body: "Says how the token was signed (alg, such as HS256 or RS256) and what it is (typ, usually JWT). Sometimes a kid names the key used.",
    },
    {
        segment: "payload",
        body: "The claims: who the user is, who issued the token, who it's for and when it expires. It's only encoded, not encrypted, so anyone holding the token can read it.",
    },
    {
        segment: "signature",
        body: "Proves the header and payload weren't changed. Only someone with the secret or the issuer's public key can check it, which is why this tool doesn't.",
    },
] as const;

const FAQS = [
    {
        question: "Is it safe to paste a token here?",
        answer: "Yes. Decoding happens entirely in your browser with plain JavaScript. The token is never stored, never put in the URL and never sent in a request, and it's gone when you close or clear the page.",
    },
    {
        question: "Should I paste production tokens into online decoders?",
        answer: "Be careful. A live token is a password for as long as it's valid: anyone who gets it can act as that user. Many sites send what you paste to their servers or analytics. Prefer expired or test tokens, and only use tools you trust to run fully client-side, like this one.",
    },
    {
        question: "Why isn't the signature verified?",
        answer: "Verifying needs the secret (for HS256) or the issuer's public key (for RS256, ES256 and the like). Asking you to paste a secret into a web page would be a bad habit, so this tool only decodes. Always verify signatures on your server before trusting a token.",
    },
    {
        question: "What do Valid, Expired and Not yet valid mean?",
        answer: "They compare the exp and nbf claims with your device's clock, and update live. A Valid token may still be rejected, for example if its signature or audience is wrong or it has been revoked.",
    },
    {
        question: "Can it decode an encrypted token (JWE)?",
        answer: "No. An encrypted token has five parts instead of three, and its contents can only be read with the decryption key.",
    },
];

export default function JwtDecoderGuide() {
    return (
        <>
            <section>
                <SectionHeading eyebrow="The basics" title="Three parts, one token"/>
                <p className="mb-8 max-w-3xl leading-7 text-muted text-pretty">
                    A JSON Web Token (JWT) is a compact, signed way to pass claims between systems, most often to prove
                    who a user is on every API request. It&apos;s three base64url-encoded parts joined by dots:{" "}
                    <span className="font-mono text-sm wrap-anywhere">
                        <span className={JWT_SEGMENTS.header.text}>header</span>.
                        <span className={JWT_SEGMENTS.payload.text}>payload</span>.
                        <span className={JWT_SEGMENTS.signature.text}>signature</span>
                    </span>
                </p>
                <ol className="grid gap-6 md:grid-cols-3">
                    {PARTS.map(({segment, body}, index) => (
                        <li key={segment} className={`${panel} p-5 sm:p-6`}>
                            <span className={`font-mono text-xs ${JWT_SEGMENTS[segment].text}`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-3 font-semibold text-foreground">{JWT_SEGMENTS[segment].label}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted text-pretty">{body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <SectionHeading eyebrow="Claims" title="The standard claims"/>
                <dl className={`${panel} divide-y divide-line`}>
                    {STANDARD_CLAIMS.map(({key, label, description}) => (
                        <div key={key} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:px-6">
                            <dt className="font-medium text-foreground">
                                {label} <span className="font-mono text-sm text-accent">{key}</span>
                            </dt>
                            <dd className="text-sm leading-6 text-muted text-pretty">{description}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section>
                <SectionHeading eyebrow="FAQ" title="Good to know"/>
                <div className={`${panel} divide-y divide-line`}>
                    {FAQS.map((faq) => (
                        <details key={faq.question} className="group px-5 py-4 sm:px-6">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDownIcon aria-hidden="true" className="size-5 shrink-0 text-subtle transition-transform group-open:rotate-180"/>
                            </summary>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted text-pretty">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
