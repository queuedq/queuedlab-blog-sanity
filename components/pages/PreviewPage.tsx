import { pageQuery } from 'lib/client'
import { usePreview } from 'lib/sanity.preview'
import type { Page as PageType } from 'lib/types'

import Page, { PageProps } from './Page'

export default function PreviewPage({
  token,
  page,
  settings,
}: {
  token: null | string
} & PageProps) {
  const pagePreview: PageType | null = usePreview(token, pageQuery, {
    slug: page.slug,
  })

  return <Page preview page={pagePreview} settings={settings} />
}
