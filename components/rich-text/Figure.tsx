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
      <figcaption
        className="mt-4 text-center"
      >
        {value.caption}
      </figcaption>
    </figure>
  )
}
