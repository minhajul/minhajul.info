"use client"

import {motion} from "framer-motion"
import Link from "next/link";
import {tools} from "@/data/tools";

export default function Tools() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <h2 className="text-white font-semibold text-3xl">
                    Tools
                </h2>
                <p className="mt-3 text-white text-lg">Highlighted projects demonstrating my expertise</p>
            </motion.div>

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
                {tools.map((tool, index) => (
                    <motion.article
                        key={index}
                        className="group will-reveal rounded-2xl p-5 sm:p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden"
                        whileHover="hover"
                        initial="initial"
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-600"
                            variants={{
                                initial: {width: 0, x: "-50%"},
                                hover: {width: "100%", x: "-50%"},
                            }}
                            transition={{duration: 0.4, ease: "easeOut"}}
                        />

                        <div className="flex flex-col h-full">
                            <h3 className="text-xl font-bold text-blue-400 hover:text-blue-500 transition mb-2">
                                <Link href={tool.url}>
                                    {tool.title}
                                </Link>
                            </h3>

                            <p className="text-gray-300 text-base">
                                {tool.description}
                            </p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    )
}