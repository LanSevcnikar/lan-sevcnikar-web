# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lan Sevčnikar's personal website: a hand-written **static site** with three top-level
pages (`index.html` = About, `blog.html`, `portfolio.html`) plus one standalone HTML file
per blog post under `Posts/`. There is **no build system, no package.json, no framework,
and no tests** — the repo is served as-is. Hosting is **Netlify** (deploys the repo root as
static files; there is currently no `netlify.toml`).

> Migration intent: the owner wants to move this to **React** to make the blog easier to
> extend and to add new posts, while staying deployable on Netlify. Treat all of the
> existing HTML/CSS/JS as legacy — its formatting and patterns are not worth preserving;
> preserve the *content* (post text, images, copy) and the visual look, not the code style.

## Build / run / deploy

- **Run locally:** open the `.html` files directly, or serve the repo root with any static
  server (e.g. `python3 -m http.server`). No install step exists today.
- **CSS is compiled from SCSS.** Each `CSS/<section>/<section>.scss` compiles to a sibling
  `.css` + `.css.map` (see `CSS/blog/`, `CSS/header/`, `CSS/index/`, `CSS/portfolio/`,
  `CSS/posts/`). Shared design tokens live in `CSS/variables.scss` (`$primary` dark navy,
  `$secondary` orange `#ff6525`, `$terciray` light grey, `$border-radius`). The compiled
  `.css` files are committed and are what the HTML links to. There is no configured Sass
  CLI in the repo — compilation has been done via an editor extension (Live Sass Compiler).
  If you edit SCSS you must recompile so the committed `.css` stays in sync.
- **Deploy:** push to the repo; Netlify serves the static files. Keep any migration
  buildable to a static `dist`/`build` output so Netlify hosting still works.

## Architecture (current, legacy)

- **Pages are fully independent HTML documents** that each re-declare `<head>`, fonts
  (Google Montserrat), the `.opening` hero banner, and the `.header` nav. There is no
  templating or shared layout — the same markup is copy-pasted across `blog.html`,
  `portfolio.html`, and every `Posts/*/*.html`. Changing the nav/header means editing every
  file. This duplication is the main thing a React migration should eliminate (shared
  layout/header component).
- **The blog index is hard-coded.** `blog.html` contains one static `<div class="post">`
  block per post (image, date, title, description, link into `Posts/<id>/<id>.html`).
  Adding a post today means (1) creating `Posts/<id>/<id>.html`, (2) adding a thumbnail to
  `img/<id>.jpg`, and (3) hand-adding a card to `blog.html`. `JS/loadPosts.js` is a
  stub/dead end (a hardcoded string + a `console.log`); posts are **not** data-driven.
  Making posts data-driven (a manifest/list + generated cards) is the core blog improvement.
- **Post IDs are dates in `YYMMDD` form** (e.g. `240424`). A post lives in
  `Posts/<id>/<id>.html`; interactive posts also carry a `code/` subfolder with a runnable
  p5.js sketch (`sketch.js`, `index.html`, helpers). Post images (`240424-01.png`, …) sit
  next to the post HTML; the blog-index thumbnail lives separately in `img/<id>.jpg`.
- **JavaScript is tiny, per-feature, global-scoped, no modules/bundler:**
  - `JS/header.js` — sticky header on scroll (mutates `#myHeader`).
  - `JS/collapsible.js` — toggles `.collapsible` sections inside posts.
  - `JS/portTabs.js` — tab switching on the portfolio page.
  - `JS/loadPosts.js`, `JS/scrollArrow.js` — stubs / unused.
  - `JS/p5jsLib/` — vendored p5.js used by the animated hero background and by post sketches.
- **The `index.html` hero** embeds a large inline p5.js particle-network animation in a
  `<script>` block. Note its p5 lib `<script src="../../../JS/...">` paths are relative-broken
  (they resolve above the site root) — a known quirk of the legacy page.
- **Relative paths depend on directory depth:** root pages link `CSS/...`, `JS/...`,
  `img/...`; post pages (two levels deep) link `../../CSS/...`, `../../JS/...`. Any
  restructure must keep asset references consistent.

## Conventions & gotchas

- Author is Slovenian; copy uses the character `č` (e.g. "Sevčnikar") — keep UTF-8.
- BEM-ish class names are used loosely (`header__link`, `header__link--active`, `post__title`).
- Editing a post's look means editing `CSS/posts/posts.scss`; the nav lives in
  `CSS/header/header.scss` and is shared by all inner pages.
- Some posts contain minor HTML issues (nested `<li>`, stray characters) inherited from the
  legacy authoring — fix opportunistically when touching a post, don't treat as intentional.

## Working preferences (from the owner)

- The rework should make **adding/updating blog posts easy** and reduce duplication; that is
  the priority over pixel-preserving the current design.
- Legacy code style should **not** be carried over — reimplement idiomatically.
- Whatever the new stack, it **must remain deployable on Netlify** as a static build.
