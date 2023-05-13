import { htmlToBlocks } from '@sanity/block-tools'

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
      {
        deserialize(el, next, block) {
          if (el?.nodeName?.toLowerCase() !== 'span') return undefined
          const classNames = (el as Element).className.split(' ')
          if (!classNames.includes('math-inline')) return undefined

          let text = ''
          el.childNodes.forEach((node) => {
            text += node.textContent
          })

          return { _type: 'latex', body: text }
        },
      },
      {
        deserialize(el, next, block) {
          if (el?.nodeName?.toLowerCase() !== 'div') return undefined
          const classNames = (el as Element).className.split(' ')
          if (!classNames.includes('math-display')) return undefined

          let text = ''
          el.childNodes.forEach((node) => {
            text += node.textContent
          })

          return block({ _type: 'latex', body: text })
        },
      },
      {
        deserialize(el, next, block) {
          if (el?.nodeName?.toLowerCase() !== 'hr') return undefined
          return block({ _type: 'horizontalRule' })
        },
      },
      // TODO: support other custom blocks
    ],
  })

  return blocks
}
