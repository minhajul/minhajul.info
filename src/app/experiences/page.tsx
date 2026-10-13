import Heading from "@/components/Heading";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import {experiences} from '@/data/experiences';

export default function Page() {
    return (
        <div className="mx-auto max-w-4xl">
            <Heading
                title="Experience"
                subtitle="Over a decade of building and running production software"
            />

            <ExperienceTimeline experiences={experiences}/>
        </div>
    )
}
