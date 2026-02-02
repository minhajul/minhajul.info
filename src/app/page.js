import Typewriter from "@/components/Typewriter";
import Image from "next/image";
import {skills} from "@/data/skills";
import SkillCard from "@/components/SkillCard";

export default function Home() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-14">
                <div className="col-span-1 lg:col-span-2">
                    <div className="text-center">
                        <Typewriter></Typewriter>
                    </div>

                    <p className="mt-3 text-base lg:text-lg font-normal text-slate-300 sm:mt-5 leading-7">
                        I am a full-stack software engineer with advanced knowledge in DevOps.
                        I specialize in developing scalable applications
                        using <strong>PHP</strong>, <strong>Javascript</strong>, <strong>Golang</strong>, <strong>Laravel</strong>, <strong>Livewire</strong> and
                        JavaScript frameworks such as <strong>Node.js</strong>, <strong>React</strong>,
                        and <strong>Next.js</strong>.

                        I have hands-on experience with DevOps tools,
                        including <strong>Docker</strong>, <strong>Kubernetes</strong>, <strong>Pulumi</strong>, <strong>Terraform</strong> to
                        streamline development, deployment, and scaling processes on <strong>AWS</strong>.

                        My experience also includes designing distributed systems and microservices, as well as managing
                        databases.

                        <span className="block pt-5">
                        I strive to apply my technical expertise to deliver impactful solutions while contributing to the success of forward-thinking technology teams.
                    </span>
                    </p>
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <Image
                        src="/profile-pic.png"
                        alt="Md Minhajul Islam"
                        width="500"
                        height="300"
                        style={{objectFit: 'cover'}}
                    />

                    <div className="border text-normal font-bold text-slate-300 hover:text-white text-sm p-2 mt-5">
                        {"Software & Application Lead at "}
                        <a href="https://genofax.com" target="_blank" rel="noreferrer" className="text-blue-400 font-extrabold">
                            Genofax
                        </a>
                    </div>
                </div>
            </div>

            <div className="py-10 lg:py-16 mt-10 lg:mt-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-block">
                            <h2 className="font-semibold text-slate-300 hover:text-white text-2xl lg:text-4xl mb-6">
                                Skills & Expertise
                            </h2>
                            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-600 mx-auto rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-300 hover:text-white max-w-3xl mx-auto mt-5">
                            Technologies and tools I use to bring ideas to life
                        </p>
                    </div>

                    <section className="mt-10">
                        <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill, index) => (
                                <SkillCard key={index} skill={skill} />
                            ))}
                        </div>
                    </section>

                    <div className="max-w-full lg:max-w-2xl mx-auto text-center mt-16">
                        <p className="border border-blue-400 p-1 rounded-md text-slate-300 hover:text-white">
                            Always learning and exploring new technologies
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
