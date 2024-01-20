import { Metadata } from 'next'

import { metadata } from '@/app/utils/metadata'
import { categoryUrl, ogImageUrl } from '@/app/utils/urls'
import Container from '@/components/layout/Container'
import PostList from '@/components/post/PostList'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPostsByCategory, loadSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const { data: settings } = await loadSettings()
  const { title, description } = settings

  return metadata({
    title: title!, // TODO: better title
    description: description!,
    url: categoryUrl(slug),
    image: ogImageUrl(title),
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data: posts } = await loadPostsByCategory(slug)

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('category')
}
