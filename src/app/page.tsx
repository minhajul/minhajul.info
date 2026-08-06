import Typewriter from "@/components/Typewriter";
import Image from "next/image";
import {skills} from "@/data/skills";
import SkillCard from "@/components/SkillCard";

export default function Home() {
    return (
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-14">
                <div className="col-span-1 lg:col-span-2">
                    <div className="text-center">
                        <Typewriter />
                    </div>

                    <p className="mt-3 font-normal text-slate-300 sm:mt-5 leading-7">
                        I am a full-stack software engineer with advanced knowledge in DevOps.
                        I am skilled in developing scalable applications
                        using <strong>PHP/Laravel, Python/Django, Golang, Nest.js, Next.js</strong> and <strong>Tailwind CSS</strong>.

                        I have hands-on experience with DevOps tools,
                        including <strong>Docker, Kubernetes, ArgoCD, Jenkins, Grafana, Prometheus, Loki, Pulumi, Terraform, Nginx</strong> to
                        streamline development, deployment, and scaling processes on <strong>AWS</strong>.

                        My experience also includes designing distributed systems and microservices, as well as managing databases.

                        <span className="block pt-5">
                            I enjoy solving complex technical challenges and building scalable software that delivers real value for users and businesses.
                        </span>
                    </p>
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <Image
                        src="/profile-pic.png"
                        alt="Md Minhajul Islam"
                        width={500}
                        height={300}
                        className="object-cover"
                        priority
                    />

                    <div className="border text-normal text-center font-bold text-slate-300 hover:text-white text-sm p-2 mt-5">
                        Fullstack Software Engineer
                    </div>
                </div>
            </div>

            <div className="pt-10 lg:pt-14">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-block">
                            <h2 className="font-semibold text-slate-300 hover:text-white text-2xl mb-4">
                                Skills & Expertise
                            </h2>
                            <div className="h-1 w-32 bg-linear-to-r from-blue-400 to-teal-600 mx-auto rounded-full"></div>
                        </div>
                        <p className="text-slate-300 hover:text-white max-w-3xl mx-auto mt-3">
                            Technologies and tools I use to bring ideas to life
                        </p>
                    </div>

                    <section className="mt-10">
                        <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <SkillCard key={skill.title} skill={skill}/>
                            ))}
                        </div>
                    </section>

                    <div className="max-w-full lg:max-w-2xl mx-auto text-center mt-12">
                        <p className="border border-blue-400 p-1 rounded-md text-slate-300 hover:text-white">
                            Always learning and exploring new technologies
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
