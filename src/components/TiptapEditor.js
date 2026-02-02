'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon } from '@heroicons/react/24/outline'

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    const buttonClass = (isActive) =>
        `p-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10'
    }`

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-white/10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={buttonClass(editor.isActive('bold'))}
            >
                <BoldIcon aria-hidden="true" className="w-5 h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={buttonClass(editor.isActive('italic'))}
            >
                <ItalicIcon aria-hidden="true" className="w-5 h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
            >
                <ListBulletIcon aria-hidden="true" className="w-5 h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive('orderedList'))}
            >
                <NumberedListIcon aria-hidden="true" className="w-5 h-5" />
            </button>
        </div>
    )
}

export default function TiptapEditor({ value, onChange, onTextChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable code blocks and horizontal rule for a cleaner LinkedIn post
                codeBlock: false,
                horizontalRule: false,
            }),
        ],
        content: value || '',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            // 1. Pass the Tiptap JSON to the parent for formatting
            onChange(editor.getJSON());
            // 2. Pass the plain text to the parent for word/char count
            onTextChange(editor.getText());
        },
    })

    // Effect to set content when the parent's 'value' prop changes (e.g., on loadExample)
    useEffect(() => {
        if (editor && value && JSON.stringify(value) !== JSON.stringify(editor.getJSON())) {
            // We assume 'value' is the Tiptap JSON object here, or a string for initial load
            editor.commands.setContent(value)
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="border border-gray-300 rounded-xl bg-white/5 text-gray-300 min-h-[20rem] flex flex-col">
            <MenuBar editor={editor} />
            <div className="p-4 flex-grow overflow-y-auto">
                <EditorContent editor={editor} className="prose prose-invert max-w-none outline-none h-full" />
            </div>
        </div>
    )
}