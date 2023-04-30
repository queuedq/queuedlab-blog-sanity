// TODO: Separate links on left/right

import BlogContext from 'components/BlogContext'
import { useContext } from 'react'

// TODO: Make it pretty on mobile
export default function Footer() {
  const { settings } = useContext(BlogContext)
  const { copyrightNotice } = settings

  return (
    <footer className="mt-16 pb-8 text-sm text-gray-500">
      <div>{copyrightNotice}</div>
    </footer>
  )
}
