import RssIcon from 'assets/noun-rss-32528.svg'
import BlogContext from 'components/BlogContext'
import { feedUrl } from 'lib/urls'
import Link from 'next/link'
import { useContext } from 'react'

export default function Footer() {
  const { settings } = useContext(BlogContext)
  const { domain, copyrightNotice } = settings

  return (
    <footer className="mt-16 flex flex-wrap justify-between pb-8 text-sm text-gray-500">
      <div>{copyrightNotice}</div>
      <div>
        <Link href={feedUrl(domain)} className="hover:underline">
          <RssIcon
            width={14}
            height={14}
            className="mr-1 inline fill-gray-500"
          />
          Feed
        </Link>
      </div>
    </footer>
  )
}
