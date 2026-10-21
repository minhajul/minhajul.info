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
import {findParentNode} from '@tiptap/core'
import type {ChainedCommands, Editor} from '@tiptap/core'

type Icon = typeof BoldIcon

type ToggleButton = {
    /** The mark or node the button toggles, as passed to editor.isActive() */
    name: string
    label: string
    icon: Icon
    shortcut: string[]
    toggle: (chain: ChainedCommands) => ChainedCommands
}

const MARK_BUTTONS: ToggleButton[] = [
    {name: 'bold', label: 'Bold', icon: BoldIcon, shortcut: ['Mod', 'B'], toggle: chain => chain.toggleBold()},
    {name: 'italic', label: 'Italic', icon: ItalicIcon, shortcut: ['Mod', 'I'], toggle: chain => chain.toggleItalic()},
    {name: 'underline', label: 'Underline', icon: UnderlineIcon, shortcut: ['Mod', 'U'], toggle: chain => chain.toggleUnderline()},
    {name: 'strike', label: 'Strikethrough', icon: StrikethroughIcon, shortcut: ['Mod', 'Shift', 'S'], toggle: chain => chain.toggleStrike()},
]

const LIST_BUTTONS: ToggleButton[] = [
    {name: 'bulletList', label: 'Bullet list', icon: ListBulletIcon, shortcut: ['Mod', 'Shift', '8'], toggle: chain => chain.toggleBulletList()},
    {name: 'orderedList', label: 'Numbered list', icon: NumberedListIcon, shortcut: ['Mod', 'Shift', '7'], toggle: chain => chain.toggleOrderedList()},
]

const LIST_TYPES = LIST_BUTTONS.map(button => button.name)

type SortDirection = 'ascending' | 'descending'

const SORT_OPTIONS: { direction: SortDirection, label: string, icon: Icon }[] = [
    {direction: 'ascending', label: 'Ascending (shortest to longest)', icon: BarsArrowUpIcon},
    {direction: 'descending', label: 'Descending (longest to shortest)', icon: BarsArrowDownIcon},
]

// Emojis that show up most in LinkedIn posts
const EMOJIS = [
    '👇', '👉', '✅', '🚀', '💡', '🔥', '🎯', '📌',
    '✨', '🙌', '👏', '🙏', '💪', '🤝', '❤️', '😊',
    '😂', '🤔', '🎉', '🏆', '📈', '📊', '💼', '🧠',
    '⚡', '⭐', '💬', '👀', '➡️', '❌', '⚠️', '📣',
]

const buttonClass = (isActive = false) =>
    `p-1.5 rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${isActive ? 'bg-accent/15 text-accent' : 'text-muted enabled:hover:bg-white/10 enabled:hover:text-foreground'
    }`

const menuPanelClass = 'z-20 rounded-xl border border-line-strong bg-surface p-1.5 shadow-2xl shadow-black/50 [--anchor-gap:0.5rem]'

/** Reorders the list around the cursor by item length, turning the selected paragraphs into a bullet list first if needed. */
function sortListByLength(editor: Editor, direction: SortDirection) {
    const chain = editor.chain().focus()

    if (!LIST_TYPES.some(type => editor.isActive(type))) {
        chain.toggleBulletList()
    }

    chain.command(({tr, commands}) => {
        const list = findParentNode(node => LIST_TYPES.includes(node.type.name))(tr.selection)
        if (!list) return false

        const {$from} = tr.selection
        const cursorItem = $from.node(list.depth + 1)
        const cursorOffset = $from.pos - $from.before(list.depth + 1)

        const items = [...list.node.children].sort((a, b) => direction === 'ascending'
            ? a.textContent.length - b.textContent.length
            : b.textContent.length - a.textContent.length)

        tr.replaceWith(list.start, list.start + list.node.content.size, items)

        // Follow the item the cursor was in, otherwise it lands after the list
        const itemStart = items
            .slice(0, items.indexOf(cursorItem))
            .reduce((position, item) => position + item.nodeSize, list.start)
        commands.setTextSelection(itemStart + cursorOffset)
        return true
    }).run()
}

const APPLE_KEYS: Record<string, string> = {Mod: '⌘', Shift: '⇧'}

