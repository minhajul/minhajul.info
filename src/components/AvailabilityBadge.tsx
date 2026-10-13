import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {profile} from "@/data/profile";

const badge =
    "inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-medium text-success";

function Dot() {
    return <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-success shadow-[0_0_8px_2px] shadow-success/50"/>;
}

/** Availability status pill; pass `href` to make it a link (e.g. to the contact page). */
export default function AvailabilityBadge({href}: { href?: string }) {
    if (!href) {
        return (
            <p className={badge}>
                <Dot/>
                {profile.availability}
            </p>
        );
    }

    return (
        <Link href={href} className={`group ${badge} transition-colors hover:border-success/50 hover:bg-success/15`}>
            <Dot/>
            {profile.availability}
            <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5"/>
        </Link>
    );
}
