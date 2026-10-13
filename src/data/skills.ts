export type SkillIcon = 'frontend' | 'backend' | 'devops' | 'observability' | 'database' | 'cloud';

export type Skill = {
    title: string;
    description: string;
    icon: SkillIcon;
    technologies: string[];
};

export const skills: Skill[] = [
    {
        title: "Frontend",
        description: "Interfaces that feel fast, fluid, and accessible",
        icon: "frontend",
        technologies: [
            "React",
            "Next.js",
            "Tailwind CSS"
        ]
    },
    {
        title: "Backend",
        description: "APIs, services, and business logic",
        icon: "backend",
        technologies: [
            "PHP",
            "Laravel",
            "Python",
            "Golang",
            "TypeScript",
            "Nest.js",
        ]
    },
    {
        title: "DevOps",
        description: "Containers, CI/CD, and infrastructure automation",
        icon: "devops",
        technologies: [
            "Docker",
            "Kubernetes",
            "ArgoCD",
            "Jenkins",
            "Terraform",
            "GitHub Actions",
        ]
    },
    {
        title: "Observability",
        description: "Metrics, logs, and dashboards for system health",
        icon: "observability",
        technologies: [
            "Grafana",
            "Prometheus",
            "Loki",
            "Tempo",
            // "OpenTelemetry",
        ]
    },
    {
        title: "Databases",
        description: "Query design, optimization, and caching",
        icon: "database",
        technologies: [
            "MySQL",
            "PostgreSQL",
            "Redis",
        ]
    },
    {
        title: "Cloud",
        description: "Scalable infrastructure and services",
        icon: "cloud",
        technologies: [
            "AWS",
        ]
    }
];
