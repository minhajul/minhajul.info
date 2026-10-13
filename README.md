## My Personal Website

Source for [minhajul.info](https://minhajul.info) — my portfolio as a full-stack & DevOps engineer. It covers my experience, open-source projects, skills, a small LinkedIn post formatting tool, and how to get in touch.

Every page is statically prerendered. Content lives in plain TypeScript data files, so updating the site rarely means touching a component.

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

| Command             | What it does                    |
|---------------------|---------------------------------|
| `bun run dev`       | Start the development server    |
| `bun run build`     | Create a production build       |
| `bun run start`     | Serve the production build      |
| `bun run lint`      | Run ESLint                      |
| `bun run typecheck` | Type-check with `tsc --noEmit`  |

#### Environment variables

| Variable               | Purpose                                                                 |
|------------------------|-------------------------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for metadata, sitemap and social images. Defaults to `https://minhajul.info`. |

### Updating Content

Most changes only need an edit in `src/data/`:

| File                       | Controls                                                                    |
|----------------------------|-----------------------------------------------------------------------------|
| `src/data/profile.ts`      | Name, role, tagline, bio and availability badge text                        |
| `src/data/experiences.ts`  | Jobs, newest first. Dates are `"YYYY-MM"`; omit `end` for a current role    |
| `src/data/projects.ts`     | Projects. Optional `image` (from `public/projects/`) and `featured` (shown on the home page) |
| `src/data/skills.ts`       | Skill groups and their technologies                                         |
| `src/data/social.ts`       | Email address and social links                                              |
| `src/data/navigation.ts`   | Header navigation                                                           |
| `src/data/tools.ts`        | Entries on the Tools page                                                   |

Consecutive jobs at the same company are grouped automatically on the Experience page, and numbers such as `30%` or `500K+` in bullet points are highlighted.

### Project Structure

```
src/
├── app/          # Routes, layout, metadata, generated OG image / icon / manifest
├── components/   # UI components (Hero, ProjectCard, ExperienceTimeline, ...)
├── data/         # Site content (see above)
└── lib/          # Helpers: experience formatting, shared styles, theme colors, hooks
```

### Design Tokens

Colors and fonts are defined once as Tailwind theme tokens in `src/app/globals.css` (`bg-surface`, `text-muted`, `text-accent`, ...). Generated images and the web manifest can't read CSS variables, so they use the same values from `src/lib/theme.ts`. Keep the two in sync when changing the palette.

### License

This project is licensed under the MIT License.

### Made with ❤️ by [[minhajul](https://github.com/minhajul)]
