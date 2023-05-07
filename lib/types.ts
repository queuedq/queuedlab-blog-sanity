import { ColorValue } from '@sanity/color-input'

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
  description?: string
  domain?: string
  ogImage?: {
    title?: string
  }
  headerPages?: Page[]
  headerCategories?: Category[]
  copyrightNotice?: string
}
