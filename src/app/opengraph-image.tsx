import {ImageResponse} from "next/og";
import {profile} from "@/data/profile";
import {colors} from "@/lib/theme";
import {loadProfilePhoto, OgFrame, ogSize} from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
    const photoSrc = await loadProfilePhoto();

    return new ImageResponse(
        (
            <OgFrame path="minhajul.info">
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
            </OgFrame>
        ),
        size
    );
}
