import {ImageResponse} from "next/og";
import {profile} from "@/data/profile";
import {jwtDecoder} from "@/data/tools";
import {colors} from "@/lib/theme";
import {OgFrame, ogSize} from "@/lib/og";

export const alt = `${jwtDecoder.title} — a free tool by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

const FEATURES = ["Free", "No sign-up", "Client-side"];

// Tailwind's rose-400 and violet-400, matching the decoder's header and payload colours
const SEGMENT_COLORS = {header: "#fb7185", payload: "#a78bfa", signature: colors.accent};

const PAYLOAD_LINES: [string, string][] = [
    ["sub", "\"1234567890\""],
    ["name", "\"Jane Doe\""],
    ["exp", "1735689600"],
];

export default function Image() {
    return new ImageResponse(
        (
            <OgFrame path="minhajul.info/tools">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 560}}>
                        <div style={{fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05}}>
                            {jwtDecoder.title}
                        </div>
                        <div style={{fontSize: 28, color: colors.muted, marginTop: 24, lineHeight: 1.4}}>
                            Read a token&apos;s header, payload and expiry. It never leaves your browser.
                        </div>
                        <div style={{display: "flex", gap: 12, marginTop: 36}}>
                            {FEATURES.map(feature => (
                                <div
                                    key={feature}
                                    style={{
                                        display: "flex",
                                        padding: "8px 18px",
                                        borderRadius: 999,
                                        border: `2px solid ${colors.lineStrong}`,
                                        fontSize: 22,
                                        color: colors.foreground,
                                    }}
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* A mock decoded token, so the card shows what the tool does */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 440,
                            padding: 28,
                            borderRadius: 24,
                            background: colors.surface,
                            border: `2px solid ${colors.lineStrong}`,
                            fontSize: 20,
                            lineHeight: 1.5,
                        }}
                    >
                        <div style={{display: "flex", fontSize: 18, color: colors.subtle}}>
                            <span style={{color: SEGMENT_COLORS.header}}>eyJhbGciOi</span>
                            <span>.</span>
                            <span style={{color: SEGMENT_COLORS.payload}}>eyJzdWIiOiIx</span>
                            <span>.</span>
                            <span style={{color: SEGMENT_COLORS.signature}}>SflKxwRJ</span>
                        </div>
                        <div style={{display: "flex", marginTop: 20, fontSize: 16, color: colors.subtle}}>PAYLOAD</div>
                        <div style={{display: "flex", flexDirection: "column", marginTop: 6, color: SEGMENT_COLORS.payload}}>
                            <div style={{display: "flex"}}>{"{"}</div>
                            {PAYLOAD_LINES.map(([key, value]) => (
                                <div key={key} style={{display: "flex", paddingLeft: 24}}>
                                    {`"${key}": ${value}`}
                                </div>
                            ))}
                            <div style={{display: "flex"}}>{"}"}</div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 20,
                                paddingTop: 16,
                                borderTop: `2px solid ${colors.line}`,
                                fontSize: 17,
                                color: colors.subtle,
                            }}
                        >
                            <span>Expires in 2 hours</span>
                            <span
                                style={{
                                    padding: "4px 14px",
                                    borderRadius: 999,
                                    border: "2px solid rgba(74,222,128,0.4)",
                                    color: "#4ade80",
                                }}
                            >
                                Valid
                            </span>
                        </div>
                    </div>
                </div>
            </OgFrame>
        ),
        size
    );
}
