export const postUrl = (slug) => `/posts/${slug}`
export const pageUrl = (slug) => `/${slug}`
export const categoryUrl = (slug) => `/categories/${slug}`
export const ogImageUrl = (title) => `/api/og?${new URLSearchParams({ title })}`

export const feedUrl = '/feed.xml'
export const faviconUrl = '/favicon.ico'

export const draftUrl = '/api/draft'
export const disableDraftUrl = '/api/disable-draft'
