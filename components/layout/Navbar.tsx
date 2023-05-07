import BlogContext from 'components/BlogContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function Navbar() {
  const { settings } = useContext(BlogContext)

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
