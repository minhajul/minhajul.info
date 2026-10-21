"use client"

import TiptapEditor from "@/components/TiptapEditor";
import LinkedInPostPreview from "@/components/LinkedInPostPreview";
import {ClipboardIcon, CheckIcon} from '@heroicons/react/20/solid'
import {useState} from "react";
import {useEditor} from "@tiptap/react";
import {tiptapJsonToLinkedInText} from "@/lib/TiptapTextFormatter";
import {tiptapExtensions} from "@/lib/tiptapConfig";
import Heading from "@/components/Heading";
import {buttonPrimary} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";

// LinkedIn rejects posts longer than this
const CHARACTER_LIMIT = 3000;

const EXAMPLE_POST_HTML = `
<p>I just launched my new project and I'm excited to share it with you all</p>
<p>It took 6 months of hard work but we finally made it happen</p>
<p>Here are 3 key lessons I learned along the way:</p>
<ol>
<li><p>Consistency beats perfection every time</p></li>
<li><p>Community support is everything</p></li>
<li><p>Small wins lead to big victories</p></li>
</ol>
<p>What's a project you're proud of? Let me know in the comments! 👇</p>
`;

export default function LinkedInPostFormatter() {
    const [formattedText, setFormattedText] = useState('');
    const {copied, copy} = useCopyToClipboard();

    const editor = useEditor({
        extensions: tiptapExtensions,
        immediatelyRender: false,
        // The preview and the copied text update live as you type
        onUpdate: ({editor}) => setFormattedText(tiptapJsonToLinkedInText(editor.getJSON())),
    });

    const copyToClipboard = async () => {
        if (!formattedText) return;

        try {
            await copy(formattedText);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const loadExample = () => {
        editor?.chain().focus().setContent(EXAMPLE_POST_HTML).run();
    };

    const charCount = formattedText.length;
    const wordCount = formattedText.trim() ? formattedText.trim().split(/\s+/).length : 0;
    const isOverLimit = charCount > CHARACTER_LIMIT;

    return (
        <div>
            <Heading
                title="LinkedIn Post Formatter"
                subtitle="Transform your raw text into polished, professional LinkedIn posts"
            />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-foreground">
                            Write Your Post
                        </h2>
                        <button
                            onClick={loadExample}
                            type="button"
                            className="text-sm font-medium text-accent transition-colors hover:text-foreground"
                        >
                            Load Example
                        </button>
                    </div>

                    <TiptapEditor editor={editor}/>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="font-mono text-xs text-subtle">
                            {wordCount} words ·{' '}
                            <span className={isOverLimit ? 'text-red-400' : undefined}>
                                {charCount.toLocaleString()} / {CHARACTER_LIMIT.toLocaleString()} characters
                            </span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            disabled={!formattedText}
                            type="button"
                            className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                            {copied ? (
                                <>
                                    <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <ClipboardIcon aria-hidden="true" className="size-4"/>
                                    Copy text
                                </>
                            )}
                        </button>
                    </div>
                    {isOverLimit && (
                        <p className="mt-2 text-sm text-red-400">
                            LinkedIn posts can be at most {CHARACTER_LIMIT.toLocaleString()} characters.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                    <LinkedInPostPreview text={formattedText}/>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <h2 className="mb-3 font-semibold text-foreground">
                    Formatting Tips
                </h2>
                <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-accent">•</span>
                        <span>Each line break in your input becomes a paragraph</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-accent">•</span>
                        <span>Only the first three lines show before &quot;...more&quot;, so open with a hook</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-accent">•</span>
                        <span>Emojis and special characters are preserved</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-accent">•</span>
                        <span>Use numbered lists or bullet points for better structure</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
