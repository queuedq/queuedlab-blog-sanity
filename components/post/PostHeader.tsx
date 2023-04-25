import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './PostDate'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, coverImage, date, excerpt, author, slug, categories } = post

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="text-5xl font-bold leading-tight text-gray-900">
        {title}
      </h1>
      {/* <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mb-6 block md:hidden">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div> */}
      {/* TODO: add category/tag page */}
      {categories && categories.length > 0 && (
        <div className="-order-1 text-lg font-semibold tracking-wide text-brand">
          <Link
            href={`/categories/${categories[0].slug}`}
            className="hover:underline"
          >
            {categories[0].name}
          </Link>
        </div>
      )}
      {excerpt && (
        <p className="mt-2 text-xl leading-normal text-gray-500">{excerpt}</p>
      )}
      <div className="mt-4 text-sm font-light tracking-wide text-gray-500">
        <Date dateString={date} />
      </div>
    </div>
  )
}
