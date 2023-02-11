import { defineField, defineType } from 'sanity'

import FigureType from './figure'
import YoutubeType from './youtube'

const mathInlineIcon = () => (
  <span>
    <span style={{ fontWeight: 'bold' }}>⍺</span>
  </span>
)
const mathIcon = () => <span style={{ fontWeight: 'bold' }}>∑</span>

export default defineType({
  name: 'richText',
  type: 'array',
  title: 'Body',
  of: [
    defineField({
      name: 'block',
      type: 'block',
      of: [
        { type: 'latex', icon: mathInlineIcon, title: 'Inline Math' },
      ],
    }),
    defineField({
      name: 'figure',
      type: FigureType.name,
    }),
    defineField({
      name: 'latex',
      type: 'latex',
      title: 'Block Math',
      icon: mathIcon,
    }),
    defineField({
      name: 'youtube',
      type: YoutubeType.name,
    }),
  ],
})
