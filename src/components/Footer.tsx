import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import SocialLinks from "@/components/SocialLinks";
import {footerNavigation} from "@/data/navigation";
import {profile} from "@/data/profile";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between lg:px-8">
                <p className="order-last text-sm text-subtle sm:order-first">
                    © {new Date().getFullYear()} {profile.name}
                </p>
                <div className="flex items-center gap-4">
                    <nav aria-label="Footer">
                        <ul className="flex items-center gap-4">
                            {footerNavigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1 h-9 rounded-full border border-line px-3.5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:bg-surface-hover hover:text-foreground"
                                    >
                                        {item.name}
                                        <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <span aria-hidden="true" className="h-5 w-px bg-line"/>
                    <SocialLinks/>
                </div>
            </div>
        </footer>
    )
}
