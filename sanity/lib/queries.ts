import { groq } from 'next-sanity'

////////////////////////////////
// Common fields

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

////////////////////////////////
// Settings

export const settingsQuery = groq`
*[_type == "settings"][0] {
  ...,
  "headerPages": headerPages[]->{title, "slug": slug.current},
  "headerCategories": headerCategories[]->{name, "slug": slug.current, color},
}`

////////////////////////////////
// Posts

export const postQuery = groq`
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  content,
  ${postFields}
}`

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postsByCategoryQuery = groq`
*[_type == "post" && $category in categories[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

////////////////////////////////
// Page

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  coverImage,
  content,
  "slug": slug.current,
}`
