import Link from 'next/link'

import { loadSettings } from '@/sanity/loader/loadQuery'

export default async function Navbar() {
  const { data: settings } = await loadSettings()

  return (
    <nav className="flex gap-x-5 text-sm text-gray-700">
      {settings.headerPages?.map((page) => (
        <Link
          key={page.slug}
          href={`/${page.slug}`}
          className="hover:underline"
        >
          {page.title}
        </Link>
      ))}
    </nav>
  )
}
