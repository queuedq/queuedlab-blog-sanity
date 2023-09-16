import Container from 'app/components/layout/Container'
import { metadata } from 'app/utils/metadata'
import { getAllPageSlugs, getPage, getSettings } from 'lib/client'
import type { Post } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import { Metadata } from 'next'

import ContentBody from '../../../components/ContentBody'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const settings = await getSettings()
  const { domain, description } = settings

  const page = (await getPage(slug))!

  return metadata({
    title: page.title!,
    description: description!,
    url: `https://${domain}/${slug}`, // TODO: use `lib/urls`
    image: ogImageUrl(domain, page.title),
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const page = (await getPage(slug)) as Post

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
  const slugs = await getAllPageSlugs()
  return slugs
}