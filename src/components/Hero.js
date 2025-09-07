'use client'

import Image from "next/image";
import Typewriter from "@/components/Typewriter";

export default function Hero(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-14">
            <div className="col-span-1 lg:col-span-2">
                <div className="text-center">
                    <Typewriter></Typewriter>
                </div>

                <p className="mt-3 text-base lg:text-lg font-normal text-slate-300 sm:mt-5">
                    I am a full-stack software engineer with advanced knowledge in DevOps.
                    I specialize in developing scalable applications using <strong>PHP</strong>, <strong>Javascript</strong>, <strong>Golang</strong>, <strong>Laravel</strong>, <strong>Livewire</strong> and JavaScript frameworks such as <strong>Node.js</strong>, <strong>React</strong>, and <strong>Next.js</strong>.

                    I have hands-on experience with DevOps tools, including <strong>Docker</strong> and <strong>Kubernetes</strong>, to streamline development, deployment, and scaling processes on <strong>AWS</strong>.

                    My experience also includes designing distributed systems and microservices, as well as managing databases.

                    <span className="block pt-5">
                        I strive to apply my technical expertise to deliver impactful solutions while contributing to the success of forward-thinking technology teams.
                    </span>
                </p>
            </div>

            <div className="col-span-1 lg:col-span-1">
                <Image
                    src="/profile-pic.png"
                    alt="Md Minhajul Islam"
                    width="100"
                    height="100"
                    layout="responsive"
                    objectFit="contain"
                />

                <div className="border text-normal font-bold text-slate-300 hover:text-white text-sm p-2 mt-5">
                    {"Software & Application Lead at "}
                    <a target="_blank" rel="noreferrer" className="text-blue-400 font-extrabold" href="https://genofax.com">Genofax</a>
                </div>
            </div>
        </div>
    )
}