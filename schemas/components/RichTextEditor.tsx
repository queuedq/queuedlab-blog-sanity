import { htmlToBlocks, normalizeBlock } from '@sanity/block-tools'
import { BlockEditor } from 'sanity'

export function RichTextEditor(props) {
  return (
    <BlockEditor {...props} onPaste={handlePaste} />
  )
}

function handlePaste (input) {
  return undefined



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

  if (!html) {
    // This code deals with Sanity bug that removes contiguous whitespaces and line breaks...
    // ref: https://github.com/sanity-io/sanity/issues/1814#issuecomment-858799468
    // It seems that Sanity removes contiguous whitespaces in htmlToBlock().
    // https://github.com/sanity-io/sanity/issues/3977
    return {
      insert: [
        normalizeBlock({
          _type: 'block',
          children: [{_type: 'span', text}],
        }),
      ],
      path,
    }
  }

  // check if schema has the code type
  const hasCodeType = schemaTypes.portableText.of.map(({ name }) => name).includes('code')
  if (!hasCodeType) {
    console.log(
      'Run `sanity install @sanity/code-input, and add `type: "code"` to your schema.'
    )
  }

  if (html && hasCodeType) {
    const blocks = htmlToBlocks(html, schemaTypes.portableText, {
      rules: [
        {
          // code block
          // TODO: deal with bug that removes contiguous whitespaces and line breaks
          // (currently impossible with htmlToBlocks() in sanity@3.5.0)
          deserialize(el, next, block) {
            if (
              !el ||
              !el.hasChildNodes() ||
              (el.nodeName && el.nodeName.toLowerCase() !== 'pre')
            ) {
              return undefined
            }

            const code = el.childNodes[0]
            const childNodes =
              code && code.nodeName.toLowerCase() === 'code'
                ? code.childNodes
                : el.childNodes
            let text = ''
            childNodes.forEach(node => {
              console.log(node)
              text += node.textContent
            })

            return block({ _type: 'code', code: text })
          },
        },
        // TODO: markdown paste
        // https://gist.github.com/kmelve/5c8eb803382d44ddc5e6c91d28e99551
      ],
    })
    // return an insert patch
    return { insert: blocks, path }
  }
  return undefined
}

