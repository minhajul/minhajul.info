"use client"

import {motion} from "framer-motion"
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import {experiences} from '@/data/experiences';

export default function Experiences() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">

            <Heading title="Experiences" subtitle="List of my professional experiences"></Heading>

            <div className="mb-16">
                {experiences.map((experience, index) => (
                    <motion.div
                        key={index}
                        className="mb-6 border-l-2 border-blue-400 pl-6 relative"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        viewport={{once: true}}
                    >
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-400 rounded-full"></div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-blue-400 mb-2">
                                <Link href={experience.url} target="_blank" rel="noreferrer">
                                    {experience.title} at {experience.company}
                                </Link>
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {experience.date_of_joining}
                            </p>
                        </div>

                        <motion.ul
                            className="space-y-3 text-gray-300 leading-relaxed"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.3}}
                            viewport={{once: true}}
                        >
                            {experience.description.map((responsibility, indexValue) => (
                                <li key={indexValue} className="flex items-start">
                                    <span className="text-blue-400 mr-2 mt-1">•</span>
                                    <span>{responsibility}</span>
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}