/** Open http(s) links in a new tab; leave mailto:, tel: and internal links alone. */
export function externalLinkProps(href: string) {
    return /^https?:\/\//.test(href) ? {target: "_blank", rel: "noopener noreferrer"} : {};
}
