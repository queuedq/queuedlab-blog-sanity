import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './PostDate'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const {
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
    categories
  } = post

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="text-5xl text-gray-900 font-bold leading-tight">
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
        <div className="-order-1 text-lg text-brand font-semibold tracking-wide">
          <Link href={`/categories/${categories[0].slug}`} className="hover:underline">
            {categories[0].name}
          </Link>
        </div>
      )}
      {excerpt && <p className="mt-2 text-xl text-gray-500 leading-normal">{excerpt}</p>}
      <div className="mt-6 text-sm text-gray-500 font-light tracking-wide">
        <Date dateString={date} />
      </div>
    </div>
  )
}
