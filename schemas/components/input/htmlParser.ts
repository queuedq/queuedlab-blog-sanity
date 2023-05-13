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
          if (!isElement(el, 'pre')) return undefined
          if (!el.hasChildNodes()) return undefined

          const code = el.childNodes[0]
          if (!isElement(code, 'code')) return undefined
          
          const text = el.textContent
          return block({ _type: 'code', code: text })
        },
      },
      {
        deserialize(el, next, block) {
          if (!isElement(el, 'span')) return undefined
          const classNames = el.className.split(' ')
          if (!classNames.includes('math-inline')) return undefined

          const text = el.textContent
          return { _type: 'latex', body: text }
        },
      },
      {
        deserialize(el, next, block) {
          if (!isElement(el, 'div')) return undefined
          const classNames = el.className.split(' ')
          if (!classNames.includes('math-display')) return undefined

          const text = el.textContent
          return block({ _type: 'latex', body: text })
        },
      },
      {
        deserialize(el, next, block) {
          if (!isElement(el, 'hr')) return undefined
          return block({ _type: 'horizontalRule' })
        },
      },
      {
        deserialize(el, next, block) {
          if (!isElement(el, 'img')) return undefined
          return block({ _type: 'figure' })
        },
      },
      {
        deserialize(el, next, block) {
          if (!isElement(el, 'iframe')) return undefined

          // TODO: check if it is actually youtube embed
          const url = el.getAttribute('src')
          if (!url) return undefined

          return block({ _type: 'youtube', url })
        },
      },
    ],
  })

  return blocks
}

const isElement = (el: Node, name: string): el is Element => {
  if (!(el instanceof Element)) return false
  return el.nodeName.toLowerCase() == name
}
