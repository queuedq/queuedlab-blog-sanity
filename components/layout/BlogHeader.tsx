import BlogContext from 'components/BlogContext'
import Link from 'next/link'
import { useContext } from 'react'

import CategoryMenu from './CategoryMenu'
import Navbar from './Navbar'

function BlogTitle() {
  const { currentCategory, settings } = useContext(BlogContext)

  switch (currentCategory) {
    case '_index':
      return (
        <h1 className="text-xl font-light">
          <Link href="/" className="hover:underline">
            {settings.title}
          </Link>
        </h1>
      )

    default:
      return (
        <div className="text-xl font-light">
          <Link href="/" className="hover:underline">
            {settings.title}
          </Link>
        </div>
      )
  }
}

export default function BlogHeader() {
  return (
    <header>
      <div className="mb-4 flex items-baseline justify-between pt-8">
        <BlogTitle />
        <Navbar />
      </div>
      <div className="mb-16">
        <CategoryMenu />
      </div>
    </header>
  )
}
