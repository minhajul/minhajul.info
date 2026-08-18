export type SkillIcon = 'frontend' | 'backend' | 'devops' | 'observability' | 'database' | 'cloud';

export type SkillTechnology = {
    name: string;
    colorCode: string;
};

export type Skill = {
    title: string;
    description: string;
    icon: SkillIcon;
    gradient: string;
    technologies: SkillTechnology[];
};

export const skills: Skill[] = [
    {
        title: "Frontend",
        description: "Interfaces that feel fast, fluid, and accessible",
        icon: "frontend",
        gradient: "from-indigo-500/90 to-fuchsia-500/90",
        technologies: [
            {name: "React", colorCode: "text-indigo-300 bg-indigo-500/10 ring-indigo-500/20"},
            {name: "Next.js", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "Tailwind CSS", colorCode: "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20"}
        ]
    },
    {
        title: "Backend",
        description: "APIs, services, and business logic",
        icon: "backend",
        gradient: "from-blue-500/90 to-violet-500/90",
        technologies: [
            {name: "PHP", colorCode: "text-amber-300 bg-amber-500/10 ring-amber-500/20"},
            {name: "Laravel", colorCode: "text-violet-300 bg-violet-500/10 ring-violet-500/20"},
            {name: "Python", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"},
            {name: "Golang", colorCode: "text-slate-300 bg-slate-500/10 ring-slate-500/20"},
            {name: "TypeScript", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"},
            {name: "Nest.js", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
        ]
    },
    {
        title: "DevOps",
        description: "Containers, CI/CD, and infrastructure automation",
        icon: "devops",
        gradient: "from-cyan-500/90 to-blue-600/90",
        technologies: [
            {name: "Docker", colorCode: "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20"},
            {name: "Kubernetes", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "ArgoCD", colorCode: "text-purple-300 bg-purple-500/10 ring-purple-500/20"},
            {name: "Jenkins", colorCode: "text-violet-300 bg-violet-500/10 ring-violet-500/20"},
            {name: "Terraform", colorCode: "text-slate-300 bg-slate-500/10 ring-slate-500/20"},
            {name: "GitHub Actions", colorCode: "text-violet-300 bg-violet-500/10 ring-violet-500/20"},
        ]
    },
    {
        title: "Observability",
        description: "Metrics, logs, and dashboards for system health",
        icon: "observability",
        gradient: "from-rose-500/90 to-orange-500/90",
        technologies: [
            {name: "Grafana", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "Prometheus", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"},
            {name: "Loki", colorCode: "text-purple-300 bg-purple-500/10 ring-purple-500/20"},
            {name: "Tempo", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            // {name: "OpenTelemetry", colorCode: "text-rose-300 bg-rose-500/10 ring-rose-500/20"},
        ]
    },
    {
        title: "Databases",
        description: "Query design, optimization, and caching",
        icon: "database",
        gradient: "bg-gradient-to-br from-emerald-500/90",
        technologies: [
            {name: "MySQL", colorCode: "text-blue-300 bg-blue-500/10 ring-blue-500/20"},
            {name: "PostgreSQL", colorCode: "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"},
            {name: "Redis", colorCode: "text-cyan-300 bg-cyan-500/10 ring-cyan-500/20"},
        ]
    },
    {
        title: "Cloud",
        description: "Scalable infrastructure and services",
        icon: "cloud",
        gradient: "from-sky-500/90 to-indigo-500/90",
        technologies: [
            {name: "AWS", colorCode: "text-amber-300 bg-amber-500/10 ring-amber-500/20"},
        ]
    }
];
