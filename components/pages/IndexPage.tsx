import { toPlainText } from '@portabletext/react'
import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import PostList from 'components/post/PostList'
import type { Post, Settings } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import Head from 'next/head'

import BlogMeta from './BlogMeta'

interface IndexPageHeadProps {
  settings: Settings
}

function IndexPageHead({ settings }: IndexPageHeadProps) {
  const { title, description, ogImage = {}, domain } = settings
  const ogImageTitle = ogImage?.title

  return (
    <Head>
      <title>{title}</title>
      <meta
        key="description"
        name="description"
        content={toPlainText(description)}
      />
      <meta property="og:image" content={ogImageUrl(domain, ogImageTitle)} />
    </Head>
  )
}

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
  currentCategory: string
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, currentCategory } = props

  return (
    <BlogContext.Provider
      value={{ preview, loading, settings, currentCategory }}
    >
      <IndexPageHead settings={settings} />
      <BlogMeta settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          <PostList posts={posts} />
        </Container>
      </Layout>
    </BlogContext.Provider>
  )
}
