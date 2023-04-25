import AlertBanner from './AlertBanner'
import BlogHeader from './BlogHeader'
import CategoryMenu from './CategoryMenu'
import Container from './Container'
import Footer from './Footer'
import Navbar from './Navbar'


interface LayoutProps {
  preview: boolean
  loading?: boolean
  title: string
  headerLevel: 1 | 2
  children: React.ReactNode
}

export default function Layout({
  preview,
  loading,
  title,
  headerLevel,
  children,
}: LayoutProps ) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <Container>
          <div className="flex justify-between items-baseline mt-8 mb-3 pb-3 border-b border-gray-300">
            <BlogHeader title={title} level={headerLevel} />
            <Navbar />
          </div>
          <div>
            <CategoryMenu />
          </div>
        </Container>
        <main className="mb-8">
          {children}
        </main>
        {/* Sticky footer: https://css-tricks.com/a-clever-sticky-footer-technique/ */}
        <div className="sticky top-[100vh]">
          <Container>
            <Footer />
          </Container>
        </div>
      </div>
    </>
  )
}
