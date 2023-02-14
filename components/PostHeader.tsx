import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostHeader(
  props: { post: Post }
) {
  const { title, coverImage, date, excerpt, author, slug, tags } = props.post
  return (
    <>
      <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
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
      {excerpt && <p className="mt-4 text-2xl text-gray-500">{excerpt}</p>}
      <div className="mt-4 text-base">
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
    </>
  )
}
