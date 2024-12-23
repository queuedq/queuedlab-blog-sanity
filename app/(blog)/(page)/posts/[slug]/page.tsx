import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { metadata } from '@/app/utils/metadata'
import { postUrl, staticOgImageUrl } from '@/app/utils/urls'
import ContentBody from '@/components/ContentBody'
import Giscus from '@/components/Giscus'
import Container from '@/components/layout/Container'
import PostFooter from '@/components/post/PostFooter'
import PostHeader from '@/components/post/PostHeader'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPost } from '@/sanity/loader/loadQuery'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const { data: post } = await loadPost(slug)
  if (!post) return {}

  return metadata({
    title: post.title!,
    description: post.excerpt!,
    url: postUrl(slug),
    // image: ogImageUrl(post.title),
    image: staticOgImageUrl,
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
        <PostFooter post={post} />
      </article>
      <div className="mt-16">
        <Giscus />
      </div>
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('post')
}
