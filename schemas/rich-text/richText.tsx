import { defineField, defineType } from 'sanity'

import FigureType from './figure'
import HorizontalRuleType from './horizontalRule'
import YoutubeType from './youtube'

const mathInlineIcon = () => <span className="font-serif font-bold">⍺</span>
const mathIcon = () => <span className="font-serif font-bold">∑</span>

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
      name: 'horizontalRule',
      type: HorizontalRuleType.name,
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
