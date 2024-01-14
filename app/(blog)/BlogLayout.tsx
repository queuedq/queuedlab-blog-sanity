import { draftMode } from 'next/headers'

import AlertBanner from '@/app/components/layout/AlertBanner'
import Container from '@/app/components/layout/Container'
import Footer from '@/app/components/layout/Footer'
import BlogHeader from '@/app/components/layout/Header'

interface BlogLayoutProps {
  children: React.ReactNode
  category: string | undefined
}

export default function BlogLayout({ children, category }: BlogLayoutProps) {
  return (
    <div className="min-h-screen font-sans text-gray-700 underline-offset-[0.15em]">
      <AlertBanner preview={draftMode().isEnabled} />
      <Container>
        <BlogHeader category={category} />
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
