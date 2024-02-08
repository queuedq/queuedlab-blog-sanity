import BlogLayout from '@/components/layout/BlogLayout'
import Container from '@/components/layout/Container'

// https://github.com/vercel/next.js/issues/55717#issuecomment-1746731743
import Layout from './(blog)/layout'

export default function NotFound() {
  return (
    <Layout>
      <BlogLayout>
        <Container>
          <h1 className="mt-[20vh] text-center text-3xl font-bold">
            Not Found
          </h1>
          <div className="mb-[20vh] text-center text-9xl text-slate-300 font-bold">
            404
          </div>
        </Container>
      </BlogLayout>
    </Layout>
  )
}
