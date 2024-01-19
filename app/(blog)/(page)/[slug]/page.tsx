import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { metadata } from '@/app/utils/metadata'
import { ogImageUrl } from '@/app/utils/urls'
import ContentBody from '@/components/ContentBody'
import Container from '@/components/layout/Container'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage, loadSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const { data: settings } = await loadSettings()
  const { domain, description } = settings

  const { data: page } = await loadPage(slug)
  if (!page) return {}

  return metadata({
    title: page.title!,
    description: description!,
    url: `https://${domain}/${slug}`, // TODO: use `@/app/utils/urls`
    image: ogImageUrl(domain, page.title),
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data: page } = await loadPage(slug)
  if (!page) notFound()

  return (
    <Container>
      <article>
        <h1 className="mt-16 mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight">
          {page.title}
        </h1>
        <ContentBody content={page.content} />
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('page')
}
