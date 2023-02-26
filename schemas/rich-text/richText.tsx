import { defineField, defineType } from 'sanity'
import { RichTextEditor } from 'schemas/components/RichTextEditor'

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
      name: 'code',
      type: 'code',
      title: 'Block Code',
      options: {
        languageAlternatives: [
          // default languages copied from here: https://github.com/sanity-io/code-input/blob/700c617ef276d148bb9d85d16d69903f25cbaf50/src/config.ts
          // TODO: Can it be made simpler? Specifying only C and C++ (which were not in
          // the original list) results in the language list only containing C and C++...
          // It seems like @sanity/code-input does not support "extending" the original list.
          // Also I don't understand why C and C++ are not supported by default in the first place...
          {title: 'Batch file', value: 'batchfile'},
          {title: 'C', value: 'c'}, // added
          {title: 'C++', value: 'cpp'}, // added
          {title: 'C#', value: 'csharp'},
          {title: 'CSS', value: 'css'},
          {title: 'Go', value: 'golang'},
          {title: 'GROQ', value: 'groq'},
          {title: 'HTML', value: 'html'},
          {title: 'Java', value: 'java'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'JSON', value: 'json'},
          {title: 'JSX', value: 'jsx'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'MySQL', value: 'mysql'},
          {title: 'PHP', value: 'php'},
          {title: 'Plain text', value: 'text'},
          {title: 'Python', value: 'python'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'SASS', value: 'sass'},
          {title: 'SCSS', value: 'scss'},
          {title: 'sh', value: 'sh'},
          {title: 'TSX', value: 'tsx'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'XML', value: 'xml'},
          {title: 'YAML', value: 'yaml'},
        ]
      }
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
  components: {
    input: RichTextEditor,
  },
})
