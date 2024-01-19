import Container from '@/components/layout/Container'
import PostList from '@/components/post/PostList'
import { loadAllPosts } from '@/sanity/loader/loadQuery'

export default async function Page() {
  const { data: posts } = await loadAllPosts()

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}
