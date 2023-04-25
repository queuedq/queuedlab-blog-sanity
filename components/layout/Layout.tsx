import AlertBanner from './AlertBanner'
import BlogHeader from './BlogHeader'
import Container from './Container'
import Footer from './Footer'

interface LayoutProps {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}

export default function Layout({ preview, loading, children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <AlertBanner preview={preview} loading={loading} />
      <Container>
        <BlogHeader />
      </Container>
      <main className="mb-8">{children}</main>
      {/* Sticky footer: https://css-tricks.com/a-clever-sticky-footer-technique/ */}
      <div className="sticky top-[100vh]">
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  )
}
