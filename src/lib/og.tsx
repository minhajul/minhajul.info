import {readFile} from "node:fs/promises";
import {join} from "node:path";
import type {ReactNode} from "react";
import {profile} from "@/data/profile";
import {colors} from "@/lib/theme";

export const ogSize = {width: 1200, height: 630};

/** The profile photo as a data URL, since generated images can't load files by path. */
export async function loadProfilePhoto() {
    const photo = await readFile(join(process.cwd(), "public", profile.photo));
    return `data:image/png;base64,${photo.toString("base64")}`;
}

type OgFrameProps = {
    /** Shown in the top corner after "~/", e.g. "minhajul.info/tools". */
    path: string;
    children: ReactNode;
};

/** The branded backdrop shared by the site's generated share images. */
export function OgFrame({path, children}: OgFrameProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 72,
                background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${colors.glow}, ${colors.background})`,
                color: colors.foreground,
            }}
        >
            <div style={{position: "absolute", top: 72, left: 72, display: "flex", fontSize: 28, color: colors.muted}}>
                <span style={{color: colors.accent}}>~/</span>{path}
            </div>
            {children}
        </div>
    );
}
