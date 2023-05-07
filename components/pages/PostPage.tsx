import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import ContentBody from 'components/post/ContentBody'
import PostHeader from 'components/post/PostHeader'
import type { Post, Settings } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import Head from 'next/head'
import { notFound } from 'next/navigation'

import BlogMeta from './BlogMeta'

interface PostPageHeadProps {
  settings: Settings
  post: Post
}

function PostPageHead({ settings, post }: PostPageHeadProps) {
  const { title, domain } = settings
  return (
    <Head>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      {/* {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )} */}
      {/* LATER: Use cover image for OG image */}
      <meta property="og:image" content={ogImageUrl(domain, title)} />
    </Head>
  )
}

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  settings: Settings
}

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, settings } = props

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <BlogContext.Provider value={{ preview, loading, settings }}>
      <PostPageHead settings={settings} post={post} />
      <BlogMeta settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          {preview && !post ? (
            <div>Loading…</div>
          ) : (
            <>
              <article>
                <PostHeader post={post} />
                <ContentBody content={post.content} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </BlogContext.Provider>
  )
}
