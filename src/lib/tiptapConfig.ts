import StarterKit from '@tiptap/starter-kit';
import type {Extensions} from '@tiptap/core';

export const tiptapExtensions: Extensions = [
    StarterKit.configure({
        // LinkedIn has no equivalent for these, so keep them out of the editor
        blockquote: false,
        code: false,
        codeBlock: false,
        heading: false,
        horizontalRule: false,
    }),
];
