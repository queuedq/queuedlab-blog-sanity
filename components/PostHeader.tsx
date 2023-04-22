import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostHeader(
  props: { post: Post }
) {
  const { title, coverImage, date, excerpt, author, slug, tags } = props.post
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
      {/* TODO: add tag page */}
      {tags && tags.length > 0 && (
        <Link href={`/tags/${tags[0].slug}`} className="text-lg text-brand font-semibold hover:underline -order-1">
          {tags[0].name}
        </Link>
      )}
      {excerpt && <p className="mt-2 text-xl text-gray-500 leading-normal">{excerpt}</p>}
      <div className="mt-6 text-sm text-gray-500 font-light tracking-wide">
        <Date dateString={date} />
      </div>
    </div>
  )
}
