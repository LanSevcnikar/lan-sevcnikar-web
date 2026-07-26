# Writing posts

Each blog post is one file in `src/content/posts/`. Copy an existing `.mdx` file, give it a date-prefixed filename, and update its exported `meta` object.

`image` paths point to files in `public/`, so an image at `public/assets/my-image.png` is referenced as `/assets/my-image.png`.

The rest of the file is standard Markdown, with optional JSX when it is genuinely useful. Posts are automatically ordered by `date` and appear on the blog index without any other edits.
