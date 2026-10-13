import Heading from "@/components/Heading";
import SocialLinks from "@/components/SocialLinks";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Portfolio website of Minhaj - Contact",
}

export default function Contact() {
    return (
        <div>
            <Heading
                title="Contact"
                subtitle="Get in touch with me"
            />

            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-slate-300 leading-7">
                    I am actively seeking freelance or remote opportunities in software engineering, full-stack
                    development, and DevOps engineering. <span className="bg-blue-400 text-white rounded-md p-0.5 mr-1">I am also open to full-time roles that offer visa sponsorship.</span>

                    If you have any opportunities or would like to discuss how my experience could support your team,
                    please feel free to reach out. I would be glad to connect.
                </p>
            </div>

            <SocialLinks size="lg" className="mt-8 justify-center"/>
        </div>
    )
}
