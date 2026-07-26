const modules = import.meta.glob('./posts/*.mdx', { eager: true })

export const posts = Object.entries(modules)
  .map(([path, module]) => ({ ...module.meta, Content: module.default, slug: module.meta.slug ?? path.split('/').pop().replace('.mdx', '') }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const postBySlug = (slug) => posts.find((post) => post.slug === slug)
