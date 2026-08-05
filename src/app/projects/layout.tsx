import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Portfolio website of Minhaj - Projects",
}

export default function ProjectsLayout({children}: { children: React.ReactNode }) {
    return children;
}
