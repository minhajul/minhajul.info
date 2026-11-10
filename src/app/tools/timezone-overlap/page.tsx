import TimezoneOverlapFinder from "@/components/TimezoneOverlapFinder";
import TimezoneOverlapGuide from "@/components/TimezoneOverlapGuide";
import ToolPage from "@/components/ToolPage";
import {timezoneOverlap} from "@/data/tools";
import {toolMetadata} from "@/lib/metadata";

export const metadata = toolMetadata(timezoneOverlap);

export default function TimezoneOverlapPage() {
    return (
        <ToolPage tool={timezoneOverlap}>
            <TimezoneOverlapFinder/>
            <TimezoneOverlapGuide/>
        </ToolPage>
    );
}
