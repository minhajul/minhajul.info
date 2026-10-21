import {ImageResponse} from "next/og";
import {profile} from "@/data/profile";
import {linkedInPostFormatter} from "@/data/tools";
import {colors} from "@/lib/theme";
import {loadProfilePhoto, OgFrame, ogSize} from "@/lib/og";

export const alt = `${linkedInPostFormatter.title} — a free tool by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

const FEATURES = ["Free", "No sign-up", "Live preview"];

export default async function Image() {
    const photoSrc = await loadProfilePhoto();

    return new ImageResponse(
        (
            <OgFrame path="minhajul.info/tools">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: 560}}>
                        <div style={{fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05}}>
                            {linkedInPostFormatter.title}
                        </div>
                        <div style={{fontSize: 28, color: colors.muted, marginTop: 24, lineHeight: 1.4}}>
                            Bold, italic, underline and lists, with a live preview of your post.
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

                    {/* A mock post, so the card shows what the tool does */}
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
                        <div style={{display: "flex", alignItems: "center", gap: 14}}>
                            <img
                                src={photoSrc}
                                alt=""
                                width={56}
                                height={56}
                                style={{borderRadius: 999, background: colors.background, objectFit: "cover"}}
                            />
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{fontSize: 20, fontWeight: 700}}>{profile.name}</div>
                                <div style={{fontSize: 16, color: colors.subtle}}>{profile.role}</div>
                            </div>
                        </div>
                        <div style={{display: "flex", marginTop: 20, fontWeight: 700}}>I just launched my new project</div>
                        <div style={{display: "flex", marginTop: 12, color: colors.muted}}>
                            Here are 3 key lessons I learned along the way:
                        </div>
                        <div style={{display: "flex", flexDirection: "column", marginTop: 8, color: colors.muted}}>
                            <div style={{display: "flex"}}>1. Consistency beats perfection</div>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <span>2. Community is everything</span>
                                <span style={{color: colors.subtle}}>...more</span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 20,
                                paddingTop: 16,
                                borderTop: `2px solid ${colors.line}`,
                                fontSize: 17,
                                color: colors.subtle,
                            }}
                        >
                            <span>Like</span>
                            <span>Comment</span>
                            <span>Repost</span>
                            <span>Send</span>
                        </div>
                    </div>
                </div>
            </OgFrame>
        ),
        size
    );
}