/** Formats one of Tiptap's default shortcuts for the tooltip (⌘⇧S or Ctrl+Shift+S) and for aria-keyshortcuts. */
function describeShortcut(keys: string[]) {
    // Same check ProseMirror uses to bind Mod to ⌘, so the tooltip matches what actually works.
    // The toolbar only renders in the browser, so navigator is always the visitor's.
    const isApple = /Mac|iP(hone|[oa]d)/.test(navigator.platform)

    return {
        label: isApple
            ? keys.map(key => APPLE_KEYS[key] ?? key).join('')
            : keys.map(key => key === 'Mod' ? 'Ctrl' : key).join('+'),
        aria: keys.map(key => key === 'Mod' ? (isApple ? 'Meta' : 'Control') : key).join('+'),
    }
}

type ToolbarButtonProps = {
    label: string
    icon: Icon
    onClick: () => void
    shortcut?: string[]
    isActive?: boolean
    disabled?: boolean
}

const ToolbarButton = ({label, icon: Icon, onClick, shortcut, isActive, disabled}: ToolbarButtonProps) => {
    const keys = shortcut && describeShortcut(shortcut)

    return (
        <button
            type="button"
            aria-label={label}
            title={keys ? `${label} (${keys.label})` : label}
            aria-keyshortcuts={keys?.aria}
            aria-pressed={isActive}
            // Keep focus and the selection in the editor so typing carries on after a click
            onMouseDown={event => event.preventDefault()}
            onClick={onClick}
            disabled={disabled}
            className={buttonClass(isActive)}
        >
            <Icon aria-hidden="true" className="size-5"/>
        </button>
    )
}

const Divider = () => <div aria-hidden="true" className="mx-1 my-1.5 w-px bg-line"/>

const EmojiPicker = ({editor}: { editor: Editor }) => (
    <Popover>
        <PopoverButton aria-label="Add emoji" title="Add emoji" className={buttonClass()}>
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

const SortMenu = ({editor}: { editor: Editor }) => (
    <Popover>
        <PopoverButton aria-label="Sort list" title="Sort list" className={buttonClass()}>
            <BarsArrowDownIcon aria-hidden="true" className="size-5"/>
        </PopoverButton>
        <PopoverPanel anchor="bottom end" className={`${menuPanelClass} min-w-64`}>
            {({close}) => (
                <>
                    {SORT_OPTIONS.map(({direction, label, icon: Icon}) => (
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

const MenuBar = ({editor}: { editor: Editor }) => {
    // Tiptap doesn't re-render on every transaction, so subscribe to the bits the toolbar shows
    const state = useEditorState({
        editor,
        selector: ({editor}) => {
            const can = editor.can()

            return {
                active: Object.fromEntries([...MARK_BUTTONS, ...LIST_BUTTONS].map(({name}) => [name, editor.isActive(name)])),
                canUndo: can.undo(),
                canRedo: can.redo(),
                isEmpty: editor.isEmpty,
            }
        },
    })

    const renderToggle = ({name, toggle, ...button}: ToggleButton) => (
        <ToolbarButton
            key={name}
            {...button}
            isActive={state.active[name]}
            onClick={() => toggle(editor.chain().focus()).run()}
        />
    )

    return (
        <div className="flex flex-wrap gap-0.5 border-b border-line p-2">
            {MARK_BUTTONS.map(renderToggle)}

            <Divider/>
            <EmojiPicker editor={editor}/>

            <Divider/>
            <ToolbarButton
                label="Undo"
                icon={ArrowUturnLeftIcon}
                shortcut={['Mod', 'Z']}
                disabled={!state.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolbarButton
                label="Redo"
                icon={ArrowUturnRightIcon}
                shortcut={['Mod', 'Shift', 'Z']}
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
            {LIST_BUTTONS.map(renderToggle)}
            <SortMenu editor={editor}/>
        </div>
    )
}

type TiptapEditorProps = {
    editor: Editor | null
}

const frameClass = 'flex min-h-80 flex-col rounded-xl border border-line bg-background text-foreground/90'

export default function TiptapEditor({editor}: TiptapEditorProps) {
    if (!editor) {
        // Hold the editor's space so the page doesn't shift once it mounts
        return <div aria-hidden="true" className={frameClass}/>
    }

    return (
        <div className={`${frameClass} focus-within:border-line-strong`}>
            <MenuBar editor={editor}/>
            <div className="p-4 grow overflow-y-auto">
                <EditorContent editor={editor} className="tiptap-content h-full"/>
            </div>
        </div>
    )
}
