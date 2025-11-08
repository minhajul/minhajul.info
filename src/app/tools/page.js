'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, RotateCcw } from 'lucide-react';

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
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">
                        LinkedIn Post Formatter
                    </h1>
                    <p className="text-lg text-slate-600">
                        Transform your raw text into polished, professional LinkedIn posts
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Write Your Post</h2>
                            <button
                                onClick={loadExample}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Load Example
                            </button>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Write your post here...&#10;&#10;Paste your raw text and click Generate to format it with proper spacing and structure."
                            className="w-full h-80 p-4 border-2 border-slate-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-700 placeholder:text-slate-400"
                        />

                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-slate-500">
                                {wordCount} words · {charCount} characters
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleClear}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all font-medium"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Clear
                                </button>
                                <button
                                    onClick={formatPost}
                                    disabled={!inputText.trim()}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Generate
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Formatted Post</h2>
                            {formattedText && (
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="w-full h-80 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl overflow-y-auto">
                            {formattedText ? (
                                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                                    {formattedText}
                                </p>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-slate-400 text-center">
                                        Your formatted post will appear here...
                                        <br />
                                        <span className="text-sm">Click Generate to see the magic ✨</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {formattedText && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    ✓ Post formatted with proper spacing and line breaks
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">💡 Formatting Tips</h3>
                    <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Each line break in your input becomes a paragraph</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Extra spaces are automatically cleaned up</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Emojis and special characters are preserved</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Use numbered lists or bullet points for better structure</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}