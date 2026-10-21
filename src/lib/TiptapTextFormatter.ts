import type {JSONContent} from '@tiptap/core';

type UnicodeStyle = 'bold' | 'italic' | 'boldItalic';

// Code points of 'A', 'a' and '0' in the Mathematical Sans-Serif blocks, which LinkedIn renders like real formatting
const unicodeOffsets: Record<UnicodeStyle, {upper: number; lower: number; digit?: number}> = {
    bold: {upper: 0x1D5D4, lower: 0x1D5EE, digit: 0x1D7EC},
    italic: {upper: 0x1D608, lower: 0x1D622},
    // There are no bold-italic digits, so fall back to bold ones
    boldItalic: {upper: 0x1D63C, lower: 0x1D656, digit: 0x1D7EC},
};

const COMBINING_UNDERLINE = '̲';
const COMBINING_STRIKETHROUGH = '̶';

const graphemes = new Intl.Segmenter();

/**
 * Converts a string to its Unicode-formatted equivalent.
 * @param {string} text The input string.
 * @param {UnicodeStyle} style The style to apply.
 * @returns {string} The Unicode-formatted string.
 */
function applyUnicodeStyle(text: string, style: UnicodeStyle): string {
    const {upper, lower, digit} = unicodeOffsets[style];

    return Array.from(text, char => {
        if (char >= 'A' && char <= 'Z') return String.fromCodePoint(upper + char.charCodeAt(0) - 65);
        if (char >= 'a' && char <= 'z') return String.fromCodePoint(lower + char.charCodeAt(0) - 97);
        if (digit && char >= '0' && char <= '9') return String.fromCodePoint(digit + char.charCodeAt(0) - 48);
        return char;
    }).join('');
}

/**
 * Draws a line under or through text by appending a combining mark to every character.
 * Works per grapheme so emojis made of several code points stay intact.
 */
function applyCombiningMark(text: string, mark: string): string {
    return Array.from(graphemes.segment(text), ({segment}) => segment + mark).join('');
}

function formatTextNode(node: JSONContent): string {
    let text = node.text || '';
    const marks = new Set(node.marks?.map(mark => mark.type));
    const isBold = marks.has('bold');
    const isItalic = marks.has('italic');

    if (isBold && isItalic) {
        text = applyUnicodeStyle(text, 'boldItalic');
    } else if (isBold) {
        text = applyUnicodeStyle(text, 'bold');
    } else if (isItalic) {
        text = applyUnicodeStyle(text, 'italic');
    }

    if (marks.has('underline')) {
        text = applyCombiningMark(text, COMBINING_UNDERLINE);
    }
    if (marks.has('strike')) {
        text = applyCombiningMark(text, COMBINING_STRIKETHROUGH);
    }

    return text;
}

/**
 * Recursively processes a Tiptap JSON node and converts it to LinkedIn-compatible text.
 * @param {object} node The Tiptap JSON node.
 * @returns {string} The converted text.
 */
function processNode(node: JSONContent): string {
    let text = '';

    if (node.type === 'text') {
        text = formatTextNode(node);
    } else if (node.type === 'hardBreak') {
        // Shift+Enter inserts a line break without starting a new paragraph
        text = '\n';
    }

    if (node.content) {
        node.content.forEach(childNode => {
            text += processNode(childNode);
        });
    }

    if (node.type === 'paragraph') {
        // LinkedIn posts use double line breaks for paragraphs
        text = text + '\n\n';
    } else if (node.type === 'bulletList') {
        // Tiptap's list structure is nested: bulletList/orderedList -> listItem -> paragraph,
        // so prepend the marker to each item's content here.
        text = (node.content || []).map(listItem => {
            const itemContent = processNode(listItem).trim();
            return '• ' + itemContent;
        }).join('\n'); // Single line break between list items
        text = text + '\n\n'; // Double line break after the whole list
    } else if (node.type === 'orderedList') {
        const start = node.attrs?.start ?? 1;
        text = (node.content || []).map((listItem, index) => {
            const itemContent = processNode(listItem).trim();
            return `${start + index}. ${itemContent}`;
        }).join('\n'); // Single line break between list items
        text = text + '\n\n'; // Double line break after the whole list
    }

    return text;
}

/**
 * Converts a Tiptap JSON document to a LinkedIn-compatible plain text string.
 * @param {object} tiptapJson The Tiptap JSON document object.
 * @returns {string} The formatted LinkedIn post text.
 */
export function tiptapJsonToLinkedInText(tiptapJson: JSONContent | null): string {
    if (!tiptapJson || !tiptapJson.content) {
        return '';
    }

    let result = tiptapJson.content.map(processNode).join('');

    // Clean up any trailing double newlines
    result = result.replace(/(\n\n)+$/, '');

    return result;
}
