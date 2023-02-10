import { defineField, defineType } from 'sanity'

import FigureType from './figure'
import YoutubeType from './youtube'

export default defineType({
  name: 'richText',
  type: 'array',
  title: 'Body',
  of: [
    defineField({
      name: 'block',
      type: 'block',
    }),
    defineField({
      name: 'figure',
      type: FigureType.name,
    }),
    defineField({
      name: 'youtube',
      type: YoutubeType.name,
    }),
  ],
})
