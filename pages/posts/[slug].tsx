import { PreviewSuspense } from '@sanity/preview-kit'
import PostPage from 'components/pages/PostPage'
import { getAllPostsSlugs, getPost, getSettings } from 'lib/client'
import { Post, Settings } from 'lib/types'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewPostPage = lazy(() => import('components/pages/PreviewPostPage'))

interface PageProps {
  post?: Post
  settings?: Settings
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={<PostPage loading preview post={post} settings={settings} />}
      >
        <PreviewPostPage token={token} post={post} settings={settings} />
      </PreviewSuspense>
    )
  }

  return <PostPage post={post} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, post] = await Promise.all([
    getSettings(),
    getPost(params.slug, token),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: false,
  }
}
