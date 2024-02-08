import '@/public/fonts/pretendard-variable/pretendardvariable-dynamic-subset.css'

import { Metadata } from 'next'

import { feedUrl, staticOgImageUrl } from '@/app/utils/urls'
import { loadSettings } from '@/sanity/loader/loadQuery'

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await loadSettings()
  const { title, description, domain } = settings

  return {
    metadataBase: new URL(`https://${domain}`),
    title: {
      default: title!,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: '/',
      type: 'website',
      // TODO: this uses `localhost:3000` as its base in dev mode, which might be Next.js bug
      // https://github.com/vercel/next.js/issues/54349
      // images: [ogImageUrl(title)],
      images: [staticOgImageUrl],
    },
    alternates: {
      types: {
        'application/atom+xml': [
          {
            title,
            url: feedUrl,
          },
        ],
      },
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
