import urlBuilder from '@sanity/image-url'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { useNextSanityImage } from '@/sanity/lib/utils'

export default function Figure({ value }) {
  const imageProps = useNextSanityImage(value.image)

  return (
    <figure>
      {/* max height for letterboxing tall images */}
      <Image
        {...imageProps}
        alt={value.alt ?? ''}
        className="max-h-[min(60vh,28em)] w-auto mx-auto"
      />
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
