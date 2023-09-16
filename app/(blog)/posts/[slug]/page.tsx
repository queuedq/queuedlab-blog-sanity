import ContentBody from 'app/components/ContentBody'
import Container from 'app/components/layout/Container'
import { metadata } from 'app/utils/metadata'
import { getAllPostsSlugs, getPost, getSettings } from 'lib/client'
import type { Post } from 'lib/types'
import { ogImageUrl } from 'lib/urls'
import { Metadata } from 'next'

import PostHeader from '../../../components/post/PostHeader'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const settings = await getSettings()
  const { domain } = settings

  const post = (await getPost(slug))!

  return metadata({
    title: post.title!,
    description: post.excerpt!,
    url: `https://${domain}/posts/${slug}`, // TODO: use `lib/urls`
    image: ogImageUrl(domain, post.title),
  })
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const post = (await getPost(slug)) as Post

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
  const slugs = await getAllPostsSlugs()
  return slugs
}
