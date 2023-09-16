import { Metadata } from 'next'

interface MetadataProps {
  title: string
  description: string
  url: string
  image: string
}

export function metadata({
  title,
  description,
  url,
  image,
}: MetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [image],
    },
  }
}
