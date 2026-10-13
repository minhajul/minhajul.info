'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import {useEffect} from 'react'
import {BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon} from '@heroicons/react/24/outline'
import {tiptapExtensions} from '@/lib/tiptapConfig'
import type {Editor, JSONContent} from '@tiptap/core'

type MenuBarProps = {
    editor: Editor | null
}

const MenuBar = ({editor}: MenuBarProps) => {
    if (!editor) {
        return null
    }

    const buttonClass = (isActive: boolean) =>
        `p-2 rounded-md transition-colors ${isActive ? 'bg-accent/15 text-accent' : 'text-muted hover:bg-white/10 hover:text-foreground'
        }`

    return (
        <div className="flex flex-wrap gap-1 border-b border-line p-2">
            <button
                type="button"
                aria-label="Bold"
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
                <BoldIcon aria-hidden="true" className="size-5"/>
            </button>
            <button
                type="button"
                aria-label="Italic"
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
                <ItalicIcon aria-hidden="true" className="size-5"/>
            </button>
            <button
                type="button"
                aria-label="Bullet list"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
            >
                <ListBulletIcon aria-hidden="true" className="size-5"/>
            </button>
            <button
                type="button"
                aria-label="Numbered list"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive('orderedList'))}
            >
                <NumberedListIcon aria-hidden="true" className="size-5"/>
            </button>
        </div>
    )
}

type TiptapEditorProps = {
    value?: string | JSONContent | null
    onChange: (json: JSONContent) => void
    onTextChange: (text: string) => void
}

export default function TiptapEditor({value, onChange, onTextChange}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: tiptapExtensions,
        content: value || '',
        immediatelyRender: false,
        onUpdate: ({editor}) => {
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
        <div className="flex min-h-80 flex-col rounded-xl border border-line bg-background text-foreground/90 focus-within:border-line-strong">
            <MenuBar editor={editor}/>
            <div className="p-4 grow overflow-y-auto">
                <EditorContent editor={editor} className="tiptap-content h-full"/>
            </div>
        </div>
    )
}
