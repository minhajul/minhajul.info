'use client'

import {EditorContent, useEditorState} from '@tiptap/react'
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    BoldIcon,
    FaceSmileIcon,
    ItalicIcon,
    ListBulletIcon,
    NumberedListIcon,
    StrikethroughIcon,
    TrashIcon,
    UnderlineIcon,
} from '@heroicons/react/24/outline'
import type {Editor} from '@tiptap/core'

type Icon = typeof BoldIcon

type SortDirection = 'ascending' | 'descending'

const LIST_TYPES = ['bulletList', 'orderedList']

// Emojis that show up most in LinkedIn posts
const EMOJIS = [
    '👇', '👉', '✅', '🚀', '💡', '🔥', '🎯', '📌',
    '✨', '🙌', '👏', '🙏', '💪', '🤝', '❤️', '😊',
    '😂', '🤔', '🎉', '🏆', '📈', '📊', '💼', '🧠',
    '⚡', '⭐', '💬', '👀', '➡️', '❌', '⚠️', '📣',
]

const buttonClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${isActive ? 'bg-accent/15 text-accent' : 'text-muted enabled:hover:bg-white/10 enabled:hover:text-foreground'
    }`

const menuPanelClass = 'z-20 rounded-xl border border-line-strong bg-surface p-1.5 shadow-2xl shadow-black/50 [--anchor-gap:0.5rem]'

/** Reorders the list around the cursor by item length, turning the selected paragraphs into a bullet list first if needed. */
function sortListByLength(editor: Editor, direction: SortDirection) {
    const chain = editor.chain().focus()

    if (!LIST_TYPES.some(type => editor.isActive(type))) {
        chain.toggleBulletList()
    }

    chain.command(({tr, commands}) => {
        const {$from} = tr.selection

        for (let depth = $from.depth; depth > 0; depth--) {
            const list = $from.node(depth)
            if (!LIST_TYPES.includes(list.type.name)) continue

            const cursorItem = $from.node(depth + 1)
            const cursorOffset = $from.pos - $from.before(depth + 1)

            const items = Array.from({length: list.childCount}, (_, index) => list.child(index))
            items.sort((a, b) => direction === 'ascending'
                ? a.textContent.length - b.textContent.length
                : b.textContent.length - a.textContent.length)

            const start = $from.start(depth)
            tr.replaceWith(start, start + list.content.size, items)

            // Follow the item the cursor was in, otherwise it lands after the list
            const itemStart = items
                .slice(0, items.indexOf(cursorItem))
                .reduce((position, item) => position + item.nodeSize, start)
            commands.setTextSelection(itemStart + cursorOffset)
            return true
        }

        return false
    }).run()
}

type ToolbarButtonProps = {
    label: string
    icon: Icon
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
}

const ToolbarButton = ({label, icon: Icon, onClick, isActive, disabled}: ToolbarButtonProps) => (
    <button
        type="button"
        aria-label={label}
        title={label}
        aria-pressed={isActive}
        // Keep focus and the selection in the editor so typing carries on after a click
        onMouseDown={event => event.preventDefault()}
        onClick={onClick}
        disabled={disabled}
        className={buttonClass(isActive ?? false)}
    >
        <Icon aria-hidden="true" className="size-5"/>
    </button>
)

const Divider = () => <div aria-hidden="true" className="mx-1 my-1.5 w-px bg-line"/>

const EmojiPicker = ({editor}: { editor: Editor }) => (
    <Popover>
        <PopoverButton aria-label="Add emoji" title="Add emoji" className={buttonClass(false)}>
            <FaceSmileIcon aria-hidden="true" className="size-5"/>
        </PopoverButton>
        <PopoverPanel anchor="bottom start" className={`${menuPanelClass} grid grid-cols-8 gap-0.5`}>
            {({close}) => (
                <>
                    {EMOJIS.map(emoji => (
                        <button
                            key={emoji}
                            type="button"
                            aria-label={`Insert ${emoji}`}
                            onClick={() => {
                                close(editor.view.dom)
                                editor.chain().focus().insertContent(emoji).run()
                            }}
                            className="rounded-md p-1.5 text-lg leading-none transition-colors hover:bg-white/10"
                        >
                            {emoji}
                        </button>
                    ))}
                </>
            )}
        </PopoverPanel>
    </Popover>
)

const SortMenu = ({editor}: { editor: Editor }) => {
    const options: { direction: SortDirection, label: string, icon: Icon }[] = [
        {direction: 'ascending', label: 'Ascending (shortest to longest)', icon: BarsArrowUpIcon},
        {direction: 'descending', label: 'Descending (longest to shortest)', icon: BarsArrowDownIcon},
    ]

    return (
        <Popover>
            <PopoverButton aria-label="Sort list" title="Sort list" className={buttonClass(false)}>
                <BarsArrowDownIcon aria-hidden="true" className="size-5"/>
            </PopoverButton>
            <PopoverPanel anchor="bottom end" className={`${menuPanelClass} min-w-64`}>
                {({close}) => (
                    <>
                        {options.map(({direction, label, icon: Icon}) => (
                            <button
                                key={direction}
                                type="button"
                                onClick={() => {
                                    close(editor.view.dom)
                                    sortListByLength(editor, direction)
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                            >
                                <Icon aria-hidden="true" className="size-4"/>
                                {label}
                            </button>
                        ))}
                    </>
                )}
            </PopoverPanel>
        </Popover>
    )
}

const MenuBar = ({editor}: { editor: Editor }) => {
    // Tiptap doesn't re-render on every transaction, so subscribe to the bits the toolbar shows
    const state = useEditorState({
        editor,
        selector: ({editor}) => ({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            isUnderline: editor.isActive('underline'),
            isStrike: editor.isActive('strike'),
            isBulletList: editor.isActive('bulletList'),
            isOrderedList: editor.isActive('orderedList'),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
            isEmpty: editor.isEmpty,
        }),
    })

    return (
        <div className="flex flex-wrap gap-1 border-b border-line p-2">
            <ToolbarButton
                label="Bold"
                icon={BoldIcon}
                isActive={state.isBold}
                onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
                label="Italic"
                icon={ItalicIcon}
                isActive={state.isItalic}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
                label="Underline"
                icon={UnderlineIcon}
                isActive={state.isUnderline}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
            <ToolbarButton
                label="Strikethrough"
                icon={StrikethroughIcon}
                isActive={state.isStrike}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            />

            <Divider/>
            <EmojiPicker editor={editor}/>

            <Divider/>
            <ToolbarButton
                label="Undo"
                icon={ArrowUturnLeftIcon}
                disabled={!state.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolbarButton
                label="Redo"
                icon={ArrowUturnRightIcon}
                disabled={!state.canRedo}
                onClick={() => editor.chain().focus().redo().run()}
            />
            {/* Clearing goes through the editor's history, so Undo brings the text back */}
            <ToolbarButton
                label="Clear all"
                icon={TrashIcon}
                disabled={state.isEmpty}
                onClick={() => editor.chain().focus().clearContent().run()}
            />

            <Divider/>
            <ToolbarButton
                label="Bullet list"
                icon={ListBulletIcon}
                isActive={state.isBulletList}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
                label="Numbered list"
                icon={NumberedListIcon}
                isActive={state.isOrderedList}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <SortMenu editor={editor}/>
        </div>
    )
}

type TiptapEditorProps = {
    editor: Editor | null
}

export default function TiptapEditor({editor}: TiptapEditorProps) {
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
