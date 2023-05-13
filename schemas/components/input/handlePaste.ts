import { normalizeBlock, TypedObject } from '@sanity/block-tools'
import { OnPasteFn } from '@sanity/portable-text-editor'
import remarkHtml from 'remark-html'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkUnwrapImages from 'remark-unwrap-images'
import { PortableTextBlock } from 'sanity'
import { unified } from 'unified'

import { parseHtml } from './htmlParser'

export const handlePaste =
  (isMarkdownPaste): OnPasteFn =>
  async (input) => {
    // https://www.sanity.io/docs/customizing-the-portable-text-editor
    const { event, schemaTypes, path } = input
    const text = event.clipboardData.getData('text')
    const html = event.clipboardData.getData('text/html')
    const json = event.clipboardData.getData('application/json')
    const pt = event.clipboardData.getData('application/x-portable-text')

    // console.log(text)
    // console.log(html)
    // console.log(json)
    // console.log(pt)

    if (pt) return undefined

    if (isMarkdownPaste) {
      const html = await markdownToHtml(text)
      return htmlPastePatch(html, schemaTypes, path)
    }

    if (html) return htmlPastePatch(html, schemaTypes, path)

    // This code deals with Sanity bug that removes contiguous whitespaces and line breaks...
    // ref: https://github.com/sanity-io/sanity/issues/1814#issuecomment-858799468
    // It seems that Sanity removes contiguous whitespaces in htmlToBlock().
    // https://github.com/sanity-io/sanity/issues/3977
    return {
      insert: [
        normalizeBlock({
          _type: 'block',
          children: [{ _type: 'span', text }],
        } as TypedObject),
      ],
      path,
    }
  }

const htmlPastePatch = (html, schemaTypes, path) => {
  const blocks = parseHtml(html, schemaTypes)
  return { insert: blocks as PortableTextBlock[], path } // insert patch
}

async function markdownToHtml(markdownContent: string) {
  // Plugin usage example (remark-math)
  // https://github.com/remarkjs/remark-math/tree/main
  const file = await unified()
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(remarkMath)
    .use(remarkHtml, { sanitize: false })
    .process(markdownContent)
  const html = file.value
  return html
}
