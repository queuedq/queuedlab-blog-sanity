import Link from 'next/link'

import { loadSettings } from '@/sanity/loader/loadQuery'

import RssIcon from './RssIcon'

export default async function Footer() {
  const { data: settings } = await loadSettings()
  const { copyrightNotice } = settings

  return (
    <footer className="mt-16 flex flex-wrap justify-between pb-8 text-sm text-gray-500">
      <div>{copyrightNotice}</div>
      <div>
        {/* TODO: use @/app/utils/urls */}
        <Link href={'/api/feed'} className="hover:underline">
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
