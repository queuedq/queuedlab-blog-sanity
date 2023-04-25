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
      <div className="flex items-baseline gap-8 pt-8 pb-5">
        <div className="border-r border-gray-300 pr-4">
          <BlogTitle />
        </div>
        <Navbar />
      </div>
      <div className="mb-16">
        <CategoryMenu />
      </div>
    </header>
  )
}
