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
  tags,
}: Omit<Post, '_id'>) {
  console.log(title)
  console.log(tags)

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
      <h3 className="text-2xl text-gray-800 font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {excerpt && <p className="mt-2 text-xl text-gray-500">{excerpt}</p>}
      <div className="mt-6 text-sm">
        {/* TODO: add tag page */}
        {tags && tags.length > 0 && (
          <>
            <Link href={`/tags/${tags[0].slug}`} className="hover:underline">
              {tags[0].name}
            </Link>
            <span className="px-1">{' · '}</span>
          </>
        )}
        <span className="text-gray-500">
          <Date dateString={date} />
        </span>
      </div>
    </div>
  )
}
