import LinkedInFormatterGuide from "@/components/LinkedInFormatterGuide";
import LinkedInPostFormatter from "@/components/LinkedInPostFormatter";
import ToolPage from "@/components/ToolPage";
import {linkedInPostFormatter} from "@/data/tools";
import {toolMetadata} from "@/lib/metadata";

export const metadata = toolMetadata(linkedInPostFormatter);

export default function ToolForLinkedIn() {
    return (
        <ToolPage tool={linkedInPostFormatter}>
            <LinkedInPostFormatter/>
            <LinkedInFormatterGuide/>
        </ToolPage>
    );
}
