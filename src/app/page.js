import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import Skills from "@/components/Skills";

export default function Home() {
    return (
        <div className="mt-10 lg:mt-24 p-6 lg:px-8 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
                <div className="col-span-1 lg:col-span-2">
                    <div className="text-center">
                        <Typewriter></Typewriter>
                    </div>

                    <p className="mt-3 text-base lg:text-lg font-semibold text-slate-300 hover:text-white sm:mt-5">
                        {"Experienced Software Engineer with a strong background in backend development and extensive experience in AWS. Skilled in a wide range of technologies, including Python, PHP, Laravel, Django, Django Rest Framework (DRF), JavaScript, Node.js, Next.js MySQL and PostgreSQL. Adaptable and proficient in navigating diverse technology stacks, platforms, and infrastructures to deliver high-quality, reliable software solutions. Demonstrated expertise in designing, developing, and maintaining scalable backend systems with a strong emphasis on performance, reliability, and cloud-based integration."}
                    </p>
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <Image
                        src="/minhajul.jpeg"
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


            <div className="mt-10 lg:mt-24">
                <Skills/>
            </div>
        </div>
    );
}
