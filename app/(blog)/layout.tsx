import './global.css'
import 'public/fonts/pretendard-variable/pretendardvariable-dynamic-subset.css'

import AlertBanner from 'app/components/layout/AlertBanner'
import Container from 'app/components/layout/Container'
import Footer from 'app/components/layout/Footer'
import BlogHeader from 'app/components/layout/Header'
import { getSettings } from 'lib/client'
import { feedUrl, ogImageUrl } from 'lib/urls'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const { title, description, domain } = settings
  const url = `https://${domain}/` // TODO: use `lib/urls`
  const ogImage = ogImageUrl(domain, title)

  return {
    title: {
      default: title!,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [ogImage],
    },
    alternates: {
      types: {
        'application/atom+xml': [
          {
            title,
            url: feedUrl(domain),
          },
        ],
      },
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans text-gray-700 underline-offset-[0.15em]">
      <AlertBanner />
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
