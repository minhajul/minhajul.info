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

export const tools: Tool[] = [
    linkedInPostFormatter,
    cronExplainer,
];
