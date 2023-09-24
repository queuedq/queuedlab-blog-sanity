import Container from 'app/components/layout/Container'
import PostList from 'app/components/post/PostList'
import { metadata } from 'app/utils/metadata'
import {
  getAllCategorySlugs,
  getPostsByCategory,
  getSettings
} from 'lib/sanity.queries'
import { ogImageUrl } from 'lib/urls'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const settings = await getSettings()
  const { title, domain, description } = settings

  return metadata({
    title: title!, // TODO: better title
    description: description!,
    url: `https://${domain}/${slug}`, // TODO: use `lib/urls`
    image: ogImageUrl(domain, title),
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const posts = await getPostsByCategory(slug)

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}
