import {useSyncExternalStore} from "react";

// Checking once a second is enough for any unit used here. React only re-renders when the rounded time changes.
function subscribe(onTick: () => void) {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
}

const getServerSnapshot = () => null;

/**
 * The current time in milliseconds, rounded down to `unit` (1000 for seconds, 60_000 for minutes)
 * and updated as it ticks over. It's null while the server renders and the page hydrates, so
 * anything based on the time renders only in the browser and can't cause a hydration mismatch.
 */
export function useNow(unit: number): number | null {
    return useSyncExternalStore(subscribe, () => Math.floor(Date.now() / unit) * unit, getServerSnapshot);
}
