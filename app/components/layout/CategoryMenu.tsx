'use client'
import classNames from 'classnames'
import { Category } from 'lib/types'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

function getCurrentCategory(segments: string[]): string | undefined {
  if (segments.length == 0) return '_index'
  if (segments[0] == 'categories' && segments.length >= 2) return segments[1]
  return undefined
}

interface CategoryMenuProps {
  categories: Category[]
}

export default function CategoryMenu(props: CategoryMenuProps) {
  const { categories } = props

  const segments = useSelectedLayoutSegments()
  const currentCategory = getCurrentCategory(segments)

  const categoryInfos = [
    {
      name: 'All',
      href: '/',
      color: '#111827', // gray-900
      selected: currentCategory == '_index',
    },
    ...categories.map((category) => ({
      name: category.name,
      href: `/categories/${category.slug}`,
      color: category.color?.hex,
      selected: currentCategory == category.slug,
    })),
  ]

  return (
    <nav className="flex flex-wrap text-sm font-semibold text-slate-400">
      {categoryInfos.map(({ name, href, color, selected }, index) => (
        <div
          key={name}
          className="after:mx-2.5 after:font-light [&:not(:last-child)]:after:content-['/'] "
        >
          <Link
            href={href}
            className={classNames(
              'transition-all duration-100 ease-in-out',
              selected ? null : '[&:not(:hover)]:!text-slate-400',
            )}
            style={{ color }}
          >
            {name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
