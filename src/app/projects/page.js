"use client"

import {motion} from "framer-motion"
import Link from "next/link";
import Heading from "@/components/partials/Heading";

const projects = [
    {
        "title": "Laravel Grafana",
        "url": "https://github.com/minhajul/laravel-grafana",
        "technologies": ['Laravel', 'Docker', 'Grafana', 'Prometheus'],
        "description": "Monitoring the performance of the Laravel app using Grafana, Prometheus, and Loki. Containerizing the project using Docker."
    },
    {
        "title": "Docker Cleaner",
        "url": "https://github.com/minhajul/docker-cleaner",
        "technologies": ['Golang', 'Docker', 'Bubbletea', 'Lipgloss'],
        "description" : "This is a terminal user interface (TUI) application built with Go and BubbleTea for cleaning up Docker images and containers."
    },
    {
        "title": "Go - Thundering Herd",
        "url": "https://github.com/minhajul/go-thundering-herd",
        "technologies": ['Golang', 'Docker', 'Kafka', 'System Design', 'PostgreSQL'],
        "description" : "A distributed system designed to send millions of emails to users across 100+ different time zones at exactly midnight their local time."
    },
    {
        "title": "Kubernetes Microservices",
        "url": "https://github.com/minhajul/kubernetes-microservices",
        "technologies": ['Laravel', 'Next.js', 'Docker', 'Grafana', 'Prometheus', 'Loki', 'Promtail'],
        "description" : "A cloud-native application stack featuring Laravel (Backend), Next.js (Frontend), and Kubernetes, complete with a full observability suite (Loki, Grafana, Fluent Bit)."
    },
    {
        "title": "Tailscale with Terraform",
        "url": "https://github.com/minhajul/learning-terraform/tree/main/automate-tailscale",
        "technologies": ['AWS', 'Terraform', 'Tailscale'],
        "description" : "This Terraform project provisions an AWS EC2 instance configured as a Tailscale exit node, along with all necessary networking infrastructures."
    }
];

export default function Projects() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <Heading title="Projects" subtitle="Highlighted projects demonstrating my expertise"></Heading>

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
                {projects.map((project, index) => (
                    <motion.article
                        key={index}
                        className="group will-reveal rounded-2xl p-5 sm:p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden"
                        whileHover="hover"
                        initial="initial"
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-600"
                            variants={{
                                initial: { width: 0, x: "-50%" },
                                hover: { width: "100%", x: "-50%" },
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />

                        <div className="flex flex-col h-full">
                            <h3 className="text-xl font-bold text-blue-400 hover:text-blue-500 transition mb-2">
                                <Link href={project.url} target="_blank" rel="noreferrer">
                                    {project.title}
                                </Link>
                            </h3>
                            <div className="py-3 flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <p key={index} className="text-xs bg-slate-600/20 text-gray-300 px-2 py-1 rounded-md">
                                        {tech}
                                    </p>
                                ))}
                            </div>

                            <p className="text-gray-300 text-base">
                                {project.description}
                            </p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    )
}