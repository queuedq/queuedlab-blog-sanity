import Link from 'next/link'

import type { Post } from '@/types'

interface PostFooterProps {
  post: Post
}

export default function PostFooter({ post }: PostFooterProps) {
  const { tags } = post

  return (
    <div className="mt-16 flex flex-wrap gap-x-4 gap-y-1 leading-relaxed">
      {tags &&
        tags.map((tag) => (
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
