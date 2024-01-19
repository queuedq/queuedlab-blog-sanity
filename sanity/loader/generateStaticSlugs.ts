import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token: process.env.SANITY_API_READ_TOKEN, // TODO: extract token variable to a file
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
      { next: { tags: [type] } },
    )
}
