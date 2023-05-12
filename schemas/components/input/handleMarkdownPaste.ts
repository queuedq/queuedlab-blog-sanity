import { OnPasteFn } from '@sanity/portable-text-editor'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import { htmlPastePatch } from './htmlParser'

export const handleMarkdownPaste: OnPasteFn = async (input) => {
  const { event, schemaTypes, path } = input
  const text = event.clipboardData.getData('text')
  const json = event.clipboardData.getData('application/json')

  if (text) {
    const { value: html } = await markdownToHtml(text)
    return htmlPastePatch(html, schemaTypes, path)
  }
  return undefined
}

async function markdownToHtml(markdownContent: string) {
  // Plugin usage example (remark-math)
  // https://github.com/remarkjs/remark-math/tree/main
  const PT = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdownContent)
  return PT
}
