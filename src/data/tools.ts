export type Tool = {
    title: string;
    url: string;
    description: string;
};

export const linkedInPostFormatter: Tool = {
    "title": "LinkedIn Post Formatter",
    "url": "/tools/linkedin-post-formatter",
    "description": "Format LinkedIn posts with bold, italic, underline and lists, and preview exactly how they'll look in the feed before you publish."
};

export const cronExplainer: Tool = {
    "title": "Cron Expression Explainer",
    "url": "/tools/cron-explainer",
    "description": "Turn a cron expression into plain English and see its next run times in your timezone."
};

export const jwtDecoder: Tool = {
    "title": "JWT Decoder",
    "url": "/tools/jwt-decoder",
    "description": "Decode a JSON Web Token's header and payload and check when it expires. Your token never leaves the browser."
};

export const timezoneOverlap: Tool = {
    "title": "Time Zone Overlap Finder",
    "url": "/tools/timezone-overlap",
    "description": "Compare working hours across time zones and find the hours you share, for planning remote work and meetings."
};

export const tools: Tool[] = [
    linkedInPostFormatter,
    cronExplainer,
    jwtDecoder,
    timezoneOverlap,
];
