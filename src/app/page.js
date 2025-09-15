import Skills from "@/components/Skills";
import Hero from "@/components/Hero";

export default function Home() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl">
            <Hero/>
            <Skills/>
        </div>
    );
}
