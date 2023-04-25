import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import PostBody from 'components/post/PostBody'
import PostHeader from 'components/post/PostHeader'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import type { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'
import { notFound } from 'next/navigation'

import BlogMeta from './BlogMeta'

interface PostPageHeadProps {
  settings: Settings
  post: Post
}

function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      <BlogMeta />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </>
  )
}

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
    <BlogContext.Provider
      value={{ preview, loading, settings, currentPage: 'post' }}
    >
      <Head>
        <PostPageHead settings={settings} post={post} />
      </Head>

      <Layout preview={preview} loading={loading}>
        <Container>
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
        </Container>
      </Layout>
    </BlogContext.Provider>
  )
}
