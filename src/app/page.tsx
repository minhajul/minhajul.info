import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import {skills} from "@/data/skills";
import SkillCard from "@/components/SkillCard";

export default function Home() {
    return (
        <div className="space-y-24">
            <Hero/>

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
