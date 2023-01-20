import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="mb-2">
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
