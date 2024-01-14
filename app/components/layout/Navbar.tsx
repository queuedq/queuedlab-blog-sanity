import Link from 'next/link'

import { getSettings } from '@/sanity/lib/fetch'

export default async function Navbar() {
  const settings = await getSettings()

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
