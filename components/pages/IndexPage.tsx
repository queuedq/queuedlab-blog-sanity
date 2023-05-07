import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import PostList from 'components/post/PostList'
import type { Post, Settings } from 'lib/types'
import { ogImageUrl } from 'lib/urls'

import Metadata from './Metadata'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
  currentCategory: string
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, currentCategory } = props
  const { title, description, domain } = settings

  return (
    <BlogContext.Provider
      value={{ preview, loading, settings, currentCategory }}
    >
      {/* Head */}
      <Metadata
        title={title}
        description={description}
        url={`https://${domain}/`} // TODO: use `lib/urls`
        ogImage={ogImageUrl(domain, title)}
        settings={settings}
      />

      {/* Body */}
      <Layout preview={preview} loading={loading}>
        <Container>
          <PostList posts={posts} />
        </Container>
      </Layout>
    </BlogContext.Provider>
  )
}
