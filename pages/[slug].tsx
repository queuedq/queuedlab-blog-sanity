import { PreviewSuspense } from '@sanity/preview-kit'
import Page from 'components/pages/Page'
import {
  getAllPageSlugs,
  getPage,
  getSettings,
} from 'lib/sanity.client'
import type { Page as PageType, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewPage = lazy(() => import('components/pages/PreviewPage'))

interface PageProps {
  page: PageType
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
  const { settings, page, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={<Page loading preview page={page} settings={settings} />}
      >
        <PreviewPage token={token} page={page} settings={settings} />
      </PreviewSuspense>
    )
  }

  return <Page page={page} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  // const token = previewData.token

  const [settings, page] = await Promise.all([
    getSettings(),
    getPage(params.slug),
  ])

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      page,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPageSlugs()

  return {
    paths: slugs?.map((slug) => `/${slug}`) || [],
    fallback: false,
  }
}
