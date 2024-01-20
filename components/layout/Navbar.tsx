import Link from 'next/link'

import { pageUrl } from '@/app/utils/urls'
import { loadSettings } from '@/sanity/loader/loadQuery'

export default async function Navbar() {
  const { data: settings } = await loadSettings()

  return (
    <nav className="flex gap-x-5 text-sm text-gray-700">
      {settings.headerPages?.map((page) => (
        <Link
          key={page.slug}
          href={pageUrl(page.slug)}
          className="hover:underline"
        >
          {page.title}
        </Link>
      ))}
    </nav>
  )
}
