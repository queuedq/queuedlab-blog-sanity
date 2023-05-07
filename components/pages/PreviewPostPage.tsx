import { postAndMoreStoriesQuery } from 'lib/client'
import { usePreview } from 'lib/sanity.preview'
import { type Post } from 'lib/types'

import PostPage, { PostPageProps } from './PostPage'

export default function PreviewPostPage({
  token,
  post,
  settings,
}: {
  token: null | string
} & PostPageProps) {
  const { post: postPreview, morePosts }: { post: Post; morePosts: Post[] } =
    usePreview(token, postAndMoreStoriesQuery, {
      slug: post.slug,
    }) || { post: null, morePosts: [] }

  return (
    <PostPage
      preview
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
  )
}
