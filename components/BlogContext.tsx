import { Settings } from 'lib/sanity.queries'
import { createContext } from 'react'

export interface BlogContextType {
  preview: boolean
  loading: boolean
  settings: Settings
  currentCategory?: string
}

const defaultBlogContext: BlogContextType = {
  preview: false,
  loading: false,
  settings: {},
}

export default createContext(defaultBlogContext)
