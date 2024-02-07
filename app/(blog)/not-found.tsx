import BlogLayout from '@/components/layout/BlogLayout'
import Container from '@/components/layout/Container'

export default function NotFound() {
  return (
    <BlogLayout>
      <Container>
        <h1 className="mt-24 text-center text-3xl font-bold">Not Found</h1>
        <div className="mt-4 text-center text-9xl text-slate-300 font-bold">404</div>
      </Container>
    </BlogLayout>
  )
}
