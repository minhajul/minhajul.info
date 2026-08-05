"use client"

import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import {projects} from "@/data/projects";

export default function Projects() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <Heading
                title="Projects"
                subtitle="Highlighted projects demonstrating my expertise"
            />

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
                {projects.map((project) => (
                    <Card key={project.url} className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-blue-400 hover:text-blue-500 transition mb-2">
                            <Link href={project.url} target="_blank" rel="noreferrer">
                                {project.title}
                            </Link>
                        </h3>
                        <div className="py-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <p key={tech} className="text-xs bg-slate-600/20 text-gray-300 px-2 py-1 rounded-md">
                                    {tech}
                                </p>
                            ))}
                        </div>

                        <p className="text-gray-300 text-base">
                            {project.description}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
