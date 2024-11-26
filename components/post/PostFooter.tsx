import Link from 'next/link'

import type { Post } from '@/types'

interface PostFooterProps {
  post: Post
}

export default function PostFooter({ post }: PostFooterProps) {
  const { tags } = post

  // Disable footer if empty
  // Without this, there will be an unwanted margin because
  // margin collapsing does not work with flexbox.
  // (It's a workaround because I don't have a better idea now)
  if (!tags) return null

  return (
    <div className="mt-16 flex flex-wrap gap-x-4 gap-y-1 leading-relaxed">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tags/${tag.slug}`}
          className="border-link text-link hover:underline"
        >
          <span className="tracking-widest">#</span>
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
