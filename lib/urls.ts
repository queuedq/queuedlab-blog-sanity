// TODO: use this function in index and post pages
export const ogImageUrl = (domain, title) =>
  `https://${domain}/api/og?${new URLSearchParams({ title })}`

export const pageUrl = (domain, slug) => `https://${domain}/posts/${slug}`
