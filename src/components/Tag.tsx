import type {ReactNode} from "react";

export default function Tag({children}: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-muted">
            {children}
        </span>
    );
}
