'use client';

import {motion} from "framer-motion"
import {useState} from 'react';
import {Copy, Check, Sparkles, RotateCcw} from 'lucide-react';

export default function LinkedInPostFormatter() {
    const [inputText, setInputText] = useState('');
    const [formattedText, setFormattedText] = useState('');
    const [copied, setCopied] = useState(false);

    const examplePost = `I just launched my new project and I'm excited to share it with you all
It took 6 months of hard work but we finally made it happen
Here are 3 key lessons I learned along the way:
1. Consistency beats perfection every time
2. Community support is everything
3. Small wins lead to big victories
What's a project you're proud of? Let me know in the comments! 👇`;

    const formatPost = () => {
        if (!inputText.trim()) return;

        // Split by newlines and process
        const lines = inputText.split('\n');
        const formatted = lines
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n\n');

        setFormattedText(formatted);
    };

    const copyToClipboard = async () => {
        if (!formattedText) return;

        try {
            await navigator.clipboard.writeText(formattedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClear = () => {
        setInputText('');
        setFormattedText('');
        setCopied(false);
    };

    const loadExample = () => {
        setInputText(examplePost);
        setFormattedText('');
    };

    const charCount = inputText.length;
    const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

    return (
        <div className="mt-10 lg:mt-16 p-6 lg:px-8 mx-auto max-w-7xl relative">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white"/>
                    </div>
                    <h2 className="text-white font-semibold text-3xl mb-3">
                        LinkedIn Post Formatter
                    </h2>
                    <p className="mt-3 text-white text-lg">
                        Transform your raw text into polished, professional LinkedIn posts
                    </p>
                </div>
            </motion.div>

            <div className="bg-white/5 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-blue-400">
                        Write Your Post
                    </h2>
                    <button
                        onClick={loadExample}
                        className="text-sm text-blue-400 font-medium transition-colors"
                    >
                        Load Example
                    </button>
                </div>

                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your raw text and click Generate to format it with proper spacing and structure."
                    className="bg-white/5 w-full h-80 p-4 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-gray-300 placeholder:text-gray-300"
                />

                <div className="flex items-center justify-between mt-4">
                    <div className="text-base text-gray-300">
                        {wordCount} words · {charCount} characters
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 px-4 py-2 text-gray-300"
                        >
                            <RotateCcw className="w-4 h-4"/>
                            Clear
                        </button>
                        <button
                            onClick={formatPost}
                            disabled={!inputText.trim()}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:text-gray-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-md"
                        >
                            <Sparkles className="w-4 h-4"/>
                            Generate
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 mt-8 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-blue-400">Formatted Post</h2>
                    {formattedText && (
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4"/>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4"/>
                                    Copy
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="w-full h-80 p-4 bg-white/5 border-1 border-slate-400 rounded-xl overflow-y-auto">
                    {formattedText ? (
                        <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                            {formattedText}
                        </p>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-slate-300 text-center">
                                Your formatted post will appear here...
                                <br/>
                                <span className="text-sm">Click Generate to see the magic ✨</span>
                            </p>
                        </div>
                    )}
                </div>

                {formattedText && (
                    <div className="mt-4 p-3 bg-white/5 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-300">
                            ✓ Post formatted with proper spacing and line breaks
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-white/5 mt-8 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    💡 Formatting Tips
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Each line break in your input becomes a paragraph</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Extra spaces are automatically cleaned up</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Emojis and special characters are preserved</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Use numbered lists or bullet points for better structure</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}