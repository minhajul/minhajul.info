import LinkedInPostFormatter from "@/components/LinkedInPostFormatter";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Portfolio website of Minhaj - LinkedIn Post Formatter",
    description: "Transform your raw text into polished, professional LinkedIn posts"
};

export default function ToolForLinkedIn() {
    return (
        <div>
            <LinkedInPostFormatter />
        </div>
    );
}
