"use client"

import {motion} from "framer-motion"
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        "title": "Laravel Grafana",
        "url": "https://github.com/minhajul/laravel-grafana",
        "tech": "laravel, Docker, Grafana, Prometheus",
        "image": "/projects/laravel-grafana.png",
        "description": "Monitoring the performance of the Laravel app using Grafana, Prometheus, and Loki. Containerizing the project using Docker."
    },
    {
        "title": "Docker Cleaner",
        "url": "https://github.com/minhajul/docker-cleaner",
        "tech": "Golang, Docker, Bubbletea, Lipgloss",
        "image": "/projects/docker-cleaner.png",
        "description" : "This is a terminal user interface (TUI) application built with Go and BubbleTea for cleaning up Docker images and containers."
    }
];

export default function Projects() {
    return (
        <div className="mt-10 lg:mt-24 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <h2 className="text-white font-semibold text-3xl">
                    Projects
                </h2>
                <p className="mt-3 text-white text-lg">Highlighted projects demonstrating my expertise</p>
            </motion.div>

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        viewport={{once: true}}
                    >
                        <div className="border border-slate-600 rounded-md p-5 flex flex-col h-full">
                            <h3 className="text-xl font-bold text-blue-400 mb-2">
                                <Link href={project.url} target="_blank" rel="noreferrer">
                                    {project.title}
                                </Link>
                            </h3>

                            <div className="py-2">
                                <Image
                                    loading="lazy"
                                    src={project.image}
                                    alt={project.title}
                                    width="500"
                                    height="100"
                                    className="rounded-lg object-cover"
                                />
                            </div>

                            <p className="text-gray-400 text-sm">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}