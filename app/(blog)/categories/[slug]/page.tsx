import { Metadata } from 'next'

import { metadata } from '@/app/utils/metadata'
import { categoryUrl, ogImageUrl } from '@/app/utils/urls'
import Container from '@/components/layout/Container'
import PostList from '@/components/post/PostList'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import {
  loadCategory,
  loadPostsByCategory,
  loadSettings,
} from '@/sanity/loader/loadQuery'

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
  const [{ data: category }, { data: posts }] = await Promise.all([
    loadCategory(slug),
    loadPostsByCategory(slug),
  ])

  return (
    <Container>
      <h1 className="mb-12 text-4xl text-gray-900 font-bold">
        <span>{category?.name}</span>
        <div className="inline-block align-top w-0">
          {/* w-0: To make this decoration wrap with the last word */}
          <div
            className="ml-1 w-3 h-3 rounded-sm"
            style={{ backgroundColor: category?.color?.hex }}
          ></div>
        </div>
      </h1>
      <PostList posts={posts} />
    </Container>
  )
}

export async function generateStaticParams() {
  return generateStaticSlugs('category')
}
