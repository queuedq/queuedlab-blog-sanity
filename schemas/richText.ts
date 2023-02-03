import { defineType } from 'sanity'

import YoutubeType from './youtube'

export default defineType({
  name: 'richText',
  type: 'array',
  title: 'Body',
  of: [
    {
      type: 'block'
    },
    {
      type: YoutubeType.name,
    },
  ],
})
