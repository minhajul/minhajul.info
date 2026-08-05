"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

const BAR_VARIANTS = {
    initial: { width: 0, x: "-50%" },
    hover: { width: "100%", x: "-50%" },
};

const BAR_TRANSITION = { duration: 0.4, ease: "easeOut" as const };

type CardProps = {
    children: ReactNode;
    className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
    return (
        <motion.article
            className={`group rounded-2xl p-5 sm:p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden ${className}`}
            whileHover="hover"
            initial="initial"
            animate="initial"
        >
            <motion.div
                className="absolute top-0 left-1/2 h-0.5 bg-linear-to-r from-blue-400 via-purple-500 to-teal-600"
                variants={BAR_VARIANTS}
                transition={BAR_TRANSITION}
            />
            {children}
        </motion.article>
    );
}
