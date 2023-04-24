import type { Post } from 'lib/sanity.queries'

import PostPreview from './PostPreview'

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="mb-2">
        {posts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
