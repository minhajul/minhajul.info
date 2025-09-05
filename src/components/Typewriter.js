'use client'

import {AnimatePresence, motion} from "framer-motion"
import {useEffect, useState} from "react";

const sentences = [
    "Hello, I am Minhajul 👋",
    "A Full Stack Software Engineer!",
    "DevOps Enthusiast!",
]

export default function Typewriter() {
    const [index, setIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
        const currentSentence = sentences[index]
        let i = 0
        const interval = setInterval(() => {
            setDisplayText(currentSentence.slice(0, i + 1))
            i++
            if (i === currentSentence.length) {
                clearInterval(interval)
                // Wait 1.5s then show next sentence
                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % sentences.length)
                    setDisplayText("")
                }, 1500)
            }
        }, 100) // typing speed per character

        return () => clearInterval(interval)
    }, [index])

    return (
        <div className="font-semibold text-slate-300 hover:text-white text-4xl mt-3">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {displayText}
                    <span className="inline-block w-1 bg-white ml-1 animate-blink"></span>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}