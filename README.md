## My Personal Website

Source for [minhajul.info](https://minhajul.info) — my portfolio as a full-stack & DevOps engineer. It covers my
experience, open-source projects, skills, a small LinkedIn post formatting tool, and how to get in touch.

Every page is statically prerendered. Content lives in plain TypeScript data files, so updating the site rarely means
touching a component.

### Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components, React Compiler)
- [React 19](https://react.dev) and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with a small set of design tokens
- [Geist](https://vercel.com/font) Sans & Mono via `next/font`
- [Headless UI](https://headlessui.com) for the mobile menu, [Heroicons](https://heroicons.com) for icons
- [Tiptap](https://tiptap.dev) for the LinkedIn Post Formatter tool

### Getting Started

This project uses [`bun`](https://bun.sh) instead of `npm`.

```bash
bun install
cp .env.example .env.local   # sets NEXT_PUBLIC_SITE_URL
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. Pages update as you edit.

| Command             | What it does                   |
|---------------------|--------------------------------|
| `bun run dev`       | Start the development server   |
| `bun run build`     | Create a production build      |
| `bun run start`     | Serve the production build     |
| `bun run lint`      | Run ESLint                     |
| `bun run typecheck` | Type-check with `tsc --noEmit` |

### License

This project is licensed under the MIT License.

### Made with ❤️ by [[minhajul](https://github.com/minhajul)]
