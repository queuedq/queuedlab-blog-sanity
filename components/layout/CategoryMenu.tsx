import Link from 'next/link'

import { categoryUrl } from '@/app/utils/urls'
import { cn } from '@/lib/utils'
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
      href: categoryUrl(category.slug),
      color: category.color?.hex,
      selected: currentCategory === category.slug,
    })),
  ]

  return (
    <nav className="flex flex-wrap text-sm leading-relaxed font-semibold text-category-menu">
      {categoryInfos.map(({ name, href, color, selected }, index) => (
        <div
          key={name}
          className="after:mx-2 [&:not(:last-child)]:after:content-['·'] "
        >
          <Link
            href={href}
            className={cn(
              'transition-all duration-100 ease-in-out',
              selected ? null : '[&:not(:hover)]:!text-category-menu',
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
