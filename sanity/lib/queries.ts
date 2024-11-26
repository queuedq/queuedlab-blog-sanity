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

export const postIdQuery = groq`*[_type == "post" && slug.current == $slug][0] { _id }`

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

// $tag_slug instead of $tag because Sanity thinks that's a mistake (cf. QueryParams type)
// > you're using a fetch option as a GROQ parameter, this is likely a mistake
export const postsByTagQuery = groq`
*[_type == "post" && $tag_slug in tags[]->slug.current] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const rssFeedQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc)[0...10] {
  content,
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

////////////////////////////////
// Category

export const categoryQuery = groq`
*[_type == "postCategory" && slug.current == $slug][0] {
  _id,
  name,
  color,
  "slug": slug.current,
}`

////////////////////////////////
// Tag

export const tagQuery = groq`
*[_type == "postTag" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
}`
