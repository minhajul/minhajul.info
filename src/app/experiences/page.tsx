import Heading from "@/components/Heading";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import {experiences} from '@/data/experiences';
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Experience",
    description: "Over a decade of building and running production software across backend, cloud, and DevOps.",
}

export default function Page() {
    return (
        <div>
            <Heading
                title="Experience"
                subtitle="Over a decade of building and running production software"
            />

            <ExperienceTimeline experiences={experiences}/>
        </div>
    )
}
