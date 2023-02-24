import { useNextSanityImage } from 'lib/sanity.image'
import Image from 'next/image'

export default function Figure({ value }) {
	const imageProps = useNextSanityImage(value.image)

  // TODO: set size
  return (
    <figure>
      <Image
        {...imageProps}
        alt={value.alt ?? ''}
        className="mx-auto"
      />
      <figcaption>
        {value.caption}
      </figcaption>
    </figure>
  )
}
