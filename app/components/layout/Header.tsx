import { getSettings } from 'lib/client'

import BlogTitle from './BlogTitle'
import CategoryMenu from './CategoryMenu'
import Navbar from './Navbar'

export default async function BlogHeader() {
  const settings = await getSettings()
  const { title, headerCategories } = settings

  return (
    <header>
      <div className="mb-4 flex flex-wrap items-baseline justify-between pt-8">
        <BlogTitle title={title!} />
        <Navbar />
      </div>
      <div className="mb-16">
        <CategoryMenu categories={headerCategories!} />
      </div>
    </header>
  )
}
