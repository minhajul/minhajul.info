"use client"

import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import {tools} from "@/data/tools";

export default function Tools() {
    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <Heading
                title="Tools"
                subtitle="Highlighted projects demonstrating my expertise"
            />

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
                {tools.map((tool) => (
                    <Card key={tool.url} className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-blue-400 hover:text-blue-500 transition mb-2">
                            <Link href={tool.url}>
                                {tool.title}
                            </Link>
                        </h3>

                        <p className="text-gray-300 text-base">
                            {tool.description}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    )
}