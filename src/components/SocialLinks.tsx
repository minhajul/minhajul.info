import {socialLinks} from "@/data/social";
import {externalLinkProps} from "@/lib/links";

export function SocialIcon({path, className}: { path: string; className: string }) {
    return (
        <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
            <path d={path}/>
        </svg>
    );
}

export default function SocialLinks({className = ""}: { className?: string }) {
    return (
        <ul className={`flex items-center gap-2 ${className}`}>
            {socialLinks.map((link) => (
                <li key={link.name}>
                    <a
                        href={link.href}
                        aria-label={link.name}
                        {...externalLinkProps(link.href)}
                        className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-surface-hover hover:text-foreground"
                    >
                        <SocialIcon path={link.path} className="size-5"/>
                    </a>
                </li>
            ))}
        </ul>
    );
}
