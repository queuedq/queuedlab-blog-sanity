import BlogContext from 'components/BlogContext'
import Container from 'components/layout/Container'
import Layout from 'components/layout/Layout'
import ContentBody from 'components/post/ContentBody'
import type { Page, Settings } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import Head from 'next/head'
import { notFound } from 'next/navigation'

import BlogMeta from './BlogMeta'

interface PageHeadProps {
  settings: Settings
  page: Page
}

function PageHead({ settings, page }: PageHeadProps) {
  const { title, domain } = settings
  return (
    <Head>
      <title>{page.title ? `${page.title} | ${title}` : title}</title>
      <meta property="og:image" content={ogImageUrl(domain, title)} />
    </Head>
  )
}

export interface PageProps {
  preview?: boolean
  loading?: boolean
  page?: Page
  settings: Settings
}

export default function Page(props: PageProps) {
  const { preview, loading, page, settings } = props
  const slug = page?.slug

  if (!slug && !preview) notFound()

  return (
    <BlogContext.Provider value={{ preview, loading, settings }}>
      <PageHead settings={settings} page={page} />
      <BlogMeta settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          {preview && !page ? (
            <div>Loading…</div>
          ) : (
            <>
              <article>
                <h1 className="mt-16 mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {page.title}
                </h1>
                <ContentBody content={page.content} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </BlogContext.Provider>
  )
}
