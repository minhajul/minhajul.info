import Image from "next/image";
import {ArrowUpRightIcon} from "@heroicons/react/20/solid";
import Tag from "@/components/Tag";
import type {Project} from "@/data/projects";

function repoSlug(url: string) {
    return url.replace(/^https?:\/\/(www\.)?github\.com\//, "");
}

function Preview({project}: { project: Project }) {
    if (project.image) {
        return (
            <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
            />
        );
    }

    return (
        <div className="flex size-full flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,rgb(59_130_246/0.18),transparent_60%)] p-5">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-white/15"/>
                <span className="size-2.5 rounded-full bg-white/15"/>
                <span className="size-2.5 rounded-full bg-white/15"/>
            </div>
            <div className="space-y-1 font-mono text-sm">
                <p className="text-muted">
                    <span className="text-accent">$</span> git clone {repoSlug(project.url)}
                </p>
                <p className="text-subtle">
                    <span aria-hidden="true">→ </span>{project.technologies.slice(0, 3).join(" · ")}
                </p>
            </div>
        </div>
    );
}

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({project}: ProjectCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-background">
                <Preview project={project}/>
            </div>

            <div className="flex grow flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-foreground">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="after:absolute after:inset-0 focus-visible:outline-none"
                        >
                            {project.title}
                        </a>
                    </h3>
                    <ArrowUpRightIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                </div>
                <p className="mt-2 grow text-sm leading-6 text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                    ))}
                </div>
            </div>
        </article>
    );
}
