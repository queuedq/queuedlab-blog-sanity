import BlogHeader from 'components/layout/BlogHeader'
import Layout from 'components/layout/BlogLayout'
import PostBody from 'components/post/PostBody'
import PostHeader from 'components/post/PostHeader'
import PostList from 'components/post/PostList'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'
import { notFound } from 'next/navigation'

import PostPageHead from './PostPageHead'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <Head>
        <PostPageHead settings={settings} post={post} />
      </Head>

      <Layout preview={preview} loading={loading}>
        <BlogHeader title={title} level={2} />
        {preview && !post ? (
          <div>Loading…</div>
        ) : (
          <>
            <article>
              <PostHeader post={post} />
              <PostBody content={post.content} />
            </article>
            {/* {morePosts?.length > 0 && <PostList posts={morePosts} />} */}
          </>
        )}
      </Layout>
    </>
  )
}
