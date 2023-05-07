import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import ContentBody from 'components/post/ContentBody'
import PostHeader from 'components/post/PostHeader'
import type { Post, Settings } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import { notFound } from 'next/navigation'

import Metadata from './Metadata'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  settings: Settings
}

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, settings } = props
  const { title: blogTitle, domain } = settings
  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <BlogContext.Provider value={{ preview, loading, settings }}>
      {/* Head */}
      <Metadata
        title={post.title ? `${post.title} | ${blogTitle}` : blogTitle}
        description={post.excerpt}
        url={`https://${domain}/posts/${slug}`} // TODO: use `lib/urls`
        ogImage={ogImageUrl(domain, post.title)}
        settings={settings}
      />

      {/* Body */}
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
