import Link from 'next/link'

import { loadSettings } from '@/sanity/loader/loadQuery'

import CategoryMenu from './CategoryMenu'
import Navbar from './Navbar'

function BlogTitle({ title }: { title: string }) {
  return (
    <div className="text-xl font-light text-gray-800">
      <Link href="/" className="hover:underline">
        {title}
      </Link>
    </div>
  )
}

export default async function BlogHeader({
  category,
}: {
  category: string | undefined
}) {
  const { data: settings } = await loadSettings()
  const { title, headerCategories } = settings

  return (
    <header>
      <div className="mb-4 flex flex-wrap items-baseline justify-between pt-8">
        {category === '_index' ? (
          <h1>
            <BlogTitle title={title!} />
          </h1>
        ) : (
          <BlogTitle title={title!} />
        )}
        <Navbar />
      </div>
      <div className="mb-16">
        <CategoryMenu
          categories={headerCategories ?? []}
          currentCategory={category}
        />
      </div>
    </header>
  )
}
