import BlogHeader from 'components/layout/BlogHeader'
import Layout from 'components/layout/BlogLayout'
import PostList from 'components/post/PostList'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

import IndexPageHead from './IndexPageHead'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const { title = demo.title } = settings || {}

  return (
    <>
      <Head>
        <IndexPageHead settings={settings} />
      </Head>
      <Layout preview={preview} loading={loading}>
        <BlogHeader title={title} level={1} />
        <PostList posts={posts} />
      </Layout>
    </>
  )
}
