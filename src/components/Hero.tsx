import Image from "next/image";
import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import SocialLinks from "@/components/SocialLinks";
import {buttonPrimary, buttonSecondary} from "@/lib/styles";
import {highlights, profile} from "@/data/profile";

export default function Hero() {
    return (
        <section>
            <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden"/>
                            <span className="relative inline-flex size-2 rounded-full bg-success"/>
                        </span>
                        {profile.availability}
                    </p>

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

            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
                {highlights.map((item) => (
                    <div key={item.label} className="flex flex-col-reverse bg-background p-6">
                        <dt className="text-sm text-muted">{item.label}</dt>
                        <dd className="mb-1 text-3xl font-semibold tracking-tight text-foreground">
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
