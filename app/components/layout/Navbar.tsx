import { getSettings } from 'lib/client'
import Link from 'next/link'

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
