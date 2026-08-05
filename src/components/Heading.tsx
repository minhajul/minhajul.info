"use client"

import {motion} from "framer-motion";

type HeadingProps = {
    title: string;
    subtitle: string;
};

export default function Heading({title, subtitle}: HeadingProps) {
    return (
        <motion.div
            className="mb-10"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
        >
            <h2 className="text-white font-semibold text-2xl">{title}</h2>
            <p className="mt-3 text-white text-base">{subtitle}</p>
        </motion.div>
    )
}
