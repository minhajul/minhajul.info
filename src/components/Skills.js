'use client'

import SkillCard from "@/components/SkillCard";

const skills = [
    {
        title: "Frontend",
        description: "Interfaces that feel fast, fluid, and accessible",
        icon: "frontend",
        gradient: "from-indigo-500/90 to-fuchsia-500/90",
        technologies: [
            { name: "React", text: "text-indigo-300", bg: "bg-indigo-500/10", ring: "ring-indigo-500/20", icon: "react" },
            { name: "Next.js", text: "text-blue-300", bg: "bg-blue-500/10", ring: "ring-blue-500/20", icon: "nextjs" },
            { name: "Tailwind CSS", text: "text-cyan-300", bg: "bg-cyan-500/10", ring: "ring-cyan-500/20", icon: "tailwind" },
            { name: "Accessibility", text: "text-emerald-300", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", icon: "accessibility" }
        ]
    },
    {
        title: "Backend",
        description: "APIs, services, and business logic",
        icon: "backend",
        gradient: "from-blue-500/90 to-violet-500/90",
        technologies: [
            { name: "PHP", text: "text-amber-300", bg: "bg-amber-500/10", ring: "ring-amber-500/20", icon: "php"},
            { name: "Laravel", text: "text-violet-300", bg: "bg-violet-500/10", ring: "ring-violet-500/20", icon: "laravel"},
            { name: "Python", text: "text-rose-300", bg: "bg-rose-500/10", ring: "ring-rose-500/20", icon: "python"},
            { name: "Node.js", text: "text-blue-300", bg: "bg-blue-500/10", ring: "ring-blue-500/20", icon: "nodejs"},
            { name: "Express", text: "text-indigo-300", bg: "bg-indigo-500/10", ring: "ring-indigo-500/20", icon: "express"},
            { name: "Golang", text: "text-emerald-300", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", icon: "golang" }
        ]
    },
    {
        title: "DevOps",
        description: "Automation, CI/CD, and reliability",
        icon: "devops",
        gradient: "from-cyan-500/90 to-blue-600/90",
        technologies: [
            {name: "Docker", text: "text-cyan-300", bg: "bg-cyan-500/10", ring: "ring-cyan-500/20", icon: "docker"},
            {name: "Kubernetes", text: "text-blue-300", bg: "bg-blue-500/10", ring: "ring-blue-500/20", icon: "kubernetes"},
            {name: "Terraform", text: "text-slate-300", bg: "bg-slate-500/10", ring: "ring-slate-500/20", icon: "terraform"},
            {name: "Pulumi", text: "text-purple-300", bg: "bg-purple-500/10", ring: "ring-purple-500/20", icon: "pulumi"},
            {name: "GitHub Actions", text: "text-rose-300", bg: "bg-rose-500/10", ring: "ring-rose-500/20", icon: "github_actions"}
        ]
    },
    {
        title: "Databases",
        description: "Query design, optimization, and caching",
        icon: "database",
        gradient: "bg-gradient-to-br from-emerald-500/90",
        technologies: [
            {name: "MySQL", text: "text-blue-300", bg: "bg-blue-500/10", ring: "ring-blue-500/20", icon: "mysql"},
            {name: "PostgreSQL", text: "text-emerald-300", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", icon: "postgresql"}
        ]
    },
    {
        title: "Cloud",
        description: "Scalable infrastructure and services",
        icon: "cloud",
        gradient: "from-sky-500/90 to-indigo-500/90",
        technologies: [
            {name: "AWS", text: "text-amber-300", bg: "bg-amber-500/10", ring: "ring-amber-500/20", icon: "aws"}
        ]
    }
];

export default function Skills() {
    return (
        <section className="py-10 lg:py-16 px-6 mt-10 lg:mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-block">
                        <h2 className="font-semibold text-slate-300 hover:text-white text-2xl lg:text-4xl mb-6">
                            Skills & Expertise
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-600 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-xl text-slate-300 hover:text-white max-w-3xl mx-auto mt-5">
                        Technologies and tools I use to bring ideas to life.
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
                        Always learning and exploring new technologies.
                    </p>
                </div>
            </div>
        </section>
    )
}