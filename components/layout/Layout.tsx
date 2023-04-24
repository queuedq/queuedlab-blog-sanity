import AlertBanner from './AlertBanner'
import Footer from './Footer'


const Container = ({ children }) => (
  <div className="container max-w-3xl mx-auto px-5">
    {children}
  </div>
)

export default function Layout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <Container>
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
