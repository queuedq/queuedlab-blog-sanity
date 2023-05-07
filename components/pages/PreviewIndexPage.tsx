import { allPostsQuery, settingsQuery } from 'lib/client'
import { usePreview } from 'lib/sanity.preview'
import { type Post, type Settings } from 'lib/types'

import IndexPage from './IndexPage'

export default function PreviewIndexPage({ token }: { token: null | string }) {
  const posts: Post[] = usePreview(token, allPostsQuery) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return (
    <IndexPage
      preview
      posts={posts}
      settings={settings}
      currentCategory="_index"
    />
  )
}
