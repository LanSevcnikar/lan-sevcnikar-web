# Lan Sevčnikar website

This site is a static React + Vite portfolio and blog, deployed to Netlify. The visual system is a dark editorial layout with Space Grotesk for interface text, IBM Plex Mono for metadata, and an orange accent.

## Run the site locally

Install dependencies once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

- `src/App.jsx` — routes and page composition.
- `src/components/` — shared React components such as the navigation, hero, collapsibles, and demo frames.
- `src/styles.css` — global layout and visual styling.
- `src/i18n.jsx` — English/Slovenian interface translations. English is the default on every fresh load.
- `src/content/posts/` — one MDX file per blog post.
- `public/assets/` — thumbnails and article images.
- `public/demos/` — isolated interactive project demos.
- `public/CV.pdf` — the CV shown on the Portfolio page.

## Create a new blog post

### 1. Create the MDX file

Add a new file under `src/content/posts/`. Use a date-prefixed filename so the folder stays easy to scan:

```text
src/content/posts/2026-my-new-project.mdx
```

Start with metadata:

```mdx
export const meta = {
  slug: 'my-new-project',
  date: '2026-07-26',
  title: 'My new project',
  description: 'A short sentence shown on the blog index.',
  image: '/assets/img/my-new-project.jpg',
  tags: ['Python', 'Data science'],
}
```

Required fields are `slug`, `date`, `title`, `description`, `image`, and `tags`.

Dates use `YYYY-MM-DD`. Posts are automatically sorted newest first. The slug becomes the URL:

```text
/blog/my-new-project
```

### 2. Write the article in Markdown

After the metadata, write normal Markdown:

```mdx
## What I built

Explain the problem, approach, and result.

![A useful figure](/assets/posts/my-new-project/result.png)
```

Images must live under `public/`, and their paths start with `/` when referenced from MDX.

### 3. Add an image

Place the thumbnail at:

```text
public/assets/img/my-new-project.jpg
```

Use the same path in `meta.image`. Additional article images can live in a dedicated folder such as:

```text
public/assets/posts/my-new-project/
```

### 4. Add a reusable interactive block when needed

For an existing standalone demo, import `DemoFrame`:

```mdx
import DemoFrame from '../../components/DemoFrame'

<DemoFrame
  src="/demos/my-new-project/"
  title="My new project demo"
  height={560}
/>
```

Put the demo files in `public/demos/my-new-project/`. The demo must have its own `index.html` because it runs in an iframe and should not depend on the React application.

For expandable content, import `Collapsible`:

```mdx
import Collapsible from '../../components/Collapsible'

<Collapsible title="Show the details">

The hidden content goes here.

</Collapsible>
```

### 5. Keep unfinished posts out of the public index

Add `draft: true` to the metadata:

```mdx
export const meta = {
  slug: 'unfinished-project',
  date: '2026-07-26',
  title: 'Unfinished project',
  description: 'Work in progress.',
  image: '/assets/img/unfinished-project.jpg',
  tags: ['Research'],
  draft: true,
}
```

Drafts are not shown on the homepage or Blog page, and their article route returns the not-found view.

### 6. Preview and validate

Run:

```bash
npm run build
```

Then check:

- the post appears in the expected date order;
- the thumbnail and all inline images load;
- the clean URL works after a page refresh;
- links open correctly;
- interactive demos fit on mobile and desktop;
- English and Slovenian interface toggles still work.

Once merged into `main`, Netlify builds and publishes the site automatically.

## Updating translations

Shared interface text lives in `src/i18n.jsx`. Add the English string and its Slovenian equivalent there. Blog article prose is authored in the language in which the post is written; post titles and descriptions have Slovenian overrides in the `postTranslations` object when needed.
