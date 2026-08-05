"use client"

import {motion} from "framer-motion"
import Link from "next/link";
import Heading from "@/components/Heading";
import {experiences} from '@/data/experiences';

export default function Page() {
    return (
        <div>
            <Heading
                title="Experiences"
                subtitle="List of my professional experiences"
            />

            {experiences.map((experience, index) => (
                <motion.div
                    key={`${experience.title}-${index}`}
                    className="mb-5"
                    initial={{opacity: 0, x: -30}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    viewport={{once: true}}
                >
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
                        className="space-y-2 text-gray-300 leading-relaxed"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.3}}
                        viewport={{once: true}}
                    >
                        {experience.description.map((responsibility) => (
                            <li key={responsibility} className="flex text-sm items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                <span>{responsibility}</span>
                            </li>
                        ))}
                    </motion.ul>
                </motion.div>
            ))}
        </div>
    )
}
