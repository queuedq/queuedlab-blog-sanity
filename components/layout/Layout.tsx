import AlertBanner from './AlertBanner'
import BlogHeader from './BlogHeader'
import Footer from './Footer'
import Navbar from './Navbar'


const Container = ({ children }) => (
  <div className="container max-w-3xl mx-auto px-5">
    {children}
  </div>
)

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
          <Navbar
            header={<BlogHeader title={title} level={headerLevel} />}
          />
          <main className="mb-8">
            {children}
          </main>
        </Container>
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
