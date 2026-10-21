import StarterKit from '@tiptap/starter-kit';
import {Placeholder} from '@tiptap/extensions';
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
    Placeholder.configure({
        placeholder: 'Write your post here, or load the example to see how it works…',
    }),
];
