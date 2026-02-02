'use client'

import SkillCard from "@/components/SkillCard";
import { skills } from "@/data/skills";

export default function Skills() {
    return (
        <section className="py-10 lg:py-16 mt-10 lg:mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-block">
                        <h2 className="font-semibold text-slate-300 hover:text-white text-2xl lg:text-4xl mb-6">
                            Skills & Expertise
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-600 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-xl text-slate-300 hover:text-white max-w-3xl mx-auto mt-5">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <section className="mt-10">
                    <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} />
                        ))}
                    </div>
                </section>

                <div className="max-w-full lg:max-w-2xl mx-auto text-center mt-16">
                    <p className="border border-blue-400 p-1 rounded-md text-slate-300 hover:text-white">
                        Always learning and exploring new technologies
                    </p>
                </div>
            </div>
        </section>
    )
}