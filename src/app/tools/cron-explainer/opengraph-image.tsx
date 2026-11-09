import {ImageResponse} from "next/og";
import {profile} from "@/data/profile";
import {cronExplainer} from "@/data/tools";
import {colors} from "@/lib/theme";
import {OgFrame, ogSize} from "@/lib/og";

export const alt = `${cronExplainer.title} — a free tool by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

const FEATURES = ["Free", "No sign-up", "Next run times"];

// A fixed example, so the card shows what the tool does
const FIELDS = [
    {raw: "*/15", label: "minute"},
    {raw: "9-17", label: "hour"},
    {raw: "*", label: "day"},
    {raw: "*", label: "month"},
    {raw: "MON-FRI", label: "weekday"},
];
const RUNS = ["Mon 09:00", "Mon 09:15", "Mon 09:30"];

export default function Image() {
    return new ImageResponse(
        (
            <OgFrame path="minhajul.info/tools">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 520}}>
                        <div style={{fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05}}>
                            {cronExplainer.title}
                        </div>
                        <div style={{fontSize: 28, color: colors.muted, marginTop: 24, lineHeight: 1.4}}>
                            Cron schedules in plain English, with the next runs in your time zone.
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
                            width: 480,
                            padding: 28,
                            borderRadius: 24,
                            background: colors.surface,
                            border: `2px solid ${colors.lineStrong}`,
                            fontSize: 20,
                            lineHeight: 1.5,
                        }}
                    >
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            {FIELDS.map((field, index) => (
                                <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div style={{fontSize: 28, color: colors.accent}}>{field.raw}</div>
                                    <div style={{fontSize: 15, color: colors.subtle}}>{field.label}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{display: "flex", marginTop: 20, fontSize: 22, fontWeight: 700}}>
                            At every 15th minute past every hour from 9 through 17 on Monday through Friday.
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: 20,
                                paddingTop: 16,
                                borderTop: `2px solid ${colors.line}`,
                                fontSize: 18,
                                color: colors.muted,
                            }}
                        >
                            <div style={{display: "flex", fontSize: 14, color: colors.subtle, letterSpacing: 2}}>NEXT RUNS</div>
                            {RUNS.map(run => (
                                <div key={run} style={{display: "flex", marginTop: 6}}>{run}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </OgFrame>
        ),
        size
    );
}
