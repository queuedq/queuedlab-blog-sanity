import { toPlainText } from '@portabletext/react'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import PostList from 'components/post/PostList'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

import BlogMeta from './BlogMeta'


interface IndexPageHeadProps {
  settings: Settings
}

function IndexPageHead({ settings }: IndexPageHeadProps) {
  const {
    title = demo.title,
    description = demo.description,
    ogImage = {},
  } = settings
  const ogImageTitle = ogImage?.title || demo.ogImageTitle

  return (
    <>
      <title>{title}</title>
      <BlogMeta />
      <meta key="description" name="description" content={toPlainText(description)} />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
    </>
  )
}


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
      <Layout preview={preview} loading={loading} title={title} headerLevel={1}>
        <Container>
          <PostList posts={posts} />
        </Container>
      </Layout>
    </>
  )
}
