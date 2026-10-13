import {ImageResponse} from "next/og";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
import {highlights, profile} from "@/data/profile";
import {colors} from "@/lib/theme";

export const alt = `${profile.name} — ${profile.role}`;
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

export default async function Image() {
    const photo = await readFile(join(process.cwd(), "public/profile-pic.png"));
    const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 72,
                    background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${colors.glow}, ${colors.background})`,
                    color: colors.foreground,
                }}
            >
                <div style={{display: "flex", fontSize: 28, color: colors.muted}}>
                    <span style={{color: colors.accent}}>~/</span>minhajul.info
                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 760}}>
                        <div style={{fontSize: 72, fontWeight: 700, letterSpacing: -2}}>{profile.name}</div>
                        <div style={{fontSize: 34, color: colors.accent, marginTop: 12}}>{profile.role}</div>
                        <div style={{fontSize: 28, color: colors.muted, marginTop: 24, lineHeight: 1.4}}>
                            {profile.tagline}
                        </div>
                    </div>
                    <img
                        src={photoSrc}
                        alt=""
                        width={240}
                        height={240}
                        style={{borderRadius: 32, border: `2px solid ${colors.lineStrong}`}}
                    />
                </div>

                <div style={{display: "flex", gap: 20, fontSize: 20, color: colors.muted}}>
                    {highlights.map((item) => (
                        <div key={item.label} style={{display: "flex", gap: 8}}>
                            <span style={{color: colors.foreground, fontWeight: 700}}>{item.value}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    );
}
