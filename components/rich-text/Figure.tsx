import urlBuilder from '@sanity/image-url'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { useNextSanityImage } from '@/sanity/lib/utils'

export default function Figure({ value }) {
  const imageProps = useNextSanityImage(value)

  return (
    <figure>
      <Image
        {...imageProps}
        alt={value.alt ?? ''}
        // Using unoptimized because I want users to be able to save the original image.
        // For responsive images, use sizes="100vw" instead.
        unoptimized
        // max-height for letterboxing tall images
        className="max-h-[min(60vh,28em)] w-auto mx-auto"
      />
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}

export function FigureRss({ value }) {
  const url = urlBuilder(client).image(value).url()

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={value.alt ?? ''} />
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}
