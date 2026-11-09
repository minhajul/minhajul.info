import {ImageResponse} from "next/og";
import {profile} from "@/data/profile";
import {timezoneOverlap} from "@/data/tools";
import {colors} from "@/lib/theme";
import {OgFrame, ogSize} from "@/lib/og";

export const alt = `${timezoneOverlap.title} — a free tool by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

const FEATURES = ["Free", "No sign-up", "DST-aware"];

// A mock chart: working hours as a share of a 24-hour day on the Dhaka axis
const ROWS = [
    {city: "Dhaka", hours: "09:00–17:00", start: 9, end: 17},
    {city: "London", hours: "09:00–17:00", start: 14, end: 22},
    {city: "Berlin", hours: "08:00–16:00", start: 12, end: 20},
];
const OVERLAP = {start: 14, end: 17};
const TRACK_WIDTH = 392;
const x = (hour: number) => (hour / 24) * TRACK_WIDTH;
const SUCCESS = "#4ade80";

export default function Image() {
    return new ImageResponse(
        (
            <OgFrame path="minhajul.info/tools">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 560}}>
                        <div style={{fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05}}>
                            {timezoneOverlap.title}
                        </div>
                        <div style={{fontSize: 28, color: colors.muted, marginTop: 24, lineHeight: 1.4}}>
                            Find the working hours you share across time zones, for any date.
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

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 440,
                            padding: 24,
                            borderRadius: 24,
                            background: colors.surface,
                            border: `2px solid ${colors.lineStrong}`,
                        }}
                    >
                        <div style={{display: "flex", fontSize: 30, fontWeight: 700}}>
                            <span style={{color: SUCCESS}}>3 h</span>
                            <span style={{marginLeft: 10}}>of overlap</span>
                        </div>
                        <div style={{display: "flex", position: "relative", flexDirection: "column", marginTop: 8}}>
                            {ROWS.map(row => (
                                <div key={row.city} style={{display: "flex", flexDirection: "column", marginTop: 18}}>
                                    <div style={{display: "flex", justifyContent: "space-between", fontSize: 18}}>
                                        <span>{row.city}</span>
                                        <span style={{color: colors.subtle}}>{row.hours}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            position: "relative",
                                            height: 30,
                                            marginTop: 8,
                                            borderRadius: 8,
                                            background: "rgba(255,255,255,0.04)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 5,
                                                bottom: 5,
                                                left: x(row.start),
                                                width: x(row.end - row.start),
                                                borderRadius: 4,
                                                background: "rgba(96,165,250,0.4)",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    bottom: 0,
                                    left: x(OVERLAP.start),
                                    width: x(OVERLAP.end - OVERLAP.start),
                                    borderLeft: `2px solid ${SUCCESS}`,
                                    borderRight: `2px solid ${SUCCESS}`,
                                    background: "rgba(74,222,128,0.12)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </OgFrame>
        ),
        size
    );
}
