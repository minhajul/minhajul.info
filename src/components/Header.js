'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="text-2xl font-semibold text-slate-300 hover:text-white">
                        Minhajul
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-300 hover:text-white"
                    >
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
                        Me
                    </Link>

                    {/*<Link href="/" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">*/}
                    {/*    Projects*/}
                    {/*</Link>*/}

                    <Link href="/experiences" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
                        Experiences
                    </Link>

                    <Link href="/contact" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
                        Contacts
                    </Link>
                </PopoverGroup>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex justify-between text-right">
                        <Link
                            href="/"
                            className="text-2xl font-semibold text-slate-300 hover:text-white"
                            onClick={handleMenuClick}
                        >
                            Minhajul
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-slate-300 hover:text-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
                                    onClick={handleMenuClick}
                                >
                                    Me
                                </Link>

                                {/*<Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
                                    onClick={handleMenuClick}
                                >
                                    Projects
                                </Link>*/}

                                <Link
                                    href="/experiences"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
                                    onClick={handleMenuClick}
                                >
                                    Experiences
                                </Link>

                                <Link
                                    href="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
                                    onClick={handleMenuClick}
                                >
                                    Contacts
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>

        // <header>
        //     <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        //         <div className="flex lg:flex-1">
        //             <Link href="/" className="text-2xl font-semibold text-slate-300 hover:text-white">
        //                 Minhajul
        //             </Link>
        //         </div>
        //         <div className="flex lg:hidden">
        //             <button
        //                 type="button"
        //                 onClick={() => setMobileMenuOpen(true)}
        //                 className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-300 hover:text-white"
        //             >
        //                 <Bars3Icon aria-hidden="true" className="size-6" />
        //             </button>
        //         </div>
        //         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        //             <Link href="/" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
        //                 Me
        //             </Link>
        //
        //             {/*<Link href="/" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">*/}
        //             {/*    Projects*/}
        //             {/*</Link>*/}
        //
        //             <Link href="/experiences" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
        //                 Experiences
        //             </Link>
        //
        //             <Link href="/contact" className="flex items-center gap-x-1 text-lg font-semibold text-slate-300 hover:text-white">
        //                 Contacts
        //             </Link>
        //         </PopoverGroup>
        //     </nav>
        //
        //     <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        //         <div className="fixed inset-0 z-50" />
        //         <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        //             <div className="flex justify-between text-right">
        //                 <Link
        //                     href="/"
        //                     className="text-2xl font-semibold text-slate-300 hover:text-white"
        //                     onClick={handleMenuClick}
        //                 >
        //                     Minhajul
        //                 </Link>
        //                 <button
        //                     type="button"
        //                     onClick={() => setMobileMenuOpen(false)}
        //                     className="-m-2.5 rounded-md p-2.5 text-slate-300 hover:text-white"
        //                 >
        //                     <span className="sr-only">Close menu</span>
        //                     <XMarkIcon aria-hidden="true" className="size-6" />
        //                 </button>
        //             </div>
        //             <div className="mt-6 flow-root">
        //                 <div className="-my-6 divide-y divide-gray-500/10">
        //                     <div className="space-y-2 py-6">
        //                         <Link
        //                             href="/"
        //                             className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
        //                             onClick={handleMenuClick}
        //                         >
        //                             Me
        //                         </Link>
        //
        //                         {/*<Link
        //                             href="/"
        //                             className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
        //                             onClick={handleMenuClick}
        //                         >
        //                             Projects
        //                         </Link>*/}
        //
        //                         <Link
        //                             href="/experiences"
        //                             className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
        //                             onClick={handleMenuClick}
        //                         >
        //                             Experiences
        //                         </Link>
        //
        //                         <Link
        //                             href="/contact"
        //                             className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-slate-300 hover:text-white"
        //                             onClick={handleMenuClick}
        //                         >
        //                             Contacts
        //                         </Link>
        //                     </div>
        //                 </div>
        //             </div>
        //         </DialogPanel>
        //     </Dialog>
        // </header>
    )
}
