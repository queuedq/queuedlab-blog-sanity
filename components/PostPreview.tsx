import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <div className="flex flex-col pt-8 pb-8 border-b border-solid border-slate-200">
      {/* TODO: show cover image */}
      {/* <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div> */}
      <h3 className="mb-2 text-2xl font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {/* TODO: add category */}
      {excerpt && <p className="text-xl text-gray-500">{excerpt}</p>}
      <div className="mt-4 text-sm leading-none">
        <Link href={`/categories/`} className="order-first mb-2 capitalize hover:underline">
          {"Category"}
        </Link>
        {' · '}
        <span className="text-gray-500">
          <Date dateString={date} />
        </span>
      </div>
    </div>
  )
}
