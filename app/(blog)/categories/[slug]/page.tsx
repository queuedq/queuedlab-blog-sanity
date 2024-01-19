import { Metadata } from 'next'

import Container from '@/app/components/layout/Container'
import PostList from '@/app/components/post/PostList'
import { metadata } from '@/app/utils/metadata'
import { ogImageUrl } from '@/app/utils/urls'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPostsByCategory, loadSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const { data: settings } = await loadSettings()
  const { title, domain, description } = settings

  return metadata({
    title: title!, // TODO: better title
    description: description!,
    url: `https://${domain}/${slug}`, // TODO: use `@/app/utils/urls`
    image: ogImageUrl(domain, title),
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
