import { Settings } from 'lib/sanity.queries'
import { createContext } from 'react'

export type BlogPage = 'index' | 'post_list' | 'post' | 'general'

export interface BlogContextType {
  preview: boolean
  loading: boolean
  settings: Settings
  currentPage: BlogPage
}

const defaultBlogContext: BlogContextType = {
  preview: false,
  loading: false,
  settings: {},
  currentPage: 'index',
}

export default createContext(defaultBlogContext)
