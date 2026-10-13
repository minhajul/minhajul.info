import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
                <p className="text-sm text-subtle">
                    © {new Date().getFullYear()} Md Minhajul Islam
                </p>
                <SocialLinks/>
            </div>
        </footer>
    )
}
