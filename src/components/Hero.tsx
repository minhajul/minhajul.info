import Image from "next/image";
import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import SocialLinks from "@/components/SocialLinks";
import {buttonPrimary, buttonSecondary} from "@/lib/styles";
import {profile} from "@/data/profile";

export default function Hero() {
    return (
        <section>
            <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                    <AvailabilityBadge href="/contact"/>

                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        {profile.name}
                    </h1>
                    <p className="mt-3 font-mono text-sm text-accent sm:text-base">
                        {profile.role}
                    </p>

                    <p className="mt-6 text-lg text-foreground/90 text-pretty">
                        {profile.tagline}
                    </p>
                    <p className="mt-4 leading-7 text-muted text-pretty">
                        {profile.bio}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href="/contact"
                            className={`group ${buttonPrimary}`}
                        >
                            Get in touch
                            <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
                        </Link>
                        <Link
                            href="/projects"
                            className={buttonSecondary}
                        >
                            View projects
                        </Link>
                        <SocialLinks className="sm:ml-2"/>
                    </div>
                </div>

                <div className="shrink-0">
                    <Image
                        src="/profile-pic.png"
                        alt={profile.name}
                        width={500}
                        height={500}
                        sizes="(min-width: 768px) 288px, 160px"
                        className="size-40 rounded-3xl object-cover ring-1 ring-line-strong shadow-2xl shadow-accent/10 md:size-72"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
