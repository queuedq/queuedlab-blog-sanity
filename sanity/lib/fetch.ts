import 'server-only'

import type { QueryParams } from '@sanity/client'
import { draftMode } from 'next/headers'

import { Page, Post, Settings } from '@/types'

import { revalidateSecret } from './api'
import { client } from './client'
import * as demo from './demo'
import {
  allPostsQuery,
  allPostsWithContentQuery,
  categorySlugsQuery,
  pageQuery,
  pageSlugsQuery,
  postBySlugQuery,
  postQuery,
  postsByCategoryQuery,
  postSlugsQuery,
  settingsQuery,
} from './queries'

// sanityFetch() reference: https://www.sanity.io/guides/nextjs-app-router-live-preview
export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: QueryParams
  tags: string[]
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }

  return client.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    cache: revalidateSecret ? 'force-cache' : 'no-store',
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  })
}

// Queries
// TODO: set appropriate tag

export async function getSettings(): Promise<Settings> {
  const settings = await sanityFetch<Settings>({
    query: settingsQuery,
    tags: ['settings'],
  })
  return {
    title: demo.title,
    description: demo.description,
    ogImage: {
      title: demo.ogImageTitle,
    },
    ...settings,
  }
}

export function getAllPosts() {
  return sanityFetch<Post[]>({
    query: allPostsQuery,
    tags: ['post'],
  })
}

export function getAllPostsWithContent() {
  return sanityFetch<Post[]>({
    query: allPostsWithContentQuery,
    tags: ['post'],
  })
}

export function getPostsByCategory(category: string) {
  return sanityFetch<Post[]>({
    query: postsByCategoryQuery,
    params: { category },
    tags: ['post'],
  })
}

export function getPage(slug: string) {
  return sanityFetch<Page>({
    query: pageQuery,
    params: { slug },
    tags: ['page'],
  })
}

export function getPost(slug: string) {
  return sanityFetch<Post>({
    query: postQuery,
    params: { slug },
    tags: ['post'],
  })
}

export function getPostBySlug(slug: string) {
  return sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
    tags: ['post'],
  })
}

// Slug queries

export function getAllPageSlugs() {
  return client.fetch<string[]>(
    pageSlugsQuery,
    {},
    { token, perspective: 'published' },
  )
}

export function getAllPostsSlugs() {
  return client.fetch<string[]>(
    postSlugsQuery,
    {},
    { token, perspective: 'published' },
  )
}

export function getAllCategorySlugs() {
  return client.fetch<string[]>(
    categorySlugsQuery,
    {},
    { token, perspective: 'published' },
  )
}
