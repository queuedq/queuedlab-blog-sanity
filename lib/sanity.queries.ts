import { groq } from 'next-sanity'

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

// Posts queries
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

// Post & Page queries
export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  content,
  ${pageFields}
}`

export const postQuery = groq`
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  content,
  ${postFields}
}`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`

// Slug queries (for getStaticPaths)
export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const categorySlugsQuery = groq`
*[_type == "postCategory" && defined(slug.current)][].slug.current
`
