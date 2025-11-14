import LinkedInPostFormatter from "@/components/LinkedInPostFormatter";

export const metadata = {
    title: "Portfolio of Minhaj - LinkedIn Post Formatter",
    description: "Transform your raw text into polished, professional LinkedIn posts"
};

export default function ToolForLinkedIn() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <LinkedInPostFormatter />
        </div>
    );
}