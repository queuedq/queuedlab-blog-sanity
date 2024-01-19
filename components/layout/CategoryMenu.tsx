import classNames from 'classnames'
import Link from 'next/link'

import { Category } from '@/types'

interface CategoryMenuProps {
  categories: Category[]
  currentCategory: string | undefined
}

export default function CategoryMenu(props: CategoryMenuProps) {
  const { categories, currentCategory } = props

  const categoryInfos = [
    {
      name: 'All',
      href: '/',
      color: '#111827', // gray-900
      selected: currentCategory === '_index',
    },
    ...categories.map((category) => ({
      name: category.name,
      href: `/categories/${category.slug}`,
      color: category.color?.hex,
      selected: currentCategory === category.slug,
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
