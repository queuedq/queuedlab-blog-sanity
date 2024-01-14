import { OnPasteFn } from '@sanity/portable-text-editor'
import remarkHtml from 'remark-html'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkUnwrapImages from 'remark-unwrap-images'
import { TypedObject } from 'sanity'
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

    return undefined
  }

const htmlPastePatch = (html, schemaTypes, path) => {
  const blocks = parseHtml(html, schemaTypes)
  return { insert: blocks as TypedObject[], path } // insert patch
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
