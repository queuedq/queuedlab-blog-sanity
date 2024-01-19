import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useNextSanityImage as _useNextSanityImage } from 'next-sanity-image'

import { dataset, projectId } from './api'
import { client } from './client'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('max')

// https://www.sanity.io/plugins/next-sanity-image
export const useNextSanityImage = (image: SanityImageObject) => {
  return _useNextSanityImage(client, image)
}