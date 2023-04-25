import BlogContext from 'components/BlogContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function CategoryMenu() {
  const { settings } = useContext(BlogContext)
  const { headerCategories } = settings

  if (!headerCategories) return null

  return (
    <nav className="mb-8 flex flex-wrap gap-x-4 text-sm font-semibold text-gray-400 sm:gap-x-8 ">
      <Link href="/" className="text-gray-900">
        All Posts
      </Link>
      {headerCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="[&:not(:hover)]:!text-gray-500"
          style={{ color: category.color.hex }}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
