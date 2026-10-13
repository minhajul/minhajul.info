import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import {skills} from "@/data/skills";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import {projects} from "@/data/projects";
import ExperienceSnapshot from "@/components/ExperienceSnapshot";
import {experiences} from "@/data/experiences";

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
        </div>
    );
}
