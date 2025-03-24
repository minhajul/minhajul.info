import Image from "next/image";
import Head from "next/head";

export default function Home() {
    return (
        <div className="personal-blog">
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <title>Minhajul Islam</title>

                <meta name="twitter:title" content="Minhajul Islam"/>
                <meta name="og:title" content="Minhajul Islam"/>

                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:description" content="A full-stack developer at Genofax"/>
                <meta name="twitter:site" content="@minhaj_cse"/>
                <meta name="twitter:image" content="/public/minhajul.jpeg"/>

                <meta name="og:site_name" content="A full-stack developer at Genofax"/>
                <meta name="og:image" content="/public/minhajul.jpeg"/>
                <meta name="og:type" content="website"/>
                <meta name="og:locale" content="en_US"/>

                <link rel="shortcut icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className="relative bg-white overflow-hidden">
                    <div className="hidden lg:block lg:absolute lg:inset-0" aria-hidden="true">
                        <svg className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
                            <defs><pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"></rect></pattern></defs>
                            <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor"></rect>
                            <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"></rect>
                        </svg>
                    </div>

                    <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
                        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
                            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                    <h2>
                                        <span className="block text-sm font-normal tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                                            {"Hi"}
                                        </span>
                                        <span className="mt-1 block tracking-tight">
                                            <span className="block mb-5 text-5xl animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text font-extrabold text-transparent">
                                                {"I'm Minhajul Islam"}
                                            </span>
                                            <span className="block text-normal font-bold text-black text-3xl mt-3">
                                                {"Software & Application Lead at "}
                                                <a target="_blank" rel="noreferrer" className="text-blue-400 font-extrabold" href="https://genofax.com">Genofax</a>
                                            </span>
                                        </span>
                                    </h2>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        {"Experienced Software Engineer with a strong background in backend development and extensive experience in AWS. Skilled in a wide range of technologies, including Python, PHP, Laravel, Django, Django Rest Framework (DRF), JavaScript, MySQL, PostgreSQL, React.js, and Next.js. Adaptable and proficient in navigating diverse technology stacks, platforms, and infrastructures to deliver high-quality, reliable software solutions. Demonstrated expertise in designing, developing, and maintaining scalable backend systems with a strong emphasis on performance, reliability, and cloud-based integration."}
                                    </p>

                                    <p className="mt-6 text-gray-500">
                                        You can also find me on
                                        <a target="_blank" rel="noreferrer" className="text-black font-bold ml-1" href="https://twitter.com/minhaj_cse">Twitter</a>,
                                        <a target="_blank" rel="noreferrer" className="text-black font-bold" href="https://www.linkedin.com/in/minhajul52/"> LinkedIn</a> and
                                        <a target="_blank" rel="noreferrer" className="text-black font-bold" href="https://github.com/minhajul"> Github</a>.
                                    </p>
                                </div>

                                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                                    <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true">
                                        <defs>
                                            <pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"></rect>
                                            </pattern>
                                        </defs>
                                        <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor"></rect>
                                        <rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"></rect>
                                    </svg>
                                    <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                        <div className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <Image
                                                src="/minhajul.jpeg"
                                                alt="Md Minhajul Islam"
                                                width="100"
                                                height="100"
                                                layout="responsive"
                                                objectFit="contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </main>
        </div>
    );
}
