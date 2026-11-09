// Colour-coded like jwt.io: header, payload and signature each get their own accent.
// Shared by the decoder and its guide so the two always match.
export const JWT_SEGMENTS = {
    header: {label: "Header", hint: "Algorithm & token type", text: "text-rose-400", dot: "bg-rose-400"},
    payload: {label: "Payload", hint: "Data & claims", text: "text-violet-400", dot: "bg-violet-400"},
    signature: {label: "Signature", hint: "Not verified", text: "text-accent", dot: "bg-accent"},
};

export type JwtSegment = keyof typeof JWT_SEGMENTS;
