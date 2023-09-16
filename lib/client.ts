import * as demo from 'lib/demo.data'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import type { Page, Post, Settings } from 'lib/types'
import { createClient, groq } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const defaultClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

// Fields

const postFields = groq`
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
  "categories": categories[]->{name, "slug": slug.current, color},
  "tags": tags[]->{name, "slug": slug.current},
`
const pageFields = groq`
  _id,
  title,
  coverImage,
  "slug": slug.current,
`

// Settings queries

export const settingsQuery = groq`
*[_type == "settings"][0] {
  ...,
  "headerPages": headerPages[]->{title, "slug": slug.current},
  "headerCategories": headerCategories[]->{name, "slug": slug.current, color},
}`
export async function getSettings(client = defaultClient): Promise<Settings> {
  if (client) {
    const settings = (await client.fetch(settingsQuery)) || {}
    return {
      title: demo.title,
      description: demo.description,
      ogImage: {
        title: demo.ogImageTitle,
      },
      ...settings,
    }
  }
  return {}
}

// Posts queries

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`
export async function getAllPosts(client = defaultClient) {
  return (await client?.fetch<Post[]>(allPostsQuery)) || []
}

const allPostsWithContentQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
  content,
}`
export async function getAllPostsWithContent(client = defaultClient) {
  return (await client?.fetch<Post[]>(allPostsWithContentQuery)) || []
}

const postsByCategoryQuery = groq`
*[_type == "post" && $category in categories[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}`
export async function getPostsByCategory(
  category: string,
  client = defaultClient,
) {
  return (await client?.fetch<Post[]>(postsByCategoryQuery, { category })) || []
}

// Post & Page queries

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  content,
  ${pageFields}
}`
export async function getPage(slug: string, client = defaultClient) {
  return await client?.fetch<Page>(pageQuery, { slug }) // TODO: use token for preview?
}

export const postQuery = groq`
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  content,
  ${postFields}
}
`
export async function getPost(
  slug: string,
  token?: string | null,
  client = defaultClient,
) {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch<Post>(postQuery, { slug })
  }
  return undefined
}

const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`
export async function getPostBySlug(slug: string, client = defaultClient) {
  return await client?.fetch<Post>(postBySlugQuery, { slug })
}

// Slug queries (for getStaticPaths)

const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`
export async function getAllPageSlugs(client = defaultClient) {
  return (await client?.fetch<string[]>(pageSlugsQuery)) || []
}

const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export async function getAllPostsSlugs(client = defaultClient) {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

const categorySlugsQuery = groq`
*[_type == "postCategory" && defined(slug.current)][].slug.current
`
export async function getAllCategorySlugs(client = defaultClient) {
  if (client) {
    const slugs = (await client.fetch<string[]>(categorySlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}
