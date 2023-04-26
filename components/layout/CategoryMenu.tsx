import BlogContext from 'components/BlogContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function CategoryMenu() {
  const { settings, currentPage } = useContext(BlogContext)
  const { headerCategories } = settings

  if (!headerCategories) return null

  const categories = [
    {
      name: 'All',
      href: '/',
      color: '#111827', // gray-900
      selected: currentPage == 'index',
    },
    ...headerCategories.map((category) => ({
      name: category.name,
      href: `/categories/${category.slug}`,
      color: category.color.hex,
      selected: false,
    })),
  ]

  return (
    <nav className="flex flex-wrap text-sm font-semibold text-slate-400">
      {categories.map(({ name, href, color, selected }, index) => (
        <div
          key={name}
          className="after:mx-2.5 after:font-thin [&:not(:last-child)]:after:content-['/']"
        >
          <Link
            href={href}
            className={selected ? null : '[&:not(:hover)]:!text-slate-400'}
            style={{ color }}
          >
            {name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
