"use client"

import {motion} from "framer-motion";

export default function Heading({title, subtitle}) {
    return (
        <motion.div
            className="mb-12"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
        >
            <h2 className="text-white font-semibold text-3xl">{title}</h2>
            <p className="mt-3 text-white text-lg">{subtitle}</p>
        </motion.div>
    )
}