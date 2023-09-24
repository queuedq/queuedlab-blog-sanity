import Container from 'app/components/layout/Container'
import PostList from 'app/components/post/PostList'
import { getAllPosts } from 'lib/queries'

export default async function Page() {
  const posts = await getAllPosts()

  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  )
}
