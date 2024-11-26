import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { metadata } from '@/app/utils/metadata'
import { staticOgImageUrl, tagUrl } from '@/app/utils/urls'
import Container from '@/components/layout/Container'
import PostList from '@/components/post/PostList'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import {
  loadPostsByTag,
  loadSettings,
  loadTag,
} from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const [{ data: settings }, { data: tag }] = await Promise.all([
    loadSettings(),
    loadTag(slug),
  ])

  return metadata({
    title: '#' + (tag?.name ?? slug), // Prefix title with '#'
    description: settings.description!, // TODO: better description
    url: tagUrl(slug),
    // image: ogImageUrl(title),
    image: staticOgImageUrl,
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [{ data: tag }, { data: posts }] = await Promise.all([
    loadTag(slug),
    loadPostsByTag(slug),
  ])
  if (!tag) notFound()

  return (
    <Container>
      <h1 className="mb-12 text-3xl text-gray-900 font-bold tracking-tight">
        <span className="tracking-wider">#</span>
        {tag?.name}
      </h1>
      <PostList posts={posts} />
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('tag')
}
