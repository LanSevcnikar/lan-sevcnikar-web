# Lan Sevčnikar — personal site

This is a React + Vite portfolio and blog. The visual system uses the supplied redesign as its source of truth: a dark editorial layout, Space Grotesk for interface text, IBM Plex Mono for metadata, and an orange accent.

## Development

```bash
npm install
npm run dev
```

Build the static Netlify output with `npm run build`; preview it with `npm run preview`.

## Add a post

Create one file in `src/content/posts/`, for example `2026-new-project.mdx`:

```mdx
export const meta = {
  date: '2026-07-26',
  title: 'A project title',
  description: 'One sentence for the blog index.',
  image: '/assets/img/thumbnail.jpg',
  tags: ['Python', 'Data'],
}

## A heading

Write standard Markdown here. Reusable React blocks such as `DemoFrame` and `Collapsible` can be imported when needed.
```

Posts are discovered and sorted by date automatically. No index file needs editing.
