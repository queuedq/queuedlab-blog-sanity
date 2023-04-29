import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './PostDate'
import style from './PostPreview.module.css'

interface PostPreviewProps {
  post: Post
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { title, slug, categories, excerpt, date } = post

  return (
    <div className={`${style.preview} flex flex-col py-8`}>
      {/* TODO: show cover image */}
      {/* <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div> */}
      <h3 className="text-2xl font-bold text-gray-900">
        <Link
          href={`/posts/${slug}`}
          className="border-b border-dotted border-gray-900 border-opacity-0 transition-all duration-100 ease-in-out hover:border-opacity-100"
        >
          {title}
        </Link>
      </h3>
      {categories && categories.length > 0 && (
        <div className="-order-1 text-sm font-semibold tracking-wide text-gray-500">
          <Link
            href={`/categories/${categories[0]?.slug}`}
            className={`${style.category} transition-all duration-100 ease-in-out hover:underline`}
            style={{ color: categories[0]?.color.hex }}
          >
            {categories[0]?.name}
          </Link>
        </div>
      )}
      {excerpt && <p className="mt-2 text-gray-500">{excerpt}</p>}
      <div className="mt-3 text-xs font-light tracking-wide text-gray-500">
        <Date dateString={date} />
      </div>
    </div>
  )
}
