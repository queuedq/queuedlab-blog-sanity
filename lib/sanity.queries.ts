import { ColorValue } from '@sanity/color-input'
import { groq } from 'next-sanity'

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

// settings query

export const settingsQuery = groq`
*[_type == "settings"][0] {
  ...,
  "headerCategories": headerCategories[]->{name, "slug": slug.current, color},
}`

// posts query

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const allPostsWithContentQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
  content,
}`

export const postsByCategoryQuery = groq`
*[_type == "post" && $category in categories[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

// post & page query

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

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  content,
  ${pageFields}
}`

// slugs query (for getStaticPaths)

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export const categorySlugsQuery = groq`
*[_type == "postCategory" && defined(slug.current)][].slug.current
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
  categories?: Category[]
  tags?: Tag[]
}

export interface Page {
  _id: string
  slug?: string
  title?: string
  content?: string
  coverImage?: any
}

export interface Category {
  name?: string
  slug?: string
  color?: ColorValue
}

export interface Tag {
  name?: string
  slug?: string
}

export interface Settings {
  title?: string
  description?: any[]
  domain?: string
  ogImage?: {
    title?: string
  }
  headerCategories?: Category[]
  copyrightNotice?: string
}
