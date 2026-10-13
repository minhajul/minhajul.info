import {ImageResponse} from "next/og";
import {colors} from "@/lib/theme";

export const size = {width: 180, height: 180};
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.background,
                    color: colors.foreground,
                    fontSize: 84,
                    fontWeight: 700,
                }}
            >
                <span style={{color: colors.accent}}>~/</span>m
            </div>
        ),
        size
    );
}
