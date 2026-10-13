import Heading from "@/components/Heading";
import ProjectCard from "@/components/ProjectCard";
import {projects} from "@/data/projects";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Open-source work exploring distributed systems, observability, and platform engineering.",
}

const sortedProjects = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export default function Projects() {
    return (
        <div>
            <Heading
                title="Projects"
                subtitle="Open-source work exploring distributed systems, observability, and platform engineering"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedProjects.map((project) => (
                    <ProjectCard key={project.url} project={project}/>
                ))}
            </div>
        </div>
    )
}
