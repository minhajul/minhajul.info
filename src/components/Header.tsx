'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

function isActive(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo({ onClick }: { onClick?: () => void }) {
    return (
        <Link href="/" onClick={onClick} className="font-mono text-lg font-semibold tracking-tight text-foreground">
            <span className="text-accent">~/</span>minhajul
        </Link>
    );
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const pathname = usePathname();

    const handleMenuClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-background/70 backdrop-blur-md">
            <nav aria-label="Global" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
                <Logo />
                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted hover:text-foreground"
                        aria-label="Open menu"
                    >
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <ul className="hidden md:flex md:items-center md:gap-1">
                    {navigation.map((item) => {
                        const active = isActive(pathname, item.href);
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${active
                                        ? "bg-surface-hover text-foreground"
                                        : "text-muted hover:text-foreground"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
                <div className="fixed inset-0 z-50 bg-black/60" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-line bg-background px-6 py-4 sm:max-w-sm">
                    <div className="flex h-8 items-center justify-between">
                        <Logo onClick={handleMenuClick} />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-muted hover:text-foreground"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <ul className="mt-8 space-y-1">
                        {navigation.map((item) => {
                            const active = isActive(pathname, item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={handleMenuClick}
                                        aria-current={active ? "page" : undefined}
                                        className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${active
                                            ? "bg-surface-hover text-foreground"
                                            : "text-muted hover:bg-surface hover:text-foreground"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
