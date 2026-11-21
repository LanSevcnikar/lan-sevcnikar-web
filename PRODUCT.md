# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Employers and recruiters** in machine learning, data science, and software, evaluating Lan as a candidate. They skim quickly, often arriving from a CV, LinkedIn, or a direct link.
- **Peers and technical readers** who arrive through a specific post (or the original Medium article) and read the project write-up for its content.

## Product Purpose

Lan Sevčnikar's personal site: a short About, a blog of project write-ups (machine learning, data science, risk modelling, algorithms, graphics and creative coding), and a CV.

Success is either of two visits:

1. **Quick credibility check:** within a minute a visitor knows who Lan is (computer scientist / data scientist, Slovenia, Abelium/Flare, UL master's student) and what kind of work he does.
2. **A post read fully:** a technical reader finishes a write-up and understands the problem, approach, and result.

## Positioning

The work is the proof: concrete projects with real figures, numbers, and runnable demos, written in a candid first-person voice that admits trade-offs ("arguing with the optimiser"), rather than a list of claimed skills.

## Operating Context

- Posts are MDX files in `src/content/posts/`, one per project, with `meta` (slug, date, title, description, image, tags, optional `draft`, `wip`, `externalLink`). Adding a post must stay a single-file operation.
- Figures are mostly matplotlib PNGs (white backgrounds), some hand-made SVG charts and GIFs; alt text doubles as figure captions.
- Some posts embed standalone p5.js demos in an iframe (`public/demos/`) via `DemoFrame`.
- The CV is `public/CV.pdf`; contact is email (sevcnikar.lan@gmail.com) and GitHub.

## Capabilities and Constraints

- Static Vite + React + MDX build deployed on Netlify; must remain a static build.
- Bilingual interface (English / Slovenian). Interface strings and post titles/descriptions are translated; article prose stays in the language it was written in.
- Language: remember the visitor's choice; on a first visit follow the browser language (Slovenian browsers get Slovenian), otherwise English.
- Author name contains `č` — keep UTF-8 everywhere.

## Evidence on Hand

- 13 project posts (2019–2026) with real figures in `public/assets/`.
- Interactive demos: Wolfenstein-style raycaster, traveling-salesperson (ant colony) solver.
- CV PDF, portrait `public/assets/img/me.jpg`.
- No testimonials, client logos, or metrics about the site itself; do not invent any.

## Product Principles

1. The work leads; claims follow from it. Show figures, numbers, and demos before adjectives.
2. A recruiter must be able to place Lan within one screen; never bury role, location, and current position.
3. Reading a post is the core experience; prose, figures, and captions get the most care.
4. Publishing a new post stays a one-file job with no hand-edited indexes.
