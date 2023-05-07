// TODO: use this function in index and post pages
export const ogImageUrl = (domain, title) =>
  `https://${domain}/api/og?${new URLSearchParams({ title })}`

export const postUrl = (domain, slug) => `https://${domain}/posts/${slug}`

export const feedUrl = (domain) => `https://${domain}/api/feed`
