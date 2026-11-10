import CronExplainer from "@/components/CronExplainer";
import CronGuide from "@/components/CronGuide";
import ToolPage from "@/components/ToolPage";
import {cronExplainer} from "@/data/tools";
import {toolMetadata} from "@/lib/metadata";

export const metadata = toolMetadata(cronExplainer);

export default function CronExplainerPage() {
    return (
        <ToolPage tool={cronExplainer}>
            <CronExplainer/>
            <CronGuide/>
        </ToolPage>
    );
}
