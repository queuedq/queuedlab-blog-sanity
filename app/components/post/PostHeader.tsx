import type { Post } from 'lib/types'
import Link from 'next/link'

import PostDate from './PostDate'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, coverImage, date, excerpt, author, slug, categories } = post

  return (
    <div className="mt-16 mb-16 flex flex-col">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight">
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
      {categories && categories.length > 0 && (
        <div
          className="-order-1 font-semibold tracking-wide"
          style={{ color: categories[0]?.color.hex }}
        >
          <Link
            href={`/categories/${categories[0]?.slug}`}
            className="hover:underline"
          >
            {categories[0]?.name}
          </Link>
        </div>
      )}
      {excerpt && (
        <p className="mt-2 text-lg leading-normal text-gray-500 sm:text-xl sm:leading-normal">
          {excerpt}
        </p>
      )}
      <div className="mt-3 text-sm tracking-wide text-gray-500">
        <PostDate dateString={date} />
      </div>
    </div>
  )
}
