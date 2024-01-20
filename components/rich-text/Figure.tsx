import urlBuilder from '@sanity/image-url'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { useNextSanityImage } from '@/sanity/lib/utils'

export default function Figure({ value }) {
  const imageProps = useNextSanityImage(value.image)

  // TODO: set size
  return (
    <figure>
      <Image {...imageProps} alt={value.alt ?? ''} className="mx-auto" />
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}

export function FigureRss({ value }) {
  const url = urlBuilder(client).image(value.image).url()

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={value.alt ?? ''} />
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}
