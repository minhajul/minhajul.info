import StarterKit from '@tiptap/starter-kit';
import type {Extensions} from '@tiptap/core';

export const tiptapExtensions: Extensions = [
    StarterKit.configure({
        // Disable code blocks and horizontal rule for a cleaner LinkedIn post
        codeBlock: false,
        horizontalRule: false,
    }),
];
