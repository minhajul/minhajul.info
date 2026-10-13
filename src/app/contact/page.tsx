import Heading from "@/components/Heading";
import CopyEmailButton from "@/components/CopyEmailButton";
import {EMAIL, socialLinks} from "@/components/SocialLinks";
import {profile} from "@/data/profile";
import {ArrowUpRightIcon, EnvelopeIcon} from "@heroicons/react/20/solid";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch about freelance, remote, or visa-sponsored software engineering and DevOps roles.",
}

const handles: Record<string, string> = {
    GitHub: "github.com/minhajul",
    LinkedIn: "linkedin.com/in/minhajul52",
    Email: "Send me a message",
};

export default function Contact() {
    return (
        <div>
            <Heading
                title="Contact"
                subtitle="Let's build something reliable together"
            />

            <section className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
                <p className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    <span className="size-1.5 rounded-full bg-success"/>
                    {profile.availability}
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/90 text-pretty">
                    I&apos;m looking for freelance or remote opportunities in software engineering, full-stack
                    development, and DevOps — and I&apos;m open to full-time roles that offer visa sponsorship.
                </p>
                <p className="mt-4 max-w-2xl leading-7 text-muted text-pretty">
                    If you have an opportunity or want to discuss how my experience could support your team,
                    feel free to reach out. I&apos;d be glad to connect.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                        href={`mailto:${EMAIL}`}
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-white"
                    >
                        <EnvelopeIcon aria-hidden="true" className="size-4"/>
                        Email me
                    </a>
                    <CopyEmailButton/>
                </div>
            </section>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {socialLinks.map((link) => {
                    const external = !link.href.startsWith("mailto:");
                    return (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                {...(external && {target: "_blank", rel: "noopener noreferrer"})}
                                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-hover"
                            >
                                <svg viewBox="0 0 32 32" fill="currentColor" className="size-7 shrink-0 text-muted group-hover:text-foreground" aria-hidden="true">
                                    <path d={link.path}/>
                                </svg>
                                <span className="min-w-0 grow">
                                    <span className="block font-medium text-foreground">{link.name}</span>
                                    <span className="block truncate text-sm text-subtle">{handles[link.name]}</span>
                                </span>
                                <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0 text-subtle group-hover:text-accent"/>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
