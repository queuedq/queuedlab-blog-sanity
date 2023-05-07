import * as demo from 'lib/demo.data'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Post,
  type Settings,
  allPostsQuery,
  allPostsWithContentQuery,
  Category,
  categorySlugsQuery,
  Page,
  pageQuery,
  pageSlugsQuery,
  postAndMoreStoriesQuery,
  postsByCategoryQuery,
  postSlugsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

// settings

export async function getSettings(): Promise<Settings> {
  if (client) {
    const settings = (await client.fetch(settingsQuery)) || {}
    console.log(settings)
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

// posts

export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(allPostsQuery)) || []
  }
  return []
}

export async function getAllPostsWithContent(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(allPostsWithContentQuery)) || []
  }
  return []
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  if (client) {
    return (await client.fetch(postsByCategoryQuery, { category })) || []
  }
  return []
}

// post & page

export async function getPage(slug: string): Promise<Page> {
  // TODO: use token for preview?
  return await client?.fetch(pageQuery, { slug })
}

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

// slugs

export async function getAllPageSlugs(): Promise<string[]> {
  return (await client?.fetch(pageSlugsQuery)) ?? []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getAllCategorySlugs(): Promise<Pick<Category, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(categorySlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}
