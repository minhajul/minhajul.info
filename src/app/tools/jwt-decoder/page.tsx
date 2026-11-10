import JwtDecoder from "@/components/JwtDecoder";
import JwtDecoderGuide from "@/components/JwtDecoderGuide";
import ToolPage from "@/components/ToolPage";
import {jwtDecoder} from "@/data/tools";
import {toolMetadata} from "@/lib/metadata";

export const metadata = toolMetadata(jwtDecoder);

export default function JwtDecoderPage() {
    return (
        <ToolPage tool={jwtDecoder} highlights={["Free", "No sign-up", "Token never leaves your browser"]}>
            <JwtDecoder/>
            <JwtDecoderGuide/>
        </ToolPage>
    );
}
