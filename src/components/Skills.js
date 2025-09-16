'use client'

import SkillCard from "@/components/SkillCard";

const ICONS = {
    // Categories
    frontend: "M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3V4Zm0 6h18v10H3V10Zm4 3v2h10v-2H7Z",
    backend: "M4 6a2 2 0 0 1 2-2h5v6H4V6Zm9-2h5a2 2 0 0 1 2 2v4h-7V4ZM4 14v4a2 2 0 0 0 2 2h5v-6H4Zm9 0h7v4a2 2 0 0 1-2 2h-5v-6Z",
    devops: "M12 7a5 5 0 0 0-4.58 3H5a4 4 0 0 0 0 8h2.42A5 5 0 1 0 12 7m0 2a3 3 0 1 1 0 6H7a2 2 0 0 1 0-4h5Z",
    databases: "M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4s9-1.79 9-4s-4.03-4-9-4m-9 7v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4c-2.02 1.51-5.36 2.5-9 2.5S5.02 11.51 3 10m0 6v3c0 2.21 4.03 4 9 4s9-1.79 9-4v-3c-2.02 1.51-5.36 2.5-9 2.5s-6.98-.99-9-2.5Z",
    cloud: "M19 18H6a4 4 0 1 1 1.48-7.73A6 6 0 0 1 22 12a4 4 0 0 1-3 6Z",

    // Frontend Technologies
    react: "M12 7.6a4.4 4.4 0 1 0 0 8.8a4.4 4.4 0 0 0 0-8.8m0-5.6c1.35 0 2.45 2.55 2.45 5.68S13.35 13.36 12 13.36S9.55 10.81 9.55 7.68S10.65 2 12 2m0 20c1.35 0 2.45-2.55 2.45-5.68S13.35 10.64 12 10.64S9.55 13.19 9.55 16.32S10.65 22 12 22m10-10c0 1.35-2.55 2.45-5.68 2.45S10.64 13.35 10.64 12S13.19 9.55 16.32 9.55S22 10.65 22 12M2 12c0 1.35 2.55 2.45 5.68 2.45S13.36 13.35 13.36 12S10.81 9.55 7.68 9.55S2 10.65 2 12",
    nextjs: "M3 4h18v16H3V4m4 3v2h10V7H7m0 4v2h10v-2H7Z",
    tailwind: "M12 2l4 8l8 2l-8 2l-4 8l-4-8l-8-2l8-2l4-8Z",
    accessibility: "M12 2c2.21 0 4 1.79 4 4v4H8V6c0-2.21 1.79-4 4-4m-5 8h10v12H7V10Z",

    // Backend Technologies
    php: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3Z",
    laravel: "M12 2l8 4v12l-8 4l-8-4V6l8-4m0 5l-5 2.5v5L12 17l5-2.5v-5L12 7Z",
    python: "M7 2h10v2H7V2m-2 4h14v2H5V6m-2 4h18v2H3v-2m2 4h14v2H5v-2m2 4h10v2H7v-2Z",
    nodejs: "M12 2l4 4l-4 4l-4-4l4-4m0 12l4 4l-4 4l-4-4l4-4Z",
    express: "M3 3h18v6H3V3m0 12h18v6H3v-6Z",
    golang: "M12 2l6 6l-6 6l-6-6l6-6Z",

    // DevOps Technologies
    docker: "M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm2 14H6v-2h8v2Zm4-4H6V8h12v4Z",
    kubernetes: "M12 2l6 6l-6 6l-6-6l6-6m0 16l8-8l2 2l-10 10L2 12l2-2l8 8Z",
    terraform: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3m0 3.2L6 8.9v6.2l6 2.7l6-2.7V8.9L12 6.2Z",
    pulumi: "M12 3l5 3v6l-5 3l-5-3V6l5-3Z",
    github_actions: "M12 2v20M2 12h20",

    // Databases Technologies
    mysql: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3Z",
    postgresql: "M4 4h16v4H4V4m0 6h16v4H4v-4m0 6h16v4H4v-4Z",

    // Cloud
    aws: "M12 2l10 6v8l-10 6L2 16V8l10-6Z",
};

const Icon = ({ path, size = 4, className = "" }) => (
    <svg viewBox="0 0 24 24" className={`h-${size} w-${size} ${className}`} fill="currentColor">
        <path d={path} />
    </svg>
);

const skills = [
    {
        title: "Frontend",
        description: "Interfaces that feel fast, fluid, and accessible",
        icon: <Icon path={ICONS.frontend} size={5} />,
        gradient: "from-indigo-500/90 to-fuchsia-500/90",
        technologies: [
            { name: "React", color: "indigo", icon: ICONS.react },
            { name: "Next.js", color: "blue", icon: ICONS.nextjs },
            { name: "Tailwind CSS", color: "cyan", icon: ICONS.tailwind },
            { name: "Accessibility", color: "emerald", icon: ICONS.accessibility }
        ]
    },
    {
        title: "Backend",
        description: "APIs, services, and business logic",
        icon: <Icon path={ICONS.backend} size={5} />,
        gradient: "from-blue-500/90 to-violet-500/90",
        technologies: [
            { name: "PHP", color: "amber", icon: ICONS.php },
            { name: "Laravel", color: "violet", icon: ICONS.laravel },
            { name: "Python", color: "rose", icon: ICONS.python },
            { name: "Node.js", color: "blue", icon: ICONS.nodejs },
            { name: "Express", color: "indigo", icon: ICONS.express },
            { name: "Golang", color: "emerald", icon: ICONS.golang }
        ]
    },
    {
        title: "DevOps",
        description: "Automation, CI/CD, and reliability",
        icon: <Icon path={ICONS.devops} size={5} />,
        gradient: "from-cyan-500/90 to-blue-600/90",
        technologies: [
            {name: "Docker", color: "cyan", icon: ICONS.docker},
            {name: "Kubernetes", color: "blue", icon: ICONS.kubernetes},
            {name: "Terraform", color: "slate", icon: ICONS.terraform},
            {name: "Pulumi", color: "purple", icon: ICONS.pulumi},
            {name: "GitHub Actions", color: "rose", icon: ICONS.github_actions}
        ]
    },
    {
        title: "Databases",
        description: "Query design, optimization, and caching",
        icon: <Icon path={ICONS.databases} size={5} />,
        technologies: [
            {name: "MySQL", color: "blue", icon: ICONS.mysql},
            {name: "PostgreSQL", color: "emerald", icon: ICONS.postgresql}
        ]
    },
    {
        title: "Cloud",
        description: "Scalable infrastructure and services",
        icon: <Icon path={ICONS.cloud} size={5} />,
        gradient: "from-sky-500/90 to-indigo-500/90",
        technologies: [
            {name: "AWS", color: "amber", icon: ICONS.aws}
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