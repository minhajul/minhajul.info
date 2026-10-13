import {experiences} from "@/data/experiences";

export type Highlight = {
    value: string;
    label: string;
};

const careerStart = new Date(`${experiences.map((experience) => experience.start).sort()[0]}-01`);
const yearsOfExperience = Math.floor(
    (Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const profile = {
    name: "Md Minhajul Islam",
    role: "Full-stack & DevOps Engineer",
    tagline: "I build scalable backend systems and the cloud infrastructure that keeps them running.",
    bio: "Over a decade of shipping production software with PHP/Laravel, Go, TypeScript and Next.js — and running it on AWS with Kubernetes, ArgoCD, Terraform and a full observability stack. I enjoy designing distributed systems, untangling complex technical problems, and mentoring the engineers I work with.",
    availability: "Open to remote & visa-sponsored roles",
};

export const highlights: Highlight[] = [
    {value: `${yearsOfExperience}+`, label: "Years building software"},
    {value: "~30%", label: "AWS cost reduction"},
    {value: "60%", label: "Lower query latency"},
    {value: "10+", label: "Engineers mentored"},
];
