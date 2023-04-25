import type { Post } from 'lib/sanity.queries'

import PostPreview from './PostPreview'

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="-mt-8 -mb-8 flex flex-col">
        {posts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
