import './global.css'
import 'public/fonts/pretendard-variable/pretendardvariable-dynamic-subset.css'

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
  return children
}
