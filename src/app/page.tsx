import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import {skills} from "@/data/skills";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import {projects} from "@/data/projects";
import ExperienceSnapshot from "@/components/ExperienceSnapshot";
import {experiences} from "@/data/experiences";
import Link from "next/link";
import CopyEmailButton from "@/components/CopyEmailButton";
import {profile} from "@/data/profile";
import {buttonPrimary} from "@/lib/styles";

const featuredProjects = projects.filter((project) => project.featured);

export default function Home() {
    return (
        <div className="space-y-24">
            <Hero/>

            <section>
                <SectionHeading eyebrow="Selected work" title="Featured projects" href="/projects" linkLabel="All projects"/>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.url} project={project}/>
                    ))}
                </div>
            </section>

            <section>
                <SectionHeading eyebrow="Career" title="Where I've worked" href="/experiences" linkLabel="Full experience"/>
                <ExperienceSnapshot experiences={experiences}/>
            </section>

            <section>
                <SectionHeading eyebrow="Toolbox" title="Skills & expertise"/>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                        <SkillCard key={skill.title} skill={skill}/>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(59_130_246/0.15),transparent_70%)]"/>
                <div className="relative">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">{profile.availability}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Have a project or role in mind?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted text-pretty">
                        I&apos;m happy to talk about backend systems, platform engineering, or how I could help your team ship.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className={buttonPrimary}
                        >
                            Get in touch
                        </Link>
                        <CopyEmailButton/>
                    </div>
                </div>
            </section>
        </div>
    );
}
