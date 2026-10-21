import Image from "next/image";
import {profile} from "@/data/profile";

/** The profile photo is a transparent cutout, so it sits on a glowing panel anchored to the bottom edge. */
export default function ProfilePortrait() {
    return (
        <div className="group relative size-44 md:size-72 lg:size-80">
            {/* Tilted backing card for depth */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rotate-6 rounded-[2rem] border border-accent/25 bg-accent/5 transition-transform duration-500 group-hover:rotate-3"
            />

            <div className="relative size-full overflow-hidden rounded-[2rem] border border-line-strong bg-surface shadow-2xl shadow-black/50">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(59_130_246/0.35),transparent_60%)]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={500}
                    height={500}
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 176px"
                    className="relative size-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                />
            </div>
        </div>
    );
}
