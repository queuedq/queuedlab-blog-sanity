import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

interface PostPreviewProps {
  post: Post
}

export default function PostPreview({ post }: PostPreviewProps) {
  const {
    title,
    slug,
    categories,
    excerpt,
    date,
  } = post;

  return (
    <div className="flex flex-col pt-8 pb-8">
      {/* TODO: show cover image */}
      {/* <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div> */}
      <h3 className="text-2xl text-gray-900 font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {/* TODO: add category/tag page */}
      {categories && categories.length > 0 && (
        <div className="-order-1 text-sm text-brand font-semibold tracking-wide">
          <Link href={`/categories/${categories[0]?.slug}`} className="hover:underline">
            {categories[0]?.name}
          </Link>
        </div>
      )}
      {excerpt && <p className="mt-2 text-gray-500">{excerpt}</p>}
      <div className="mt-4 text-xs text-gray-500 font-light tracking-wide">
        <Date dateString={date} />
      </div>
    </div>
  )
}
