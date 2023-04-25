import BlogContext from 'components/BlogContext'
import Link from 'next/link'
import { useContext } from 'react'

import CategoryMenu from './CategoryMenu'
import Navbar from './Navbar'

function BlogTitle() {
  const { currentPage, settings } = useContext(BlogContext)

  switch (currentPage) {
    case 'index':
      return <h1 className="text-xl font-light">{settings.title}</h1>

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
      <div className="mt-8 mb-3 flex items-baseline justify-between border-b border-gray-300 pb-3">
        <BlogTitle />
        <Navbar />
      </div>
      <div className="mb-16">
        <CategoryMenu />
      </div>
    </header>
  )
}
