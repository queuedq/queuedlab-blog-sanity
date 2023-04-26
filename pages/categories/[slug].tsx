import { PreviewSuspense } from '@sanity/preview-kit'
import IndexPage from 'components/pages/IndexPage'
import {
  getAllCategorySlugs,
  getPostsByCategory,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewIndexPage = lazy(() => import('components/pages/PreviewIndexPage'))

interface PageProps {
  posts: Post[]
  settings: Settings
  preview: boolean
  token: string | null
  slug: string
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Page(props: PageProps) {
  const { posts, settings, preview, token, slug } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage
            loading
            preview
            posts={posts}
            settings={settings}
            currentCategory={slug}
          />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage posts={posts} settings={settings} currentCategory={slug} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getPostsByCategory(params.slug),
  ])

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
      slug: params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllCategorySlugs()

  return {
    paths: slugs?.map(({ slug }) => `/categories/${slug}`) || [],
    fallback: false,
  }
}
