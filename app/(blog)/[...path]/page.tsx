import { notFound, permanentRedirect } from 'next/navigation'

import { postUrl } from '@/app/utils/urls'
import { loadPostId } from '@/sanity/loader/loadQuery'

export default async function Page({ params }: { params: { path: string } }) {
  // This component is for redirecting old post urls
  // in the form of `example.com/20xx-xx-xx/post-slug`.

  // Since at the moment `not-found.tsx` cannot examine the current url
  // (see https://github.com/vercel/next.js/discussions/43179),
  // I just used catch-all route segment as a workaround
  // to detect the post's existence from url inside a server component.

  const { path } = params
  const slug = path[path.length - 1]
  const { data: post } = await loadPostId(slug)
  
  if (post) permanentRedirect(postUrl(slug))
  notFound()
}
