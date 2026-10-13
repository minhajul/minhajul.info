"use client"

import TiptapEditor from "@/components/TiptapEditor";
import {
    SparklesIcon,
    ClipboardIcon,
    CheckIcon,
    ArrowPathIcon
} from '@heroicons/react/20/solid'
import {useCallback, useState} from "react";
import {tiptapJsonToLinkedInText} from "@/lib/TiptapTextFormatter";
import {generateJSON} from '@tiptap/core'
import {tiptapExtensions} from "@/lib/tiptapConfig";
import Heading from "@/components/Heading";
import {buttonPrimary, buttonSecondary} from "@/lib/styles";
import {useCopyToClipboard} from "@/lib/useCopyToClipboard";
import type {JSONContent} from '@tiptap/core'

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
    const [tiptapJson, setTiptapJson] = useState<JSONContent | null>(null);
    const [inputText, setInputText] = useState(''); // Used for word/char count

    const handleEditorChange = useCallback((json: JSONContent) => {
        setTiptapJson(json);
    }, []);

    const handleTextChange = useCallback((text: string) => {
        setInputText(text);
    }, []);

    const [formattedText, setFormattedText] = useState('');
    const {copied, copy} = useCopyToClipboard();

    const formatPost = () => {
        if (!tiptapJson) return;

        // Use the new conversion logic
        const formatted = tiptapJsonToLinkedInText(tiptapJson);

        setFormattedText(formatted);
    };

    const copyToClipboard = async () => {
        if (!formattedText) return;

        try {
            await copy(formattedText);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClear = () => {
        // Resetting tiptapJson to null will clear the editor via the useEffect in TiptapEditor
        setTiptapJson(null);
        setInputText('');
        setFormattedText('');
    };

    const loadExample = () => {
        setTiptapJson(generateJSON(EXAMPLE_POST_HTML, tiptapExtensions));
        setFormattedText('');
    };

    const charCount = inputText.length;
    const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

    return (
        <div>
            <Heading
                title="LinkedIn Post Formatter"
                subtitle="Transform your raw text into polished, professional LinkedIn posts"
            />

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

                <TiptapEditor
                    value={tiptapJson}
                    onChange={handleEditorChange}
                    onTextChange={handleTextChange}
                />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="font-mono text-xs text-subtle">
                        {wordCount} words · {charCount} characters
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClear}
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                        >
                            <ArrowPathIcon aria-hidden="true" className="size-4"/>
                            Clear
                        </button>
                        <button
                            onClick={formatPost}
                            disabled={!inputText.trim()}
                            type="button"
                            className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                            <SparklesIcon aria-hidden="true" className="size-4"/>
                            Generate
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-foreground">Formatted Post</h2>
                    {formattedText && (
                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className={buttonSecondary}
                        >
                            {copied ? (
                                <>
                                    <CheckIcon aria-hidden="true" className="size-4 text-success"/>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <ClipboardIcon aria-hidden="true" className="size-4"/>
                                    Copy
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="h-80 w-full overflow-y-auto rounded-xl border border-line bg-background p-4">
                    {formattedText ? (
                        <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                            {formattedText}
                        </p>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-center text-subtle">
                                Your formatted post will appear here...
                                <br/>
                                <span className="text-sm">Click Generate to see the magic ✨</span>
                            </p>
                        </div>
                    )}
                </div>

                {formattedText && (
                    <div className="mt-4 space-y-1 rounded-lg border border-success/20 bg-success/5 p-3">
                        <p className="text-sm text-muted">
                            ✓ Post formatted with proper spacing and line breaks
                        </p>
                        <p className="text-sm text-muted">
                            ✓ Rich text (bold, italic, lists) converted to LinkedIn-compatible Unicode
                        </p>
                    </div>
                )}
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
                        <span>Extra spaces are automatically cleaned up</span>
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
