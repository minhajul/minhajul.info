// Unicode characters for LinkedIn-compatible rich text
const unicodeMap = {
    bold: {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠',
        'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺',
        'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
    },
    italic: {
        'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔',
        'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮',
        'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
    },
    // Bold-Italic is not consistently supported, so we'll stick to bold and italic separately
};

/**
 * Converts a string to its Unicode-formatted equivalent (bold or italic).
 * @param {string} text The input string.
 * @param {'bold' | 'italic'} style The style to apply.
 * @returns {string} The Unicode-formatted string.
 */
function applyUnicodeStyle(text, style) {
    const map = unicodeMap[style];
    if (!map) return text;

    return text.split('').map(char => map[char] || char).join('');
}

/**
 * Recursively processes a Tiptap JSON node and converts it to LinkedIn-compatible text.
 * @param {object} node The Tiptap JSON node.
 * @returns {string} The converted text.
 */
function processNode(node) {
    let text = '';

    if (node.type === 'text') {
        text = node.text;
        if (node.marks) {
            node.marks.forEach(mark => {
                if (mark.type === 'bold') {
                    text = applyUnicodeStyle(text, 'bold');
                } else if (mark.type === 'italic') {
                    text = applyUnicodeStyle(text, 'italic');
                }
                // Add other marks like underline, strikethrough if needed, but bold/italic are the most common.
            });
        }
    }

    if (node.content) {
        node.content.forEach(childNode => {
            text += processNode(childNode);
        });
    }

    if (node.type === 'paragraph') {
        // LinkedIn posts use double line breaks for paragraphs
        text = text + '\n\n';
    } else if (node.type === 'listItem') {
        // For list items, we'll prepend a bullet or number.
        // Tiptap's list structure is nested: bulletList/orderedList -> listItem -> paragraph
        // We need to handle the list item content and ensure it's on a new line.
        // The list marker will be added by the parent list node.
        // We'll rely on the paragraph handling for the line break after the content.
    } else if (node.type === 'bulletList') {
        // Process children (listItems) and prepend a bullet point to each.
        text = node.content.map(listItem => {
            // Tiptap listItem usually contains a paragraph
            const itemContent = processNode(listItem).trim();
            return '• ' + itemContent;
        }).join('\n'); // Single line break between list items
        text = text + '\n\n'; // Double line break after the whole list
    } else if (node.type === 'orderedList') {
        // Process children (listItems) and prepend a number to each.
        text = node.content.map((listItem, index) => {
            const itemContent = processNode(listItem).trim();
            return `${index + 1}. ${itemContent}`;
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
export function tiptapJsonToLinkedInText(tiptapJson) {
    if (!tiptapJson || !tiptapJson.content) {
        return '';
    }

    let result = tiptapJson.content.map(processNode).join('');

    // Clean up any trailing double newlines
    result = result.replace(/(\n\n)+$/, '');

    return result;
}
