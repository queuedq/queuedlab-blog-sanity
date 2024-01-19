import Image from 'next/image'

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
