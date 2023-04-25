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
    <div className={`${style.preview} group flex flex-col py-8`}>
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
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {/* TODO: add category/tag page */}
      {categories && categories.length > 0 && (
        <div
          className={`${style.category} -order-1 text-sm font-semibold tracking-wide text-gray-500`}
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
      {excerpt && <p className="mt-2 text-gray-500">{excerpt}</p>}
      <div className="mt-3 text-xs font-light tracking-wide text-gray-500">
        <Date dateString={date} />
      </div>
    </div>
  )
}
