import { usePreview } from 'lib/sanity.preview'
import { type Page as PageType, pageQuery } from 'lib/sanity.queries'

import Page, { PageProps } from './Page'

export default function PreviewPostPage({
  token,
  page,
  settings,
}: {
  token: null | string
} & PageProps) {
  const pagePreview: PageType | null = usePreview(token, pageQuery, { slug: page.slug })

  return <Page preview page={pagePreview} settings={settings} />
}
