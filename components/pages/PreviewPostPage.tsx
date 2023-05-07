import { postQuery } from 'lib/client'
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
  const postPreview: Post | undefined = usePreview(token, postQuery, {
    slug: post.slug,
  })

  console.log(postPreview)

  return <PostPage preview post={postPreview} settings={settings} />
}
