import * as demo from 'lib/demo.data'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import type { Category, Page, Post, Settings } from 'lib/types'
import { createClient, groq } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const client = projectId
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
export async function getSettings(): Promise<Settings> {
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
export async function getAllPosts(): Promise<Post[]> {
  return (await client?.fetch(allPostsQuery)) || []
}

export const allPostsWithContentQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
  content,
}`
export async function getAllPostsWithContent(): Promise<Post[]> {
  return (await client?.fetch(allPostsWithContentQuery)) || []
}

export const postsByCategoryQuery = groq`
*[_type == "post" && $category in categories[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}`
export async function getPostsByCategory(category: string): Promise<Post[]> {
  return (await client?.fetch(postsByCategoryQuery, { category })) || []
}

// Post & Page queries

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  content,
  ${pageFields}
}`
export async function getPage(slug: string): Promise<Page> {
  return await client?.fetch(pageQuery, { slug }) // TODO: use token for preview?
}

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`
export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch(postAndMoreStoriesQuery, { slug })
  }
  return { post: null, morePosts: [] }
}

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`

// Slug queries (for getStaticPaths)

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export async function getAllPageSlugs(): Promise<string[]> {
  return (await client?.fetch(pageSlugsQuery)) || []
}

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`
export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export const categorySlugsQuery = groq`
*[_type == "postCategory" && defined(slug.current)][].slug.current
`
export async function getAllCategorySlugs(): Promise<Pick<Category, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(categorySlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}
