import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import {footerNavigation} from "@/data/navigation";
import {profile} from "@/data/profile";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
                <div className="flex flex-col-reverse items-center gap-x-6 gap-y-3 sm:flex-row">
                    <p className="text-sm text-subtle">
                        © {new Date().getFullYear()} {profile.name}
                    </p>
                    <nav aria-label="Footer">
                        <ul className="flex items-center gap-4">
                            {footerNavigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <SocialLinks/>
            </div>
        </footer>
    )
}
