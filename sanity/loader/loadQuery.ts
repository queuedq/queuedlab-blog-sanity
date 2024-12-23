import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'
import {
  allPostsQuery,
  categoryQuery,
  pageQuery,
  postIdQuery,
  postQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  rssFeedQuery,
  settingsQuery,
  tagQuery,
} from '@/sanity/lib/queries'
import { Category, IdOnly, Page, Post, Settings, Tag } from '@/types'

const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    enabled: process.env.VERCEL_ENV === 'preview',
  },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // @TODO add support in `@sanity/client/stega` for the below
    // stega: {enabled: draftMode().isEnabled}
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

////////////////////////////////
// Settings

export function loadSettings() {
  return loadQuery<Settings>(
    settingsQuery,
    {},
    { next: { tags: ['settings', 'post', 'category'] } },
  )
}

////////////////////////////////
// Posts

export function loadPostId(slug: string) {
  return loadQuery<IdOnly | null>(
    postIdQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}

export function loadPost(slug: string) {
  return loadQuery<Post | null>(
    postQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}

export function loadAllPosts() {
  return loadQuery<Post[]>(allPostsQuery, {}, { next: { tags: ['post'] } })
}

export function loadPostsByCategory(category: string) {
  return loadQuery<Post[]>(
    postsByCategoryQuery,
    { category },
    { next: { tags: ['post'] } },
  )
}

export function loadPostsByTag(tag_slug: string) {
  return loadQuery<Post[]>(
    postsByTagQuery,
    { tag_slug },
    { next: { tags: ['post'] } },
  )
}

export function loadRssFeed() {
  return loadQuery<Post[]>(rssFeedQuery, {}, { next: { tags: ['post'] } })
}

////////////////////////////////
// Pages

export function loadPage(slug: string) {
  return loadQuery<Page | null>(
    pageQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
}

////////////////////////////////
// Category

export function loadCategory(slug: string) {
  return loadQuery<Category | null>(
    categoryQuery,
    { slug },
    { next: { tags: ['category'] } },
  )
}

////////////////////////////////
// Tag

export function loadTag(slug: string) {
  return loadQuery<Tag | null>(tagQuery, { slug }, { next: { tags: ['tag'] } })
}
