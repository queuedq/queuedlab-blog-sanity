import 'public/fonts/pretendard-variable/pretendardvariable-dynamic-subset.css'

import { Metadata } from 'next'

import { feedUrl, ogImageUrl } from '@/app/utils/urls'
import { getSettings } from '@/sanity/lib/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const { title, description, domain } = settings
  const url = `https://${domain}/` // TODO: use `@/app/utils/urls`
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
