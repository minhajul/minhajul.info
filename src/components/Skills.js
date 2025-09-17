'use client'

import SkillCard from "@/components/SkillCard";

const skills = [
    {
        title: "Frontend",
        description: "Interfaces that feel fast, fluid, and accessible",
        icon: "frontend",
        gradient: "from-indigo-500/90 to-fuchsia-500/90",
        technologies: [
            { name: "React", colorCode: "text-indigo-300 bg-indigo-500/10 ring-indigo-500/20"},
            { name: "Next.js", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            { name: "Tailwind CSS", colorCode: "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20"},
            { name: "Accessibility", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"}
        ]
    },
    {
        title: "Backend",
        description: "APIs, services, and business logic",
        icon: "backend",
        gradient: "from-blue-500/90 to-violet-500/90",
        technologies: [
            { name: "PHP", colorCode: "text-amber-300 bg-amber-500/10 ring-amber-500/20"},
            { name: "Laravel", colorCode: "text-violet-300 bg-violet-500/10 ring-violet-500/20"},
            { name: "Python", colorCode: "text-rose-300 bg-rose-500/10 ring-rose-500/20"},
            { name: "Node.js", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            { name: "Express", colorCode: "text-indigo-300 bg-indigo-500/10 ring-indigo-500/20"},
            { name: "Golang", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"}
        ]
    },
    {
        title: "DevOps",
        description: "Automation, CI/CD, and reliability",
        icon: "devops",
        gradient: "from-cyan-500/90 to-blue-600/90",
        technologies: [
            {name: "Docker", colorCode: "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20"},
            {name: "Kubernetes", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "Terraform", colorCode: "text-slate-300 bg-slate-500/10 ring-slate-500/20"},
            {name: "Pulumi", colorCode: "text-purple-300 bg-purple-500/10 ring-purple-500/20"},
            {name: "GitHub Actions", colorCode: "text-rose-300 bg-rose-500/10 ring-rose-500/20"}
        ]
    },
    {
        title: "Databases",
        description: "Query design, optimization, and caching",
        icon: "database",
        gradient: "bg-gradient-to-br from-emerald-500/90",
        technologies: [
            {name: "MySQL", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "PostgreSQL", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"}
        ]
    },
    {
        title: "Cloud",
        description: "Scalable infrastructure and services",
        icon: "cloud",
        gradient: "from-sky-500/90 to-indigo-500/90",
        technologies: [
            {name: "AWS", colorCode: "text-amber-300 bg-amber-500/10 ring-amber-500/20"}
        ]
    }
];

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