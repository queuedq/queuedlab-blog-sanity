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
  return _useNextSanityImage(client, image, {
    imageBuilder: customImageBuilder,
  })
}

// This function is to work around the cropping of vertical photos taken with iPhone.
// The bug seems to be related to the EXIF orientation tag.
// Related issue: https://github.com/sanity-io/sanity/issues/4036
//
// The workaround is to use `fit=max` instead of next-sanity-image's default `fit=clip`.
// Docs on `fit`: https://www.sanity.io/docs/image-urls#fit-45b29dc6f09f
// Using custom image builder for next-sanity-image:
// https://www.sanity.io/plugins/next-sanity-image#image-transformations
const customImageBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder
    .width(
      options.width || Math.min(options.originalImageDimensions.width, 1920),
    )
    .quality(options.quality || 75)
    .fit('max')
}
