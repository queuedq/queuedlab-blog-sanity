import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// import FigurePreview from './components/FigurePreview'

export default defineType({
  name: 'figure',
  type: 'image',
  icon: ImageIcon,
  title: 'Figure',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
    // TODO: add image size option
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'caption',
    },
  },
  // TODO: add custom preview component
  // cf) YouTubePreview and https://www.sanity.io/docs/previews-list-views
})
