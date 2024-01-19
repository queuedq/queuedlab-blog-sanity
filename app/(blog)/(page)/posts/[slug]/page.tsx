import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { metadata } from '@/app/utils/metadata'
import { ogImageUrl } from '@/app/utils/urls'
import ContentBody from '@/components/ContentBody'
import Container from '@/components/layout/Container'
import PostHeader from '@/components/post/PostHeader'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPost, loadSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const { data: settings } = await loadSettings()
  const { domain } = settings

  const { data: post } = await loadPost(slug)
  if (!post) return {}

  return metadata({
    title: post.title!,
    description: post.excerpt!,
    url: `https://${domain}/posts/${slug}`, // TODO: use `@/app/utils/urls`
    image: ogImageUrl(domain, post.title),
  })
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data: post } = await loadPost(slug)
  if (!post) notFound()

  return (
    <Container>
      <article>
        <PostHeader post={post} />
        <ContentBody content={post.content} />
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('post')
}
