import { htmlToBlocks } from '@sanity/block-tools'
import { PortableTextBlock } from 'sanity'

export const htmlPastePatch = (html, schemaTypes, path) => {
  if (!html) return undefined
  const blocks = parseHtml(html, schemaTypes)
  return { insert: blocks as PortableTextBlock[], path } // insert patch
}

export const parseHtml = (html, schemaTypes) => {
  const blocks = htmlToBlocks(html, schemaTypes.portableText, {
    rules: [
      {
        // code block
        // TODO: deal with bug that removes contiguous whitespaces and line breaks
        // (currently impossible with htmlToBlocks() in sanity@3.5.0)
        // https://github.com/sanity-io/sanity/issues/1814
        deserialize(el, next, block) {
          if (el?.nodeName?.toLowerCase() !== 'pre') return undefined
          if (!el?.hasChildNodes()) return undefined

          const code = el.childNodes[0]
          const childNodes =
            code && code.nodeName.toLowerCase() === 'code'
              ? code.childNodes
              : el.childNodes
          let text = ''
          childNodes.forEach((node) => {
            text += node.textContent
          })

          return block({ _type: 'code', code: text })
        },
      },
      // TODO: support other custom blocks
    ],
  })

  return blocks
}
