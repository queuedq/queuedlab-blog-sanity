// OG images must have an absolute URL
export const ogImageUrl = (domain, title) =>
  `https://${domain}/api/og?${new URLSearchParams({ title })}`

export const postUrl = (domain, slug) => `https://${domain}/posts/${slug}`

export const feedUrl = (domain) => `https://${domain}/api/feed`
