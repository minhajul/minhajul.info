import Heading from "@/components/Heading";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import CopyEmailButton from "@/components/CopyEmailButton";
import {SocialIcon} from "@/components/SocialLinks";
import {EMAIL, socialLinks} from "@/data/social";
import {externalLinkProps} from "@/lib/links";
import {buttonPrimary} from "@/lib/styles";
import {ArrowUpRightIcon, EnvelopeIcon} from "@heroicons/react/20/solid";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch about remote, hybrid, or onsite software engineering and DevOps roles.",
}

export default function Contact() {
    return (
        <div>
            <Heading
                title="Contact"
                subtitle="Let's build something reliable together"
            />

            <section className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
                <AvailabilityBadge/>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/90 text-pretty">
                    I&apos;m open to remote, hybrid, and onsite roles in software engineering, full-stack
                    development, and DevOps. For onsite roles abroad, I&apos;m happy to relocate with visa
                    sponsorship, and I also take on freelance projects.
                </p>
                <p className="mt-4 max-w-2xl leading-7 text-muted text-pretty">
                    If you have an opportunity or want to discuss how my experience could support your team,
                    feel free to reach out. I&apos;d be glad to connect.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                        href={`mailto:${EMAIL}`}
                        className={buttonPrimary}
                    >
                        <EnvelopeIcon aria-hidden="true" className="size-4"/>
                        Email me
                    </a>
                    <CopyEmailButton/>
                </div>
            </section>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {socialLinks.map((link) => (
                    <li key={link.name}>
                        <a
                            href={link.href}
                            {...externalLinkProps(link.href)}
                            className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-hover"
                        >
                            <SocialIcon path={link.path} className="size-7 shrink-0 text-muted group-hover:text-foreground"/>
                            <span className="min-w-0 grow">
                                <span className="block font-medium text-foreground">{link.name}</span>
                                <span className="block truncate text-sm text-subtle">{link.handle}</span>
                            </span>
                            <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0 text-subtle group-hover:text-accent"/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
