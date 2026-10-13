import {ImageResponse} from "next/og";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
import {highlights, profile} from "@/data/profile";

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
                    background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.25), #09090b)",
                    color: "#f4f4f5",
                }}
            >
                <div style={{display: "flex", fontSize: 28, color: "#a1a1aa"}}>
                    <span style={{color: "#60a5fa"}}>~/</span>minhajul.info
                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 760}}>
                        <div style={{fontSize: 72, fontWeight: 700, letterSpacing: -2}}>{profile.name}</div>
                        <div style={{fontSize: 34, color: "#60a5fa", marginTop: 12}}>{profile.role}</div>
                        <div style={{fontSize: 28, color: "#a1a1aa", marginTop: 24, lineHeight: 1.4}}>
                            {profile.tagline}
                        </div>
                    </div>
                    <img
                        src={photoSrc}
                        alt=""
                        width={240}
                        height={240}
                        style={{borderRadius: 32, border: "2px solid rgba(255,255,255,0.16)"}}
                    />
                </div>

                <div style={{display: "flex", gap: 20, fontSize: 20, color: "#a1a1aa"}}>
                    {highlights.map((item) => (
                        <div key={item.label} style={{display: "flex", gap: 8}}>
                            <span style={{color: "#f4f4f5", fontWeight: 700}}>{item.value}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    );
}
